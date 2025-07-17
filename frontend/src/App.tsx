import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './locales/index'
import "react-datepicker/dist/react-datepicker.css";

import MainLayout from './components/layouts/MainLayout'
import Home from './pages/main/Home'
import NotFound from './pages/main/NotFound'
import About from './pages/main/About'
import Models from './pages/main/Models'
import Feedbacks from './pages/main/Feedbacks'
import { useEffect } from 'react'
import BikePage from './pages/main/BikePage'
import BookPage from './pages/main/BookPage'
import Login from './pages/main/Login';
import Signup from './pages/main/Signup';
import UserProfile from './pages/protected/UserProfile';
import ProtectedRoute from './lib/routes/ProtectedRoute';
import MainAdminPage from './pages/admin/MainAdminPage';
import CatalogAdmin from './pages/admin/CatalogAdmin';
import AddNewBike from './pages/admin/AddNewBike';
import EnginePositionAdmin from './pages/admin/EnginePositionAdmin';
import BrakesTypeAdmin from './pages/admin/BrakesTypeAdmin';
import BatteryTypeAdmin from './pages/admin/BatteryTypeAdmin';
import AddBatteryType from './pages/admin/AddBatteryType';
import AddBrakesType from './pages/admin/AddBrakesType';
import AddEnginePosition from './pages/admin/AddEnginePosition';
import BikePageAdmin from './pages/admin/BikePageAdmin';
import OrderRequests from './pages/admin/OrderRequests';

function App() {

  useEffect(() => {
    const preload = document.getElementById("preload-content");
    if (preload) {
      preload.remove();
    }
  }, []);

  return (
    <BrowserRouter>

      {/* Routing */}
      <Routes>
        <Route path='/' element={<MainLayout />}>

          {/* Main Pages */}
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='models' element={<Models />} />
          <Route path='models/:bikeId' element={<BikePage />} />
          <Route path='book/:bikeId' element={<BookPage />} />
          <Route path='feedbacks' element={<Feedbacks />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path="*" element={<NotFound />} />

          {/* User Protected Pages */}
          <Route path='/user/:userId' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

          {/* Admin Pages */}
          <Route path='/main-admin/' element={<MainAdminPage />} />
          <Route path='/catalog-admin/' element={<CatalogAdmin />} />
          <Route path='/bike-page-admin/:bikeId' element={<BikePageAdmin />} />
          <Route path='/orders-admin/' element={<OrderRequests />} />

          <Route path='/add-new-bike-admin/' element={<AddNewBike />} />
          <Route path='/add-battery-type-admin/' element={<AddBatteryType />} />
          <Route path='/add-brake-type-admin/' element={<AddBrakesType />} />
          <Route path='/add-engine-position-admin/' element={<AddEnginePosition />} />

          <Route path='/motor-positions-admin/' element={<EnginePositionAdmin />} />
          <Route path='/brake-types-admin/' element={<BrakesTypeAdmin />} />
          <Route path='/battery-types-admin/' element={<BatteryTypeAdmin />} />

        </Route>
      </Routes>

      {/* ToastifyContainer */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

    </BrowserRouter>
  )
}

export default App