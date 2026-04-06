import { request } from "./http";

const get = (path, options = {}) => request(path, { method: "GET", ...options });
const post = (path, body, options = {}) => request(path, { method: "POST", body, ...options });
const put = (path, body, options = {}) => request(path, { method: "PUT", body, ...options });

export const feesApi = {
  // Fee Types
  getAllFeeTypes: () => get("/api/Fees/get-all-fee-types"),
  getFeeTypeDropdown: () => get("/api/Fees/get-fee-type-for-dropdown", { skipAuth: true }),
  getFeeTypeById: (id) => get(`/api/Fees/get-fee-type-by-id?FeeTypeId=${id}`),
  createFeeType: (payload) => post("/api/Fees/new-fee-type", payload),

  // Fee Structures
  getAllFeeStructures: () => get("/api/Fees/get-all-fee-structures"),
  getInstitutionFeeStructures: () => get("/api/Fees/get-all-institution-fee-structures"),
  createFeeStructure: (payload) => post("/api/Fees/create-fee-structure", payload),
  editFeeStructure: (payload) => put("/api/Fees/edit-fee-structure", payload),
  deactivateFeeStructure: (id) => get(`/api/Fees/deactivate-fee-structure?id=${encodeURIComponent(id)}`),
  getFeeStructureById: (id) => get(`/api/Fees/fee-structure-by-id?id=${encodeURIComponent(id)}`),
};

export const departmentApi = {
  getDepartments: () => get("/api/Department/get-departments", { skipAuth: true }),
  getDepartmentsForDropdown: (institutionCode) => {
    const query = institutionCode ? `?institutionCode=${encodeURIComponent(institutionCode)}` : "";
    return get(`/api/Department/get-departments-for-dropdown${query}`, { skipAuth: true });
  },
  getDepartmentById: (id) => get(`/api/Department/get-department-by-id?departmentId=${id}`),
  createDepartment: (payload) => post("/api/Department/create-department", payload),
  updateDepartment: (payload) => put("/api/Department/update-department", payload),
};

export const levelApi = {
  getAllLevels: () => get("/api/Level/get-all-levels", { skipAuth: true }),
  getLevelsForDropdown: (institutionCode) => {
    const query = institutionCode ? `?institutionCode=${encodeURIComponent(institutionCode)}` : "";
    return get(`/api/Level/get-levels-for-dropdown${query}`, { skipAuth: true });
  },
  createLevel: (payload) => post("/api/Level/new-level", payload),
};

export const institutionApi = {
  getInstitutions: () => get("/api/Institution/get-institutions", { skipAuth: true }),
  getInstitutionDropdown: () => get("/api/Institution/get-institution-for-drop-down", { skipAuth: true }),
  getInstitutionTypeDropdown: () => get("/api/Institution/get-institution-type-for-drop-down", { skipAuth: true }),
  createInstitution: (payload) => post("/api/Institution/create-institution", payload),
  updateInstitution: (payload) => put("/api/Institution/update-institution", payload),
  getInstitutionById: (id) => get(`/api/Institution/get-institution-by-id?institutionId=${id}`),
};

export const billingApi = {
  // Student bill info
  getStudentDebt: (studentId) => get(`/api/Bill/student-debt/${studentId}`),
  getBillDetails: (studentId) => get(`/api/Bill/get-bill-details/${studentId}`),

  // Pay a registered student's existing bill (body = amount as plain number)
  payBill: (billId, amount) => post(`/api/Bill/pay-bill/${billId}`, amount),

  // Admin analytics
  getDepartmentOutstanding: (institutionId) => get(`/api/Bill/department-outstanding/${institutionId}`),
  getLevelOutstanding: (institutionId) => get(`/api/Bill/level-outstanding/${institutionId}`),
  getUnpaidStudents: (institutionId) => get(`/api/Bill/unpaid-students/${institutionId}`),

  // QuickPay for unregistered students
  getUnregisteredBill: (levelId, departmentId, institutionId) =>
    get(
      `/api/Bill/unregistered-student-bill?LevelId=${levelId}&DepartmentId=${departmentId}&InstitutionId=${institutionId}`,
      { skipAuth: true }
    ),
  payUnregisteredBill: (payload) =>
    post("/api/Bill/pay-unregistered-student-bill", payload, { skipAuth: true }),
};

export const paymentApi = {
  // Fetch aggregated totals
  getTotalPaymentsReceived: (instId, filters = {}) => {
    const params = new URLSearchParams({ institutionId: instId });
    if (filters.FromDate) params.append("FromDate", filters.FromDate);
    if (filters.ToDate) params.append("ToDate", filters.ToDate);
    return get(`/api/Payment/get-total-payments-received?${params.toString()}`);
  },

  // Paginated payment list with optional filters
  getPayments: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.InstitutionId) params.append("InstitutionId", filters.InstitutionId);
    if (filters.MatricNo) params.append("MatricNo", filters.MatricNo);
    if (filters.FromDate) params.append("FromDate", filters.FromDate);
    if (filters.ToDate) params.append("ToDate", filters.ToDate);
    if (filters.Status !== undefined) params.append("Status", String(filters.Status));
    params.append("PageNo", String(filters.PageNo ?? 1));
    params.append("PageSize", String(filters.PageSize ?? 100));
    return get(`/api/Payment/get-all-payments?${params.toString()}`);
  },

  // Single payment lookup
  getPaymentById: (paymentId) =>
    get(`/api/Payment/get-payment-by-id?paymentId=${encodeURIComponent(paymentId)}`),

  // BUG FIX: Swagger says this is GET with ?paymentReference=, NOT a POST
  verifyPayment: (paymentReference) =>
    get(`/api/Payment/verify-payment?paymentReference=${encodeURIComponent(paymentReference)}`),

  // Admin: manually update a payment record's status
  updatePaymentStatus: (payload) => put("/api/Payment/update-payment-status", payload),

  // Enum dropdowns for filter UIs
  getPaymentStatusDropdown: () => get("/api/Payment/get-payment-status-for-dropdown"),
  getPaymentChannelDropdown: () => get("/api/Payment/get-payment-channel-for-dropdown"),

  // Initiate payment (QuickPay / guest — no auth needed)
  initiatePayment: (payload) =>
    post("/api/Payment/initiate-payment", payload, { skipAuth: true }),
};
