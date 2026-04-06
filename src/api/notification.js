import { request } from "./http";

const get = (path, options = {}) => request(path, { method: "GET", ...options });
const post = (path, body, options = {}) => request(path, { method: "POST", body, ...options });
const put = (path, body, options = {}) => request(path, { method: "PUT", body, ...options });

export const notificationApi = {
  // Get notification setup for a specific user (student or admin)
  getByUserId: (userId) =>
    get(`/api/NotificationSetup/get-notification-setup-by-userid?userId=${encodeURIComponent(userId)}`),

  // Get all notifications scoped to an institution (admin view)
  getByInstitutionId: (institutionId, filters = {}) => {
    const params = new URLSearchParams();
    params.append("InstitutionId", institutionId);
    if (filters.Name) params.append("Name", filters.Name);
    params.append("PageNo", String(filters.PageNo ?? 1));
    params.append("PageSize", String(filters.PageSize ?? 50));
    return get(`/api/NotificationSetup/get-notification-setups-by-institutionid?${params.toString()}`);
  },

  // Create a new notification
  create: (payload) => post("/api/NotificationSetup/create-notification-setup", payload),

  // Update a notification
  update: (payload) => put("/api/NotificationSetup/edit-notification-setup", payload),
};
