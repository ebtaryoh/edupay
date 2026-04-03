import { request } from "./http";

const get = (path, options = {}) =>
  request(path, {
    method: "GET",
    ...options,
  });

const post = (path, body, options = {}) =>
  request(path, {
    method: "POST",
    body,
    ...options,
  });

export const billApi = {
  getStudentDebt: (studentId) =>
    get(`/api/Bill/student-debt/${encodeURIComponent(studentId)}`),

  getBillDetails: (studentId) =>
    get(`/api/Bill/get-bill-details/${encodeURIComponent(studentId)}`),

  payBill: (billId, payload) =>
    post(`/api/Bill/pay-bill/${encodeURIComponent(billId)}`, payload),

  initiatePayment: (payload) =>
    post("/api/Payment/initiate-payment", payload),

  verifyPayment: (reference) =>
    get(`/api/Payment/verify-payment?reference=${encodeURIComponent(reference)}`),
};
