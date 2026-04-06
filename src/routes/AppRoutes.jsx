import { Navigate, Route, Routes } from "react-router-dom";

import OnboardingFlow from "../components/onboarding/OnboardingFlow";
import WelcomePage from "../pages/WelcomePage";

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
import AdminNotifications from "../pages/admin/AdminNotifications";
import AdminPaymentsLanding from "../pages/admin/AdminPaymentsLanding";
import AdminSettlementLanding from "../pages/admin/AdminSettlementLanding";
import AdminSettlementSuccess from "../pages/admin/AdminSettlementSuccess";
import AdminSettlementManageAccounts from "../pages/admin/AdminSettlementManageAccounts";
import AdminSettlementUpdateAccount from "../pages/admin/AdminSettlementUpdateAccount";
import AdminSettlementHistory from "../pages/admin/AdminSettlementHistory";
import AdminSettlementSettings from "../pages/admin/AdminSettlementSettings";
import AdminRecentTransactions from "../pages/admin/AdminRecentTransactions";
import AdminPaymentsReports from "../pages/admin/AdminPaymentsReports";
import AdminManageFees from "../pages/admin/AdminManageFees";
import AdminViewFees from "../pages/admin/AdminViewFees";
import AdminCreateFee from "../pages/admin/AdminCreateFee";
import AdminSetFeeAmount from "../pages/admin/AdminSetFeeAmount";
import AdminCreateFeePreview from "../pages/admin/AdminCreateFeePreview";
import AdminCreateFeeSuccess from "../pages/admin/AdminCreateFeeSuccess";
import AdminManageSpecificFee from "../pages/admin/AdminManageSpecificFee";
import AdminEditFee from "../pages/admin/AdminEditFee";
import AdminEditFeeDurationStart from "../pages/admin/AdminEditFeeDurationStart";
import AdminEditFeeDurationEnd from "../pages/admin/AdminEditFeeDurationEnd";
import AdminDeleteFeeSuccess from "../pages/admin/AdminDeleteFeeSuccess";
import AdminRoutePlaceholder from "../pages/admin/AdminRoutePlaceholder";

/** Admin Bookstore pages */
import AdminBookstoreLanding from "../pages/admin/bookstore/AdminBookstoreLanding";
import AdminBookstoreAddBook from "../pages/admin/bookstore/AdminBookstoreAddBook";
import AdminBookstoreBookDetails from "../pages/admin/bookstore/AdminBookstoreBookDetails";
import AdminBookstoreEditBook from "../pages/admin/bookstore/AdminBookstoreEditBook";

/** Admin Account pages */
import AdminAccountLanding from "../pages/admin/account/AdminAccountLanding";
import AdminMyAccountPersonal from "../pages/admin/account/AdminMyAccountPersonal";
import AdminMyAccountInstitution from "../pages/admin/account/AdminMyAccountInstitution";
import AdminSettingsLanding from "../pages/admin/account/AdminSettingsLanding";
import AdminSettingsPasswordReset from "../pages/admin/account/AdminSettingsPasswordReset";
import AdminSettingsChangeEmail from "../pages/admin/account/AdminSettingsChangeEmail";
import AdminSettingsNotifications from "../pages/admin/account/AdminSettingsNotifications";
import AdminSettingsPrivacyPolicy from "../pages/admin/account/AdminSettingsPrivacyPolicy";
import AdminContactAdmin from "../pages/admin/account/AdminContactAdmin";

/** Admin User Management pages */
import AdminUserManagementLanding from "../pages/admin/account/AdminUserManagementLanding";
import AdminUserManagementStudents from "../pages/admin/account/AdminUserManagementStudents";
import AdminUserManagementStudentData from "../pages/admin/account/AdminUserManagementStudentData";
import AdminUserManagementStudentTransactions from "../pages/admin/account/AdminUserManagementStudentTransactions";
import AdminUserManagementAdministrators from "../pages/admin/account/AdminUserManagementAdministrators";
import AdminUserManagementAdministratorData from "../pages/admin/account/AdminUserManagementAdministratorData";
import AdminUserManagementAdministratorModules from "../pages/admin/account/AdminUserManagementAdministratorModules";
import AdminUserManagementUserReports from "../pages/admin/account/AdminUserManagementUserReports";
import AdminUserManagementAddUserPersonal from "../pages/admin/account/AdminUserManagementAddUserPersonal";
import AdminUserManagementAddUserInstitution from "../pages/admin/account/AdminUserManagementAddUserInstitution";
import AdminUserManagementAddUserSuccess from "../pages/admin/account/AdminUserManagementAddUserSuccess";

/** Student Payments flow */
import PaymentsLanding from "../pages/dashboard/Payments";
import TuitionHealthcare from "../pages/dashboard/TuitionHealthcare";
import OverduePayments from "../pages/dashboard/Overdue";

/** Student Airtime / Data */
import AirtimePurchase from "../pages/dashboard/AirtimePurchase";
import DataPurchase from "../pages/dashboard/DataPurchase";

