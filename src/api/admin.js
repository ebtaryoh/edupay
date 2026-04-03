import { request } from "./http";

const get = (path, options = {}) => request(path, { method: "GET", ...options });
const post = (path, body, options = {}) => request(path, { method: "POST", body, ...options });
const put = (path, body, options = {}) => request(path, { method: "PUT", body, ...options });
const del = (path, options = {}) => request(path, { method: "DELETE", ...options });

function buildAdminListQuery(filters = {}) {
  const params = new URLSearchParams();
  if (filters.InstitutionId) params.append("InstitutionId", filters.InstitutionId);
  if (filters.Name) params.append("Name", filters.Name);
  params.append("PageNo", String(filters.PageNo ?? 1));
  params.append("PageSize", String(filters.PageSize ?? 20));
  return params.toString();
}

export const adminApi = {
  getAllAdmins: (filters = {}) =>
    get(`/api/Admin/get-all-admin-users?${buildAdminListQuery(filters)}`),

  getAdminById: (userId) =>
    get(`/api/Admin/get-admin-by-id/${encodeURIComponent(userId)}`),

  createAdminUser: (payload) =>
    post("/api/Admin/create-admin-user", payload),

  editAdminUser: (payload) =>
    put("/api/Admin/edit-admin-user", payload),

  deleteAdminUser: (userId) =>
    del(`/api/Admin/delete-admin-user/${encodeURIComponent(userId)}`),

  adminLogout: (userId) =>
    post(`/api/Admin/admin-logout/${encodeURIComponent(userId)}`),
};
