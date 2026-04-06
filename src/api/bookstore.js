import { request } from "./http";

const get = (path, options = {}) => request(path, { method: "GET", ...options });
const post = (path, body, options = {}) => request(path, { method: "POST", body, ...options });
const put = (path, body, options = {}) => request(path, { method: "PUT", body, ...options });
const del = (path, options = {}) => request(path, { method: "DELETE", ...options });

export const bookstoreApi = {
  // ─── Student / Public ───────────────────────────────────────────────────────

  // List all books (supports InstitutionId, Category, Name, PageNo, PageSize)
  getAllBooks: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.InstitutionId) params.append("InstitutionId", filters.InstitutionId);
    if (filters.Category !== undefined) params.append("Category", String(filters.Category));
    if (filters.Name) params.append("Name", filters.Name);
    params.append("PageNo", String(filters.PageNo ?? 1));
    params.append("PageSize", String(filters.PageSize ?? 50));
    return get(`/api/BookStore/get-all-books?${params.toString()}`);
  },

  // Single book detail
  getBookDetails: (bookId) =>
    get(`/api/BookStore/get-book-details/${encodeURIComponent(bookId)}`),

  // Check availability before purchase
  isBookAvailable: (bookId) =>
    get(`/api/BookStore/is-book-available/${encodeURIComponent(bookId)}`),

  // Check if student already purchased this book
  isBookPurchased: (bookId, studentId) =>
    get(`/api/BookStore/is-book-purchased/${encodeURIComponent(bookId)}/${encodeURIComponent(studentId)}`),

  // Purchase a book
  purchaseBook: (bookId, studentId, payload) =>
    post(
      `/api/BookStore/purchase-book/${encodeURIComponent(bookId)}/${encodeURIComponent(studentId)}`,
      payload
    ),

  // Get purchase confirmation/receipt by paymentId
  getBookPurchaseDetails: (paymentId) =>
    get(`/api/BookStore/get-book-purchase-details/${encodeURIComponent(paymentId)}`),

  // Student's purchase history (filters: StudentId, BookId, InstitutionId, dates, etc.)
  getAllPurchasedBooks: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.StudentId) params.append("StudentId", filters.StudentId);
    if (filters.InstitutionId) params.append("InstitutionId", filters.InstitutionId);
    if (filters.BookId) params.append("BookId", filters.BookId);
    if (filters.FromDate) params.append("FromDate", filters.FromDate);
    if (filters.ToDate) params.append("ToDate", filters.ToDate);
    if (filters.BookCategory !== undefined) params.append("BookCategory", String(filters.BookCategory));
    if (filters.Name) params.append("Name", filters.Name);
    params.append("PageNo", String(filters.PageNo ?? 1));
    params.append("PageSize", String(filters.PageSize ?? 50));
    return get(`/api/BookStore/get-all-purchased-books?${params.toString()}`);
  },

  // Total amount student has spent in bookstore
  getTotalAmountSpent: (studentId) =>
    get(`/api/BookStore/get-total-amount-spent/${encodeURIComponent(studentId)}`),

  // Enum helpers
  getBookCategories: () => get("/api/BookStore/get-book-category"),
  getBookStatuses: () => get("/api/BookStore/get-book-status"),

  // ─── Admin ───────────────────────────────────────────────────────────────────

  registerNewBook: (payload) => post("/api/BookStore/register-new-book", payload),
  deleteBook: (bookId) => del(`/api/BookStore/delete-book/${encodeURIComponent(bookId)}?bookId=${encodeURIComponent(bookId)}`),
  changeBookStatus: (payload) => put("/api/BookStore/change-book-status", payload),
};
