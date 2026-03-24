import { request } from "./http";

const get = (path, options = {}) =>
  request(path, {
    method: "GET",
    ...options,
  });

const put = (path, body, options = {}) =>
  request(path, {
    method: "PUT",
    body,
    ...options,
  });

function buildStudentListQuery(filters = {}) {
  const params = new URLSearchParams();

  if (filters.InstitutionId) params.append("InstitutionId", filters.InstitutionId);
  if (filters.Department) params.append("Department", filters.Department);
  if (filters.Level) params.append("Level", filters.Level);
  if (filters.Gender) params.append("Gender", filters.Gender);
  if (filters.Name) params.append("Name", filters.Name);

  params.append("PageNo", String(filters.PageNo ?? 1));
  params.append("PageSize", String(filters.PageSize ?? 10));

  return params.toString();
}

export const studentApi = {
  getStudentList: (filters = {}) =>
    get(`/api/Student/student-list?${buildStudentListQuery(filters)}`),

  getStudentProfile: (studentId) =>
    get(`/api/Student/profile/${studentId}`),

  updateStudentBio: (payload) =>
    put("/api/Student/update-student-bio", payload),

  updateStudentInstitution: (payload) =>
    put("/api/Student/update-student-institution", payload),
};