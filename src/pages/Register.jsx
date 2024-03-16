import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { reset, register } from '../features/auth/authSlice'
import { TailSpin } from 'react-loader-spinner'


const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name:'',
    email:'',
    password:'',
    password2:'',
    phone: 0,
    isAdmin: false
  })

  const {first_name, last_name, email, password, password2, phone, isAdmin} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  const onChange = (e) => {
    setFormData((prevState) =>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password2){
      toast.error('Los passwords no coinciden')
    } else{
      const userData = {
        first_name, last_name, password, email, phone, isAdmin
      }
      dispatch(register(userData))
    }
  }

  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    if(isSuccess){
      navigate('/login')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  if(isLoading){
    return <TailSpin/>
  }

  return (
    <>
      <section className="container py-5">
        <section className="container header">
          <h4><FaUser/> Registrar nuevo usuario</h4>
          <p>Por favor crea un nuevo usuario</p>
        </section>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="first_name" className="form-label">Nombre</label>
            <input 
              type="text"
              className='form-control' 
              id='first_name' 
              name='first_name'
              value={first_name}
              placeholder="Ingresa tu nombre por favor"
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">Apellidos</label>
              <input 
                type="text"
                className='form-control' 
                id='last_name' 
                name='last_name'
                value={last_name}
                placeholder="Ingresa tu apellido por favor"
                onChange={onChange}
              />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email"
                className='form-control' 
                id='email' 
                name='email'
                value={email}
                placeholder="Ingresa tu email por favor"
                onChange={onChange}
              />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Telefono</label>
              <input 
                type="phone"
                className='form-control' 
                id='phone' 
                name='phone'
                value={phone}
                placeholder="Ingresa tu telefono por favor"
                onChange={onChange}
              />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password"
                className='form-control' 
                id='password' 
                name='password'
                value={password}
                placeholder="Ingresa tu password por favor"
                onChange={onChange}
              />
          </div>

          <div className="mb-3">
            <label htmlFor="password2" className="form-label">Confirmación de password</label>
              <input 
                type="password"
                className='form-control' 
                id='password2' 
                name='password2'
                value={password2}
                placeholder="Ingresa tu password otra vez"
                onChange={onChange}
              />
          </div>

          <select className="form-select" aria-label="Default select example" id="isAdmin" name="isAdmin" value={isAdmin} onChange={onChange}>
            <option selected>El usuario es administrador?</option>
            <option value={true}>Si</option>
            <option value={false}>No</option>
          </select>

          <button type="submit" className="btn btn-success my-3">Crear usuario</button>
        </form>
      </section>
    </>
  )
}

export default Register