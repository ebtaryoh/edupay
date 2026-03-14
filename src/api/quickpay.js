import { request } from "./http";

export const quickpayApi = {
  initiate: (payload) => request("/quickpay/initiate", { method: "POST", body: payload }),
  verify: (reference) => request(`/quickpay/verify?reference=${encodeURIComponent(reference)}`),
  transaction: (id) => request(`/quickpay/transactions/${id}`),
};
