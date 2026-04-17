import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import DentistDashboard from "./pages/dentist/DentistDashboard";
import DentistOrders from "./pages/dentist/DentistOrders";
import CreateOrder from "./pages/dentist/CreateOrder";
import DentistInvoices from "./pages/dentist/DentistInvoices";
import OrderTracking from "./pages/dentist/OrderTracking";
import Patients from "./pages/dentist/Patients";
import OrderDetails from "./pages/dentist/OrderDetails";

import LabDashboard from "./pages/lab/LabDashboard";
import LabOrders from "./pages/lab/LabOrders";
import LabPricing from "./pages/lab/LabPricing";
import LabInvoices from "./pages/lab/LabInvoices";
import LabOrderDetails from "./pages/lab/LabOrderDetails";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";

import ProtectedRoute from "./components/ProtectedRoute";
import ChoosePlan from "./pages/subscription/ChoosePlan";
import AdminSubscriptions from "./pages/admin/AdminSubscriptions";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= DENTIST ================= */}

        <Route
          path="/dentist"
          element={
            <ProtectedRoute role="DENTIST">
              <DentistDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dentist/orders"
          element={
            <ProtectedRoute role="DENTIST">
              <DentistOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dentist/create"
          element={
            <ProtectedRoute role="DENTIST">
              <CreateOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dentist/invoices"
          element={
            <ProtectedRoute role="DENTIST">
              <DentistInvoices />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dentist/patients"
          element={
            <ProtectedRoute role="DENTIST">
              <Patients />
            </ProtectedRoute>
          }
        />

        {/* Dentist Tracking */}
        <Route
          path="/dentist/orders/:id"
          element={
            <ProtectedRoute role="DENTIST">
              <OrderTracking />
            </ProtectedRoute>
          }
        />

        {/* Dentist Order Details */}
        <Route
          path="/dentist/orders/:id/details"
          element={
            <ProtectedRoute role="DENTIST">
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        {/* ================= LAB ================= */}

        <Route
          path="/lab"
          element={
            <ProtectedRoute role="LAB">
              <LabDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lab/orders"
          element={
            <ProtectedRoute role="LAB">
              <LabOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lab/orders/:id"
          element={
            <ProtectedRoute role="LAB">
              <LabOrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lab/pricing"
          element={
            <ProtectedRoute role="LAB">
              <LabPricing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lab/invoices"
          element={
            <ProtectedRoute role="LAB">
              <LabInvoices />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
 path="/plans"
 element={
   <ProtectedRoute>
     <ChoosePlan />
   </ProtectedRoute>
 }
/>
<Route
 path="/admin/subscriptions"
 element={
   <ProtectedRoute role="ADMIN">
     <AdminSubscriptions />
   </ProtectedRoute>
 }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;