/** Student Notifications */
import Notifications from "../pages/dashboard/Notifications";

/** Student Transactions */
import Transactions from "../pages/dashboard/Transactions";
import TransactionDetails from "../pages/dashboard/TransactionDetails";

/** Student Checkout */
import PaystackCheckout from "../pages/dashboard/PaystackCheckout";
import PaymentSuccess from "../pages/dashboard/PaymentSuccess";

/** QuickPay */
import QuickPayPayments from "../pages/quickpay/Payments";
import QuickPayCheckout from "../pages/quickpay/PaystackCheckout";
import QuickPaySuccess from "../pages/quickpay/PaymentSuccess";
import QuickPayTransaction from "../pages/quickpay/TransactionDetail";

/** Student Account */
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

/** Student Bookstore */
import BookstoreLanding from "../pages/dashboard/bookstore/BookstoreLanding";
import BookDetails from "../pages/dashboard/bookstore/BookDetails";
import BookstorePayment from "../pages/dashboard/bookstore/BookstorePayment";
import MyBooks from "../pages/dashboard/bookstore/MyBooks";

export default function AppRoutes() {
  const onboarded = localStorage.getItem("hasOnboarded") === "true";

  return (
    <Routes>
      <Route
        path="/"
        element={
          onboarded ? <Navigate to="/welcome" replace /> : <Navigate to="/onboarding" replace />
        }
      />

      <Route path="/onboarding" element={<OnboardingFlow />} />
      <Route path="/welcome" element={<WelcomePage />} />

      {/* Auth */}
      <Route path="/login/student" element={<StudentLogin />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/signup/student" element={<Signup />} />
      <Route path="/signup/admin" element={<AdminSignup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/confirm-reset-password" element={<ConfirmResetPassword />} />

      <Route path="/login-success" element={<LoginSuccess />} />
      <Route path="/register-success" element={<RegisterSuccess />} />

      {/* QuickPay – /quickpay goes directly to payments form (Welcome page is the home) */}
      <Route path="/quickpay" element={<Navigate to="/quickpay/payments" replace />} />
      <Route path="/quickpay/payments" element={<QuickPayPayments />} />
      <Route path="/quickpay/checkout" element={<QuickPayCheckout />} />
      <Route path="/quickpay/success" element={<QuickPaySuccess />} />
      <Route path="/quickpay/transaction/:id" element={<QuickPayTransaction />} />

      <Route element={<ProtectedRoute />}>
        {/* STUDENT DASHBOARD */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />

          {/* Payments */}
          <Route path="payments" element={<PaymentsLanding />} />
          <Route
            path="payments/category/tuition-healthcare"
            element={<TuitionHealthcare />}
          />
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
          <Route
            path="account/my-account/institution"
            element={<MyAccountInstitution />}
          />

          <Route path="account/settings" element={<SettingsLanding />} />
          <Route
            path="account/settings/password-reset"
            element={<SettingsPasswordReset />}
          />
          <Route
            path="account/settings/change-email"
            element={<SettingsChangeEmail />}
          />
          <Route
            path="account/settings/notifications"
            element={<SettingsNotifications />}
          />
          <Route
            path="account/settings/privacy-policy"
            element={<AccountPrivacyPolicy />}
          />

          <Route path="account/faqs" element={<FAQs />} />
          <Route path="account/contact-admin" element={<ContactAdmin />} />

          {/* Bookstore */}
          <Route path="bookstore" element={<BookstoreLanding />} />
          <Route path="bookstore/my-books" element={<MyBooks />} />
          <Route path="bookstore/:bookId" element={<BookDetails />} />
          <Route
            path="bookstore/:bookId/payment"
            element={<BookstorePayment />}
          />
        </Route>

        {/* ADMIN DASHBOARD */}
        <Route path="/admin/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminDashboardHome />} />
          <Route path="notifications" element={<AdminNotifications />} />

          {/* Admin Payments */}
          <Route path="payments" element={<AdminPaymentsLanding />} />
          <Route
            path="payments/settlement"
            element={<AdminSettlementLanding />}
          />
          <Route
            path="payments/settlement/success"
            element={<AdminSettlementSuccess />}
          />
          <Route
            path="payments/settlement/accounts"
            element={<AdminSettlementManageAccounts />}
          />
          <Route
            path="payments/settlement/accounts/edit/:bankId"
            element={<AdminSettlementUpdateAccount />}
          />
          <Route
            path="payments/settlement/history"
            element={<AdminSettlementHistory />}
          />
          <Route
            path="payments/settlement/settings"
            element={<AdminSettlementSettings />}
          />

          <Route
            path="payments/transactions"
            element={<AdminRecentTransactions />}
          />
          <Route
            path="payments/transaction/:id"
            element={<AdminRoutePlaceholder title="Transaction Details" />}
          />
          <Route path="payments/reports" element={<AdminPaymentsReports />} />
          <Route path="payments/manage-fees" element={<AdminManageFees />} />

          <Route path="payments/fees" element={<AdminViewFees />} />
          <Route path="payments/fees/create" element={<AdminCreateFee />} />
          <Route
            path="payments/fees/create/amount"
            element={<AdminSetFeeAmount />}
          />
          <Route
            path="payments/fees/create/preview"
            element={<AdminCreateFeePreview />}
          />
          <Route
            path="payments/fees/create/success"
            element={<AdminCreateFeeSuccess />}
          />

          <Route path="payments/fees/:id" element={<AdminManageSpecificFee />} />
          <Route path="payments/fees/:id/edit" element={<AdminEditFee />} />
          <Route
            path="payments/fees/:id/edit/start-date"
            element={<AdminEditFeeDurationStart />}
          />
          <Route
            path="payments/fees/:id/edit/end-date"
            element={<AdminEditFeeDurationEnd />}
          />
          <Route
            path="payments/fees/:id/delete-success"
            element={<AdminDeleteFeeSuccess />}
          />

          {/* Admin Bookstore */}
          <Route path="bookstore" element={<AdminBookstoreLanding />} />
          <Route path="bookstore/add" element={<AdminBookstoreAddBook />} />
          <Route
            path="bookstore/:bookId"
            element={<AdminBookstoreBookDetails />}
          />
          <Route
            path="bookstore/:bookId/edit"
            element={<AdminBookstoreEditBook />}
          />

          {/* Legacy redirect – payments/bookstore → bookstore */}
          <Route
            path="payments/bookstore"
            element={<Navigate to="/admin/dashboard/bookstore" replace />}
          />

          {/* Admin Account */}
          <Route path="account" element={<AdminAccountLanding />} />
          <Route
            path="account/my-account"
            element={<AdminMyAccountPersonal />}
          />
          <Route
            path="account/my-account/institution"
            element={<AdminMyAccountInstitution />}
          />

          <Route path="account/settings" element={<AdminSettingsLanding />} />
          <Route
            path="account/settings/password-reset"
            element={<AdminSettingsPasswordReset />}
          />
          <Route
            path="account/settings/change-email"
            element={<AdminSettingsChangeEmail />}
          />
          <Route
            path="account/settings/notifications"
            element={<AdminSettingsNotifications />}
          />
          <Route
            path="account/settings/privacy-policy"
            element={<AdminSettingsPrivacyPolicy />}
          />

          <Route
            path="account/user-management"
            element={<AdminUserManagementLanding />}
          />
          <Route
            path="account/user-management/students"
            element={<AdminUserManagementStudents />}
          />
          <Route
            path="account/user-management/students/add-user"
            element={<AdminUserManagementAddUserPersonal />}
          />
          <Route
            path="account/user-management/students/add-user/institution"
            element={<AdminUserManagementAddUserInstitution />}
          />
          <Route
            path="account/user-management/students/add-user/success"
            element={<AdminUserManagementAddUserSuccess />}
          />
          <Route
            path="account/user-management/students/:studentId"
            element={<AdminUserManagementStudentData />}
          />
          <Route
            path="account/user-management/students/:studentId/transactions"
            element={<AdminUserManagementStudentTransactions />}
          />

          <Route
            path="account/user-management/administrators"
            element={<AdminUserManagementAdministrators />}
          />
          <Route
            path="account/user-management/administrators/:adminId"
            element={<AdminUserManagementAdministratorData />}
          />
          <Route
            path="account/user-management/administrators/:adminId/modules"
            element={<AdminUserManagementAdministratorModules />}
          />

          <Route
            path="account/user-management/reports"
            element={<AdminUserManagementUserReports />}
          />

          <Route path="account/contact-admin" element={<AdminContactAdmin />} />

          {/* Quick action shortcut routes */}
          <Route path="users" element={<AdminUserManagementLanding />} />
          <Route path="users/students" element={<AdminUserManagementStudents />} />
          <Route
            path="users/students/add-user"
            element={<AdminUserManagementAddUserPersonal />}
          />
          <Route
            path="users/students/add-user/institution"
            element={<AdminUserManagementAddUserInstitution />}
          />
          <Route
            path="users/students/add-user/success"
            element={<AdminUserManagementAddUserSuccess />}
          />
          <Route
            path="users/students/:studentId"
            element={<AdminUserManagementStudentData />}
          />
          <Route
            path="users/students/:studentId/transactions"
            element={<AdminUserManagementStudentTransactions />}
          />
          <Route
            path="users/administrators"
            element={<AdminUserManagementAdministrators />}
          />
          <Route
            path="users/administrators/:adminId"
            element={<AdminUserManagementAdministratorData />}
          />
          <Route
            path="users/administrators/:adminId/modules"
            element={<AdminUserManagementAdministratorModules />}
          />
          <Route path="users/reports" element={<AdminUserManagementUserReports />} />

          <Route path="support" element={<AdminContactAdmin />} />
          <Route path="settings" element={<AdminSettingsLanding />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}