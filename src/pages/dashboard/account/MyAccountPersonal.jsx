import { useEffect, useState } from "react";
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

function EditableField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  disabled = false,
}) {
  return (
    <div className="rounded-[16px] bg-white px-6 py-5">
      <p className="text-[12px] font-medium text-[#9AA0B4]">{label}</p>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="mt-2 w-full bg-transparent text-[16px] font-semibold text-[#14143A] outline-none placeholder:text-[#B8BDD0] disabled:cursor-not-allowed disabled:text-[#7E849A]"
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

export default function MyAccountPersonal() {
  const nav = useNavigate();
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

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (!studentId) {
        setLoadingProfile(false);
        return;
      }

      try {
        const response = await studentApi.getStudentProfile(studentId);
        const student = response?.data || response || {};

        setForm({
          matricNo:
            student?.matricNo ||
            localStorage.getItem("matricNo") ||
            "",
          firstName: student?.firstName || "",
          lastName: student?.lastName || "",
          emailAddress: student?.emailAddress || student?.email || "",
          phoneNo: student?.phoneNo || student?.phoneNumber || "",
          gender: student?.gender || "",
          dateOfBirth: formatDateForInput(student?.dateOfBirth),
        });
      } catch (error) {
        console.error("FAILED TO LOAD STUDENT PROFILE:", error);
        setSubmitError("Unable to load profile information.");
      } finally {
        setLoadingProfile(false);
      }
    }

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

  return (
    <div className="min-h-[calc(100vh-24px)] rounded-[28px] bg-[#2C14DD] p-6 md:p-10">
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

            <div className="mt-6 max-w-[620px] space-y-4">
              <EditableField
                label="Matric Number"
                value={form.matricNo}
                onChange={(e) => handleChange("matricNo", e.target.value)}
                placeholder="Enter matric number"
                error={fieldErrors.matricNo}
                disabled={loadingProfile}
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
    </div>
  );
}