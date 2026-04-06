import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminAccountShell from "../../../components/admin/account/AdminAccountShell";
import { PurpleSaveButton } from "../../../components/admin/account/AdminAccountBlocks";
import { adminApi } from "../../../api/admin";
import { institutionApi } from "../../../api/fees";

function LineField({ label, value, onChange, type = "text", dropdown = false, children }) {
  return (
    <div>
      <p className="text-[13px] text-[#8E92A4]">{label}</p>
      {dropdown ? (
        <div className="mt-3 flex items-center justify-between gap-4 border-b border-[#E8EAF5] pb-3">
          <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-transparent text-[17px] font-medium text-[#171C34] outline-none"
          >
            {children}
          </select>
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={label}
          className="mt-3 w-full border-b border-[#E8EAF5] bg-transparent pb-3 text-[17px] font-medium text-[#171C34] outline-none placeholder:text-[#C0C3D0]"
        />
      )}
    </div>
  );
}

export default function AdminUserManagementAddUserInstitution() {
  const nav = useNavigate();
  const { state } = useLocation();
  const personal = state?.personal || {};

  const [form, setForm] = useState({ institutionId: "", department: "", staffId: "", role: "", password: "", confirmPassword: "" });
  const [institutions, setInstitutions] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    institutionApi.getInstitutionDropdown()
      .then(res => setInstitutions(res?.data || res || []))
      .catch(() => {});
  }, []);

  function set(key) { return v => setForm(f => ({ ...f, [key]: v })); }

  async function handleAddUser() {
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setSubmitting(true);
      await adminApi.createAdminUser({
        firstName: personal.firstName,
        lastName: personal.lastName,
        emailAddress: personal.email,
        phoneNo: personal.phone,
        gender: personal.gender,
        institutionId: form.institutionId,
        department: form.department,
        staffId: form.staffId,
        role: form.role,
        password: form.password,
      });
      nav("/admin/dashboard/account/user-management/students/add-user/success");
    } catch (err) {
      setError(err?.message || "Failed to create user. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminAccountShell
      title="Add User"
      activeKey="user-management"
      right={
        <div className="max-w-[500px] space-y-10 pt-1">
          <div>
            <h2 className="text-[34px] font-semibold text-[#161B32]">Add User</h2>
            <p className="mt-6 text-[18px] font-semibold text-[#161B32]">Institutional Information</p>
          </div>

          <div className="space-y-8">
            <LineField label="Institution" value={form.institutionId} onChange={set("institutionId")} dropdown>
              <option value="">Select Institution</option>
              {institutions.map(inst => (
                <option key={inst.value || inst.id} value={inst.value || inst.id}>
                  {inst.text || inst.name || inst.label || inst.institutionName}
                </option>
              ))}
            </LineField>
            <LineField label="Department/Office" value={form.department} onChange={set("department")} />
            <LineField label="Staff ID / Mat. No." value={form.staffId} onChange={set("staffId")} />
            <LineField label="Select User Role" value={form.role} onChange={set("role")} dropdown>
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="SuperAdmin">Super Admin</option>
              <option value="Finance">Finance Officer</option>
            </LineField>
            <LineField label="Create Password" value={form.password} onChange={set("password")} type="password" />
            <LineField label="Re-enter Password" value={form.confirmPassword} onChange={set("confirmPassword")} type="password" />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="pt-4">
            <PurpleSaveButton className="w-full max-w-[380px]" onClick={handleAddUser} disabled={submitting}>
              {submitting ? "Adding User..." : "Add User"}
            </PurpleSaveButton>
          </div>
        </div>
      }
    />
  );
}
