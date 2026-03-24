import { request } from "./http";

const post = (path, body, options = {}) =>
  request(path, {
    method: "POST",
    body,
    ...options,
  });

const get = (path, options = {}) =>
  request(path, {
    method: "GET",
    ...options,
  });

export const authApi = {
  getInstitutionsForDropdown: () =>
    get("/api/Institution/get-institution-for-drop-down", { skipAuth: true }),

  studentLogin: (payload) =>
    post("/api/Student/login", payload, { skipAuth: true }),

  studentSignup: (payload) =>
    post("/api/Student/register", payload, { skipAuth: true }),

  adminLogin: (payload) =>
    post("/api/Admin/login", payload, { skipAuth: true }),

  adminSignup: (payload) =>
    post("/api/Admin/create-admin-user", payload, { skipAuth: true }),

  googleLogin: (payload) =>
    post("/api/Auth/google", payload, { skipAuth: true }),

  changeStudentPassword: (payload) =>
    post("/api/Student/change-password", payload),

  confirmStudentPasswordReset: (payload) =>
    post("/api/Student/confirm-reset-password", payload, { skipAuth: true }),

  forgotPasswordByEmail: (emailAddress) =>
    get(`/api/Student/forget-password/${encodeURIComponent(emailAddress)}`, {
      skipAuth: true,
    }),
};