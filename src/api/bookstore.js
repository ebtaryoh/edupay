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

const del = (path, options = {}) =>
  request(path, {
    method: "DELETE",
    ...options,
  });

export const bookstoreApi = {
  // Public / Student Endpoints
  getAllBooks: () => get("/api/BookStore/get-all-books"),
  getBookDetails: (bookId) => get(`/api/BookStore/get-book-details/${encodeURIComponent(bookId)}`),
  purchaseBook: (bookId, studentId, payload) =>
    post(`/api/BookStore/purchase-book/${encodeURIComponent(bookId)}/${encodeURIComponent(studentId)}`, payload),

  // Admin Endpoints
  registerNewBook: (payload) => post("/api/BookStore/register-new-book", payload),
  deleteBook: (bookId) => del(`/api/BookStore/delete-book/${encodeURIComponent(bookId)}`),
  changeBookStatus: (payload) => request("/api/BookStore/change-book-status", { method: "PUT", body: payload }),
};
