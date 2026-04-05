import { request } from "./http";

const get = (path, options = {}) => request(path, { method: "GET", ...options });
const post = (path, body, options = {}) => request(path, { method: "POST", body, ...options });
const put = (path, body, options = {}) => request(path, { method: "PUT", body, ...options });

export const feesApi = {
  // Fee Types
  getAllFeeTypes: () => get("/api/Fees/get-all-fee-types"),
  getFeeTypeDropdown: () => get("/api/Fees/get-fee-type-for-dropdown"),
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
  getDepartments: () => get("/api/Department/get-departments"),
  getDepartmentsForDropdown: (institutionCode) =>
    get(`/api/Department/get-departments-for-dropdown?institutionCode=${institutionCode}`),
  createDepartment: (payload) => post("/api/Department/create-department", payload),
  updateDepartment: (payload) => put("/api/Department/update-department", payload),
};

export const levelApi = {
  getAllLevels: () => get("/api/Level/get-all-levels"),
  getLevelsForDropdown: (institutionCode) =>
    get(`/api/Level/get-levels-for-dropdown?institutionCode=${institutionCode}`),
  createLevel: (payload) => post("/api/Level/new-level", payload),
};

export const institutionApi = {
  getInstitutions: () => get("/api/Institution/get-institutions"),
  getInstitutionDropdown: () => get("/api/Institution/get-institution-for-drop-down"),
  getInstitutionTypeDropdown: () => get("/api/Institution/get-institution-type-for-drop-down"),
  createInstitution: (payload) => post("/api/Institution/create-institution", payload),
  getInstitutionById: (id) => get(`/api/Institution/get-institution-by-id?institutionId=${id}`),
};
