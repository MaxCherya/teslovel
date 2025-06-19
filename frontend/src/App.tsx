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