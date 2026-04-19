import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountShell from "../../../components/dashboard/AccountShell";
import { studentApi } from "../../../api/student";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatDateForInput(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
}

function getStudentPhoto(student) {
  let photo =
    student?.photo ||
    student?.photoUrl ||
    student?.imageUrl ||
    student?.profileImage ||
    student?.studentImage ||
    student?.passport ||
    "";

  // If it's a raw Base64 string (common in this backend), prepend the data URI prefix
  if (photo && !photo.startsWith("http") && !photo.startsWith("data:") && photo.length > 100) {
    return `data:image/jpeg;base64,${photo}`;
  }
  
  return photo;
}

function EditableField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  disabled = false,
  readOnly = false,
}) {
  return (
    <div className="rounded-[16px] bg-white px-6 py-5">
      <p className="text-[12px] font-medium text-[#9AA0B4]">{label}</p>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        className="mt-2 w-full bg-transparent text-[16px] font-semibold text-[#14143A] outline-none placeholder:text-[#B8BDD0] disabled:cursor-not-allowed disabled:text-[#7E849A] read-only:cursor-default"
      />
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

function SelectField({ label, value, onChange, options, error }) {
  return (
    <div className="rounded-[16px] bg-white px-6 py-5">
      <p className="text-[12px] font-medium text-[#9AA0B4]">{label}</p>
      <select
        value={value}
        onChange={onChange}
        className="mt-2 w-full cursor-pointer bg-transparent text-[16px] font-semibold text-[#14143A] outline-none"
      >
        <option value="">Select gender</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

function AvatarUploader({
  imageUrl,
  initials,
  onPickImage,
  onUploadImage,
  uploadingImage,
  disabled = false,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-[18px] bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="h-[84px] w-[84px] overflow-hidden rounded-full border-[4px] border-[#F3E4D7] bg-[radial-gradient(circle_at_50%_30%,#D5B08D_0%,#A86E45_62%,#8A5636_100%)]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Student profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[28px] font-bold text-white/95">
              {initials}
            </div>
          )}
        </div>

        <div>
          <p className="text-[16px] font-semibold text-[#14143A]">Profile Photo</p>
          <p className="mt-1 text-sm text-[#8D93A6]">
            Upload a clear passport-style image.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onPickImage}
          disabled={disabled}
          className="h-11 cursor-pointer rounded-full border border-[#D7DCF0] bg-white px-5 text-sm font-semibold text-[#2C14DD] transition hover:bg-[#F8F9FF] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Choose Photo
        </button>

        <button
          type="button"
          onClick={onUploadImage}
          disabled={uploadingImage || disabled}
          className="h-11 cursor-pointer rounded-full bg-[#EDEFFF] px-5 text-sm font-semibold text-[#2C14DD] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploadingImage ? "Uploading..." : "Upload Photo"}
        </button>
      </div>
    </div>
  );
}

function getInitials(firstName = "", lastName = "") {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "AS";
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function MyAccountPersonal() {
  const nav = useNavigate();
  const fileInputRef = useRef(null);
  const studentId = localStorage.getItem("studentId") || "";

  const [form, setForm] = useState({
    matricNo: localStorage.getItem("matricNo") || "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNo: "",
    gender: "",
    dateOfBirth: "",
  });

  const [profileImage, setProfileImage] = useState(localStorage.getItem("studentPhoto") || "");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [imageError, setImageError] = useState("");
  const [imageSuccess, setImageSuccess] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  async function loadProfile() {
    if (!studentId) {
      setLoadingProfile(false);
      return;
    }

    try {
      const response = await studentApi.getStudentProfile(studentId);
      const student = response?.data || response || {};

      const resolvedMatricNo =
        student?.matricNo ||
        localStorage.getItem("matricNo") ||
        "";

      setForm({
        matricNo: resolvedMatricNo,
        firstName: student?.firstName || "",
        lastName: student?.lastName || "",
        emailAddress: student?.emailAddress || student?.email || "",
        phoneNo: student?.phoneNo || student?.phoneNumber || "",
        gender: student?.gender || "",
        dateOfBirth: formatDateForInput(student?.dateOfBirth),
      });

      if (resolvedMatricNo) {
        localStorage.setItem("matricNo", resolvedMatricNo);
      }

      const latestPhoto = getStudentPhoto(student);
      if (latestPhoto) {
        let finalPhoto = latestPhoto;
        // Only cache-bust if it's a real URL, not a Base64 string
        if (latestPhoto.startsWith("http")) {
          finalPhoto = `${latestPhoto}${latestPhoto.includes("?") ? "&" : "?"}t=${Date.now()}`;
        }
        setProfileImage(finalPhoto);
        localStorage.setItem("studentPhoto", finalPhoto);
      }
    } catch (error) {
      console.error("FAILED TO LOAD STUDENT PROFILE:", error);
      setSubmitError("Unable to load profile information.");
    } finally {
      setLoadingProfile(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, [studentId]);

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setSubmitError("");
    setSuccessMessage("");
  }

  function handleChoosePhoto() {
    fileInputRef.current?.click();
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please choose a valid image file.");
      return;
    }

    setSelectedPhoto(file);
    setImageError("");
    setImageSuccess("");

    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl);
  }

  function validate(values) {
    const errors = {};

    if (!values.matricNo.trim()) errors.matricNo = "Matric number is required.";
    if (!values.firstName.trim()) errors.firstName = "First name is required.";
    if (!values.lastName.trim()) errors.lastName = "Last name is required.";

    if (!values.emailAddress.trim()) {
      errors.emailAddress = "Email address is required.";
    } else if (!emailRegex.test(values.emailAddress.trim())) {
      errors.emailAddress = "Enter a valid email address.";
    }

    if (!values.phoneNo.trim()) errors.phoneNo = "Phone number is required.";
    if (!values.gender.trim()) errors.gender = "Gender is required.";
    if (!values.dateOfBirth.trim()) errors.dateOfBirth = "Date of birth is required.";

    return errors;
  }

  async function handleUploadImage() {
    setImageError("");
    setImageSuccess("");

    const actualMatricNo =
      localStorage.getItem("matricNo") ||
      form.matricNo.trim();

    if (!actualMatricNo) {
      setImageError("Matric number is required before uploading image.");
      return;
    }

    if (!selectedPhoto) {
      setImageError("Please choose a photo first.");
      return;
    }

    try {
      setUploadingImage(true);

      let base64Image = await fileToBase64(selectedPhoto);
      // Strip the Data URL prefix (e.g., "data:image/png;base64,") for backend compatibility
      if (base64Image.includes(",")) {
        base64Image = base64Image.split(",")[1];
      }

      const formData = new FormData();
      formData.append("MatricNo", actualMatricNo);
      formData.append("Photo", base64Image);

      console.log("UPDATE STUDENT IMAGE PAYLOAD (Base64):", {
        MatricNo: actualMatricNo,
        PhotoLength: base64Image.length,
      });

      const response = await studentApi.updateStudentImage(formData);
      console.log("UPDATE STUDENT IMAGE RESPONSE:", response);

      localStorage.setItem("matricNo", actualMatricNo);

      await loadProfile();

      setSelectedPhoto(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setImageSuccess("Profile image updated successfully.");
    } catch (error) {
      console.error("UPDATE STUDENT IMAGE ERROR:", error);
      const errorPayload = error?.payload || error?.data;
      console.error("UPDATE STUDENT IMAGE ERROR PAYLOAD:", JSON.stringify(errorPayload, null, 2));
      
      const validationErrors = errorPayload?.errors;
      if (validationErrors) {
        const errorMsg = Object.values(validationErrors).flat().join(" ");
        setImageError(errorMsg || "Validation failed.");
      } else {
        setImageError(error?.message || "Failed to update profile image.");
      }
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSave() {
    setSubmitError("");
    setSuccessMessage("");

    const errors = validate(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      setSaving(true);

      const payload = {
        matricNo: form.matricNo.trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        emailAddress: form.emailAddress.trim(),
        phoneNo: form.phoneNo.trim(),
        gender: form.gender.trim(),
        dateOfBirth: form.dateOfBirth,
      };

      console.log("UPDATE STUDENT BIO PAYLOAD:", payload);

      await studentApi.updateStudentBio(payload);

      localStorage.setItem("matricNo", form.matricNo.trim());
      setSuccessMessage("Personal information updated successfully.");
    } catch (error) {
      console.error("UPDATE STUDENT BIO ERROR:", error);
      setSubmitError(error?.message || "Failed to update personal information.");
    } finally {
      setSaving(false);
    }
  }

  const initials = getInitials(form.firstName, form.lastName);

  return (
    <AccountShell
        title="Account"
        activeKey="my"
        variant="blue"
        right={
          <div className="w-full">
            <div className="flex items-center gap-8 text-[14px] font-medium">
              <button type="button" className="cursor-pointer text-[#14143A]">
                Personal Information
              </button>

              <button
                type="button"
                className="cursor-pointer text-[#9AA0B4]"
                onClick={() => nav("/dashboard/account/my-account/institution")}
              >
                Institution
              </button>
            </div>

            <div className="mt-6 max-w-[620px]">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

              <AvatarUploader
                imageUrl={profileImage}
                initials={initials}
                onPickImage={handleChoosePhoto}
                onUploadImage={handleUploadImage}
                uploadingImage={uploadingImage}
                disabled={loadingProfile}
              />

              {imageError ? (
                <p className="mb-4 text-sm text-red-200">{imageError}</p>
              ) : null}

              {imageSuccess ? (
                <p className="mb-4 text-sm text-green-200">{imageSuccess}</p>
              ) : null}

              <div className="space-y-4">
                <EditableField
                  label="Matric Number"
                  value={form.matricNo}
                  placeholder="Matric number"
                  error={fieldErrors.matricNo}
                  disabled={loadingProfile}
                  readOnly
                />

                <EditableField
                  label="First Name"
                  value={form.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="Enter first name"
                  error={fieldErrors.firstName}
                  disabled={loadingProfile}
                />

                <EditableField
                  label="Last Name"
                  value={form.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Enter last name"
                  error={fieldErrors.lastName}
                  disabled={loadingProfile}
                />

                <EditableField
                  label="Email Address"
                  type="email"
                  value={form.emailAddress}
                  onChange={(e) => handleChange("emailAddress", e.target.value)}
                  placeholder="Enter email address"
                  error={fieldErrors.emailAddress}
                  disabled={loadingProfile}
                />

                <EditableField
                  label="Phone Number"
                  value={form.phoneNo}
                  onChange={(e) => handleChange("phoneNo", e.target.value)}
                  placeholder="Enter phone number"
                  error={fieldErrors.phoneNo}
                  disabled={loadingProfile}
                />

                <SelectField
                  label="Gender"
                  value={form.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  options={["Male", "Female"]}
                  error={fieldErrors.gender}
                />

                <EditableField
                  label="Date of Birth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  error={fieldErrors.dateOfBirth}
                  disabled={loadingProfile}
                />
              </div>
            </div>

            {submitError ? (
              <p className="mt-5 text-sm text-red-200">{submitError}</p>
            ) : null}

            {successMessage ? (
              <p className="mt-5 text-sm text-green-200">{successMessage}</p>
            ) : null}

            <div className="mt-10 flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || loadingProfile}
                className="h-14 cursor-pointer rounded-full bg-[#EDEFFF] px-16 font-semibold text-[#2C14DD] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        }
      />
  );
}