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
  /* =========================
     INSTITUTIONS
  ========================= */
  getInstitutionsForDropdown: () =>
    get("/api/Institution/get-institution-for-drop-down", { skipAuth: true }),

  /* =========================
     STUDENT AUTH
  ========================= */
  studentLogin: (payload) =>
    post("/api/Student/login", payload, { skipAuth: true }),

  studentSignup: (payload) =>
    post("/api/Student/register", payload, { skipAuth: true }),

  /* =========================
     ADMIN AUTH
  ========================= */
  adminLogin: (payload) =>
    post("/api/Admin/login", payload, { skipAuth: true }),

  adminSignup: (payload) =>
    post("/api/Admin/register", payload, { skipAuth: true }),

  /* =========================
     GOOGLE AUTH
  ========================= */
  googleLogin: (payload) =>
    post("/api/Auth/google", payload, { skipAuth: true }),
};