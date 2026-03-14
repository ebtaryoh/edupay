import http from "./http";

export const dashboardApi = {
  me: () => http.get("/me"),
  recentTransactions: () => http.get("/transactions/recent"),
  transactions: (params) => http.get("/transactions", { params }),
  transactionById: (id) => http.get(`/transactions/${id}`),
};
