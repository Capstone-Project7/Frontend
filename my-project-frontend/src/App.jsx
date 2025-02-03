import { useState } from 'react'
import Login from './component/Login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login1 from './component/Login1'
import Register from './component/Register'
import TailorDashboard from './component/Tailor/TailorDashboard'
import AdminDashboard from './component/Admin/AdminDashboard'
import CustomerSelectionPage from './component/Customers/CustomerSelectionPage'
import ExistingCustomerPage from './component/Customers/ExistingCustomerPage'
import NewCustomerPage from './component/Customers/NewCustomerPage'
import MeasurementForm from './component/Measurement/MeasurementForm'
import OrdersPage from './component/Order/OrdersPage'
import PlaceOrder from './component/Order/PlaceOrder'
import TailorsPage from './component/Tailor/TailorsPage'
import './App.css'
import AppHeader from './component/AppHeader'

const ProtectedRoute = ({children, allowedRoles}) => {
  const authToken = sessionStorage.getItem("authToken");
  const userRole = sessionStorage.getItem("userRole");

  if (!authToken) {
    return <Navigate to="/" />;
  }
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <BrowserRouter>
        <AppHeader />
        <Routes>
          {/* <Route exact path="/" element={<Landing />} /> */}
          {/* <Route exact path="/login" element={<Login />} /> */}
          <Route exact path="/" element={<Login1 />} />      
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/tailor-dashboard" element={
            <ProtectedRoute allowedRoles={["TAILOR"]}>
              <TailorDashboard />
            </ProtectedRoute>
          } />
          <Route exact path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route exact path="/customer-selection" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CustomerSelectionPage />
            </ProtectedRoute>
          } />
          <Route exact path="/existing-customer" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ExistingCustomerPage />
            </ProtectedRoute>
          } />
          <Route exact path="/new-customer" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <NewCustomerPage />
            </ProtectedRoute>
          } />



          <Route exact path="/measurements-form" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <MeasurementForm />
            </ProtectedRoute>
          } />
          <Route exact path="/orders" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <OrdersPage />
            </ProtectedRoute>
          } />
          <Route exact path="/place-order" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <PlaceOrder />
            </ProtectedRoute>
          } />
          <Route exact path="/tailors" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <TailorsPage />
            </ProtectedRoute>
          } />

          
          {/* <Route path="/about/*" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project-type" element={<ProjectType />} />
          <Route path="/project-category" element={<ProjectTypeCategory />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
