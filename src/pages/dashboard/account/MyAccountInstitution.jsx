import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountShell from "../../../components/dashboard/AccountShell";
import { studentApi } from "../../../api/student";
import {
  departmentApi,
  levelApi,
  institutionApi,
} from "../../../api/fees";
import { parseJwt } from "../../../api/http";

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

function SelectField({ label, value, onChange, options, error, disabled = false, placeholder = "Select option" }) {
  return (
    <div className="rounded-[16px] bg-white px-6 py-5">
      <p className="text-[12px] font-medium text-[#9AA0B4]">{label}</p>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="mt-2 w-full cursor-pointer bg-transparent text-[16px] font-semibold text-[#14143A] outline-none disabled:cursor-not-allowed disabled:text-[#7E849A]"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

export default function MyAccountInstitution() {
  console.log(">>> MY ACCOUNT INSTITUTION COMPONENT MOUNTED");
  const nav = useNavigate();
  const studentId = localStorage.getItem("studentId") || "";
  console.log(">>> CURRENT STUDENT ID FROM STORAGE:", studentId);

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
  const [loadingLookups, setLoadingLookups] = useState(false);
  const [saving, setSaving] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    async function loadProfile() {
      let currentId = studentId;

      if (!currentId) {
        console.log(">>> ATTEMPTING IMMEDIATE REPAIR IN COMPONENT...");
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = parseJwt(token);
          currentId =
            decoded?.uid ||
            decoded?.studentId ||
            decoded?.studentID ||
            decoded?.id ||
            decoded?.Id ||
            decoded?.ID ||
            decoded?.userId ||
            decoded?.nameid ||
            decoded?.sub ||
            decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
            "";
          
          if (currentId) {
            console.log(">>> COMPONENT REPAIRED ID:", currentId);
            localStorage.setItem("studentId", String(currentId));
          }
        }
      }

      if (!currentId) {
        console.error(">>> NO STUDENT ID FOUND. CANNOT LOAD PROFILE.");
        setLoadingProfile(false);
        return;
      }

      try {
        const response = await studentApi.getStudentProfile(currentId);
        console.log("FULL STUDENT PROFILE RESPONSE:", response);
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

        // Trigger lookup loads if we have institutional info
        let instId = student?.institutionId || student?.institutionID;

        // Fallback to token if not in profile response
        if (!instId) {
          const token = localStorage.getItem("token");
          if (token) {
            const decoded = parseJwt(token);
            instId = decoded?.instid || decoded?.institutionId || decoded?.institutionID || "";
            console.log("RESOLVED INSTITUTION ID FROM TOKEN FALLBACK:", instId);
          }
        }

        if (instId) {
          loadLookups(instId);
        } else {
          console.warn("NO INSTITUTION ID FOUND IN PROFILE OR TOKEN");
        }
      } catch (error) {
        console.error("FAILED TO LOAD STUDENT INSTITUTION PROFILE:", error);
        setSubmitError("Unable to load institution information.");
      } finally {
        setLoadingProfile(false);
      }
    }

    async function loadLookups(instId) {
      try {
        console.log("FETCHING LOOKUPS FOR INST ID:", instId);
        setLoadingLookups(true);

        // 1. Get institution details for the code
        const instResponse = await institutionApi.getInstitutionById(instId);
        console.log("INSTITUTION DETAILS RESPONSE:", instResponse);
        const institution = instResponse?.data || instResponse || {};
        const code = institution?.code || institution?.institutionCode || "";

        console.log("RESOLVED INSTITUTION CODE:", code);

        if (!code) {
          console.warn("NO INSTITUTION CODE FOUND FOR LOOKUPS. ATTEMPTING WITH ID AS FALLBACK...");
          // Fallback: try using the ID as the code if they might be interchangeable
        }

        const lookupCode = code || instId;

        // 2. Fetch departments and levels
        const [deptRes, levelRes] = await Promise.allSettled([
          departmentApi.getDepartmentsForDropdown(lookupCode),
          levelApi.getLevelsForDropdown(lookupCode),
        ]);

        if (deptRes.status === "fulfilled") {
          console.log("DEPARTMENTS LOOKUP SUCCESS:", deptRes.value);
          setDepartments(Array.isArray(deptRes.value?.data) ? deptRes.value.data : []);
        } else {
          console.error("DEPARTMENTS LOOKUP FAILED:", deptRes.reason);
        }

        if (levelRes.status === "fulfilled") {
          console.log("LEVELS LOOKUP SUCCESS:", levelRes.value);
          setLevels(Array.isArray(levelRes.value?.data) ? levelRes.value.data : []);
        } else {
          console.error("LEVELS LOOKUP FAILED:", levelRes.reason);
        }
      } catch (error) {
        console.error("FAILED TO LOAD ACCOUNT LOOKUPS:", error);
      } finally {
        setLoadingLookups(false);
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

              <SelectField
                label="Department"
                value={form.departmentId}
                onChange={(e) => handleChange("departmentId", e.target.value)}
                options={departments}
                placeholder={loadingLookups ? "Loading departments..." : "Select department"}
                error={fieldErrors.departmentId}
                disabled={loadingProfile || loadingLookups}
              />

              <SelectField
                label="Level"
                value={form.level}
                onChange={(e) => handleChange("level", e.target.value)}
                options={levels}
                placeholder={loadingLookups ? "Loading levels..." : "Select level"}
                error={fieldErrors.level}
                disabled={loadingProfile || loadingLookups}
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