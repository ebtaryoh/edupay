import { request } from "./http";

export const dashboardApi = {
  me: () => request("/me"),
  recentTransactions: () => request("/api/Payment/get-all-payments"),
  transactions: () => request("/api/Payment/get-all-payments"),
  transactionById: (id) => request(`/api/Payment/get-payment-by-id?id=${id}`),
};
