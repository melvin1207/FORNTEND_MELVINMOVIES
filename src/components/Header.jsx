import { FaSignInAlt, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const onLogout = () =>{
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <div className="navbar-brand">
            <Link to='/' className='logo'>MELVIN MOVIES</Link>
          </div>
          <ul className='btn-actions'>
            <li>
              <button type="button" className="btn btn-dark">
                <Link to='/login' className='btn-link'>
                  <FaSignInAlt/> Login
                </Link>
              </button>
            </li>
            <li>
              <button type="button" className="btn btn-dark">
                <Link to='/register' className='btn-link'>
                  <FaUser/> Registrar
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Header
