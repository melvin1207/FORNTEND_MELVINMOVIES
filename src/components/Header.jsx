import { FaSignInAlt, FaUser, FaSignOutAlt, FaFilm } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <div className="navbar-brand">
            <Link to='/' className='logo'>MELVIN MOVIES</Link>
        </div>
          
        <ul className='btn-actions'>
            {user ? (
              user.isAdmin === true ? (
                <>
                  <li>
                    <Link to='/updateMovies'>
                      <button type="button" className="btn btn-dark">
                        <FaFilm/> Actualizar Peliculas
                      </button>
                    </Link>
                  </li>

                  <li>
                    <Link to='/updateUser'>
                      <button type="button" className="btn btn-dark">
                        <FaUser/> Actualizar Datos
                      </button>
                    </Link>
                  </li>

                  <li>
                    <button className="btn btn-dark" onClick={onLogout}>
                      <FaSignOutAlt/> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to='/updateUser'>
                      <button type="button" className="btn btn-dark">
                        <FaUser/> Actualizar Datos
                      </button>
                    </Link>
                  </li>

                  <li>
                    <button className="btn btn-dark" onClick={onLogout}>
                      <FaSignOutAlt/> Logout
                    </button>
                  </li>
                </>
              )
            ): (
              <>
                <li>
                  <Link to='/login'>
                    <button type="button" className="btn btn-dark">
                     <FaSignInAlt/> Login 
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to='/register'>
                    <button type="button" className="btn btn-dark">
                      <FaUser/> Registrar
                    </button>
                  </Link>
                </li>
              </>
            )}
        </ul>
      </div>
    </nav>
  )
}

export default Header
