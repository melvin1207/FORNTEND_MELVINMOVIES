import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import MainPage from "./pages/MainPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Header from "./components/Header"
import UpdateUser from "./pages/UpdateUser"
import UpdateMovies from "./pages/UpdateMovies"

function App() {
  return (
    <>
      <Router>
        <div>
          <Header/>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/updateUser' element={<UpdateUser/>}/>
            <Route path='/updateMovies' element={<UpdateMovies/>}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  )
}

export default App