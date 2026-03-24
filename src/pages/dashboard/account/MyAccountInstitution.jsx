import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountShell from "../../../components/dashboard/AccountShell";
import { studentApi } from "../../../api/student";

function EditableField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
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
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className="mt-2 w-full bg-transparent text-[16px] font-semibold text-[#14143A] outline-none placeholder:text-[#B8BDD0] disabled:cursor-not-allowed disabled:text-[#7E849A] read-only:cursor-default"
      />
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

export default function MyAccountInstitution() {
  const nav = useNavigate();
  const studentId = localStorage.getItem("studentId") || "";

  const [form, setForm] = useState({
    institutionName: "",
    matricNo: localStorage.getItem("matricNo") || "",
    departmentId: "",
    level: "",
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
          institutionName:
            student?.institutionName ||
            student?.institution ||
            student?.institutionText ||
            "",
          matricNo:
            student?.matricNo ||
            localStorage.getItem("matricNo") ||
            "",
          departmentId: student?.departmentId || "",
          level:
            student?.level !== undefined && student?.level !== null
              ? String(student.level)
              : "",
        });
      } catch (error) {
        console.error("FAILED TO LOAD STUDENT INSTITUTION PROFILE:", error);
        setSubmitError("Unable to load institution information.");
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
    if (!values.departmentId.trim()) errors.departmentId = "Department ID is required.";
    if (!values.level.trim()) {
      errors.level = "Level is required.";
    } else if (Number.isNaN(Number(values.level))) {
      errors.level = "Level must be a number.";
    }

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
        departmentId: form.departmentId.trim(),
        level: Number(form.level),
      };

      console.log("UPDATE STUDENT INSTITUTION PAYLOAD:", payload);

      await studentApi.updateStudentInstitution(payload);

      localStorage.setItem("matricNo", form.matricNo.trim());
      setSuccessMessage("Institution information updated successfully.");
    } catch (error) {
      console.error("UPDATE STUDENT INSTITUTION ERROR:", error);
      setSubmitError(error?.message || "Failed to update institution information.");
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
              <button
                type="button"
                className="cursor-pointer text-[#9AA0B4]"
                onClick={() => nav("/dashboard/account/my-account")}
              >
                Personal Information
              </button>

              <button type="button" className="cursor-pointer text-[#14143A]">
                Institution
              </button>
            </div>

            <div className="mt-6 max-w-[620px] space-y-4">
              <EditableField
                label="Institution in Attendance"
                value={form.institutionName}
                placeholder="Institution name"
                readOnly
                disabled={loadingProfile}
              />

              <EditableField
                label="Matriculation No."
                value={form.matricNo}
                onChange={(e) => handleChange("matricNo", e.target.value)}
                placeholder="Enter matriculation number"
                error={fieldErrors.matricNo}
                disabled={loadingProfile}
              />

              <EditableField
                label="Department ID"
                value={form.departmentId}
                onChange={(e) => handleChange("departmentId", e.target.value)}
                placeholder="Enter department ID"
                error={fieldErrors.departmentId}
                disabled={loadingProfile}
              />

              <EditableField
                label="Level"
                type="number"
                value={form.level}
                onChange={(e) => handleChange("level", e.target.value)}
                placeholder="Enter level"
                error={fieldErrors.level}
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