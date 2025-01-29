import { useState } from 'react'
import Login from './component/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h3>App Component</h3>
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" element={<Landing />} /> */}
          {/* <Route exact path="/login" element={<Login />} /> */}
          <Route exact path="/" element={<Login1 />} />      
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/tailor-dashboard" element={<TailorDashboard />} />
          <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
          <Route exact path="/customer-selection" element={<CustomerSelectionPage />} />
          <Route exact path="/existing-customer-page" element={<ExistingCustomerPage />} />
          <Route exact path="/new-customer" element={<NewCustomerPage />} />
          <Route exact path="/measurements-form" element={<MeasurementForm />} />
          <Route exact path="/orders" element={<OrdersPage />} />
          <Route exact path="/place-order" element={<PlaceOrder />} />
          <Route exact path="/tailors" element={<TailorsPage />} />

          
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
