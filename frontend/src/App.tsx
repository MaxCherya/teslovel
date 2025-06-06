import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './locales/index'

import MainLayout from './components/layouts/MainLayout'
import Home from './pages/main/Home'
import NotFound from './pages/main/NotFound'
import About from './pages/main/About'
import Models from './pages/main/Models'
import Feedbacks from './pages/main/Feedbacks'

function App() {
  return (
    <BrowserRouter>

      {/* Routing */}
      <Routes>
        <Route path='/' element={<MainLayout />}>

          {/* Main Pages */}
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='models' element={<Models />} />
          <Route path='feedbacks' element={<Feedbacks />} />
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