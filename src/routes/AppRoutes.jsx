import { Navigate, Route, Routes } from "react-router-dom";

import OnboardingFlow from "../components/onboarding/OnboardingFlow";

// Auth
import StudentLogin from "../pages/auth/StudentLogin";
import AdminLogin from "../pages/auth/AdminLogin";
import AdminSignup from "../pages/auth/AdminSignup";
import Signup from "../pages/auth/Signup";
import LoginSuccess from "../pages/auth/LoginSuccess";
import RegisterSuccess from "../pages/auth/RegisterSuccess";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ConfirmResetPassword from "../pages/auth/ConfirmResetPassword";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";

/** Student Dashboard pages */
import DashboardHome from "../pages/dashboard/DashboardHome";

/** Admin Dashboard pages */
import AdminDashboardHome from "../pages/admin/AdminDashboardHome";

/** Payments flow (student dashboard) */
import PaymentsLanding from "../pages/dashboard/Payments";
import TuitionHealthcare from "../pages/dashboard/TuitionHealthcare";
import OverduePayments from "../pages/dashboard/Overdue";

/** Airtime / Data (student dashboard) */
import AirtimePurchase from "../pages/dashboard/AirtimePurchase";
import DataPurchase from "../pages/dashboard/DataPurchase";

/** Notifications (student dashboard) */
import Notifications from "../pages/dashboard/Notifications";

/** Transactions (student dashboard) */
import Transactions from "../pages/dashboard/Transactions";
import TransactionDetails from "../pages/dashboard/TransactionDetails";

/** Checkout (student dashboard) */
import PaystackCheckout from "../pages/dashboard/PaystackCheckout";
import PaymentSuccess from "../pages/dashboard/PaymentSuccess";

/** QuickPay (standalone) */
import QuickPayHome from "../pages/quickpay/QuickPayHome";
import QuickPayPayments from "../pages/quickpay/Payments";

/** Account Section (student dashboard) */
import AccountLanding from "../pages/dashboard/account/AccountLanding";
import MyAccountPersonal from "../pages/dashboard/account/MyAccountPersonal";
import MyAccountInstitution from "../pages/dashboard/account/MyAccountInstitution";
import SettingsLanding from "../pages/dashboard/account/SettingsLanding";
import SettingsPasswordReset from "../pages/dashboard/account/SettingsPasswordReset";
import SettingsChangeEmail from "../pages/dashboard/account/SettingsChangeEmail";
import SettingsNotifications from "../pages/dashboard/account/SettingsNotifications";
import AccountPrivacyPolicy from "../pages/dashboard/account/AccountPrivacyPolicy";
import FAQs from "../pages/dashboard/account/FAQs";
import ContactAdmin from "../pages/dashboard/account/ContactAdmin";

/** Bookstore (student dashboard) */
import BookstoreLanding from "../pages/dashboard/bookstore/BookstoreLanding";
import BookDetails from "../pages/dashboard/bookstore/BookDetails";
import BookstorePayment from "../pages/dashboard/bookstore/BookstorePayment";

export default function AppRoutes() {
  const onboarded = localStorage.getItem("hasOnboarded") === "true";

  return (
    <Routes>
      {/* ✅ Default route (QuickPayHome after onboarding) */}
      <Route
        path="/"
        element={onboarded ? <QuickPayHome /> : <Navigate to="/onboarding" replace />}
      />

      {/* Onboarding */}
      <Route path="/onboarding" element={<OnboardingFlow />} />

      {/* Auth */}
      <Route path="/login/student" element={<StudentLogin />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/signup/student" element={<Signup />} />
      <Route path="/signup/admin" element={<AdminSignup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/confirm-reset-password" element={<ConfirmResetPassword />} />

      <Route path="/login-success" element={<LoginSuccess />} />
      <Route path="/register-success" element={<RegisterSuccess />} />

      {/* QuickPay (standalone) */}
      <Route path="/quickpay" element={<QuickPayHome />} />
      <Route path="/quickpay/payments" element={<QuickPayPayments />} />

      {/* ✅ Protected zone */}
      <Route element={<ProtectedRoute />}>
        {/* STUDENT DASHBOARD */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />

          {/* Payments */}
          <Route path="payments" element={<PaymentsLanding />} />
          <Route path="payments/category/tuition-healthcare" element={<TuitionHealthcare />} />
          <Route path="payments/overdue" element={<OverduePayments />} />
          <Route path="payments/airtime" element={<AirtimePurchase />} />
          <Route path="payments/data" element={<DataPurchase />} />

          {/* Notifications */}
          <Route path="notifications" element={<Notifications />} />

          {/* Transactions */}
          <Route path="transactions" element={<Transactions />} />
          <Route path="transaction/:id" element={<TransactionDetails />} />

          {/* Checkout */}
          <Route path="checkout" element={<PaystackCheckout />} />
          <Route path="success" element={<PaymentSuccess />} />

          {/* Account */}
          <Route path="account" element={<AccountLanding />} />
          <Route path="account/my-account" element={<MyAccountPersonal />} />
          <Route path="account/my-account/institution" element={<MyAccountInstitution />} />

          <Route path="account/settings" element={<SettingsLanding />} />
          <Route path="account/settings/password-reset" element={<SettingsPasswordReset />} />
          <Route path="account/settings/change-email" element={<SettingsChangeEmail />} />
          <Route path="account/settings/notifications" element={<SettingsNotifications />} />
          <Route path="account/settings/privacy-policy" element={<AccountPrivacyPolicy />} />

          <Route path="account/faqs" element={<FAQs />} />
          <Route path="account/contact-admin" element={<ContactAdmin />} />

          {/* Bookstore */}
          <Route path="bookstore" element={<BookstoreLanding />} />
          <Route path="bookstore/:bookId" element={<BookDetails />} />
          <Route path="bookstore/:bookId/payment" element={<BookstorePayment />} />
        </Route>

        {/* ✅ ADMIN DASHBOARD */}
        <Route path="/admin/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminDashboardHome />} />

          {/* Add admin pages here later:
              <Route path="transactions" element={<AdminTransactions />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="reports" element={<AdminReports />} />
              etc...
          */}
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}