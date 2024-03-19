import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify' 
import { FaUser } from 'react-icons/fa'
import { reset, updateUser, logout, deleteUser } from '../features/auth/authSlice'

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name:'',
    password:'',
    password2:'',
    phone: 0,
  })

  const [prevUserData, setPrevUserData] = useState({
    first_name: '',
    last_name:'',
    phone: 0
  })

  const {first_name, last_name, password, password2, phone} = formData

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
        first_name, last_name, phone
      }

      setPrevUserData(userData)

      console.log(prevUserData)

      if(userData.first_name === ''){
        userData.first_name = prevUserData.first_name
      } else if(userData.last_name === ''){
        userData.last_name = prevUserData.last_name
      } else if(userData.phone === 0 || userData.phone === ''){
        userData.phone = prevUserData.phone
      }
      toast.success('Perfil actualizado')
      dispatch(updateUser(userData, user._id))
      dispatch(reset())
    }
  }

  const onSubmitDelete = (e) => {
    e.preventDefault()

    if(password !== password2 || first_name !== user.first_name || last_name !== user.last_name){
      toast.error('Los passwords no coinciden')
    } else{
      
      toast.success('Perfil eliminado')
      dispatch(deleteUser(user._id))
      dispatch(logout())
      navigate('/login')
      dispatch(reset())
    }
  }

  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, isSuccess, message, navigate, dispatch])

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
      <section className="container py-5">
        <section className="container header">
          <h4><FaUser/> Bienvenido aqui podra cambiar los datos personales que requiera</h4>
          <p>Por favor ingrese la información que necesite cambiar en los campos correspondientes, solo puede cambiar su nombre, apellidos o numero de telefono</p>
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
            <label htmlFor="password" className="form-label"> Ingrese su Password para confirmar</label>
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
            <label htmlFor="password2" className="form-label">Confirme el password</label>
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

          <button type="submit" className="btn btn-success my-3">Actualizar datos</button>


          <section className="d-flex justify-content-center flex-column my-3">
            <label className="form-label">Si quiere eliminar los datos ingrese los datos solicitados y de click al boton eliminar</label>
            <button type="button" onClick={onSubmitDelete} className="btn btn-danger my-1">Borrar Usuario</button>
          </section>

        </form>

        <section className="d-flex justify-content-end">
          
        </section>
      </section>

      
    </>
  )
}

export default UpdateUser