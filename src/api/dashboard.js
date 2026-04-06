import { request } from "./http";

function buildQuery(filters = {}) {
  const params = new URLSearchParams();
  if (filters.InstitutionId) params.append("InstitutionId", filters.InstitutionId);
  if (filters.MatricNo) params.append("MatricNo", filters.MatricNo);
  if (filters.FromDate) params.append("FromDate", filters.FromDate);
  if (filters.ToDate) params.append("ToDate", filters.ToDate);
  if (filters.Status !== undefined) params.append("Status", String(filters.Status));
  params.append("PageNo", String(filters.PageNo ?? 1));
  params.append("PageSize", String(filters.PageSize ?? 50));
  return params.toString();
}

export const dashboardApi = {
  // Fetch a single payment by ID
  transactionById: (id) =>
    request(`/api/Payment/get-payment-by-id?paymentId=${id}`),

  // Main paginated transaction list (supports filters like MatricNo, InstitutionId, dates)
  transactions: (filters = {}) =>
    request(`/api/Payment/get-all-payments?${buildQuery(filters)}`),

  // A small batch for widgets (last 8 records)
  recentTransactions: (filters = {}) =>
    request(`/api/Payment/get-all-payments?${buildQuery({ ...filters, PageSize: 8 })}`),
};
