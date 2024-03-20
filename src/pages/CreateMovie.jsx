import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { reset, createMovie } from '../features/movies/movieSlice'
import Spinner from '../components/Spinner'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const CreateMovie = () => {
  const [formData, setFormData] = useState({
    adult: false,
    backdrop_path:'',
    original_language:'',
    original_title:'',
    overview:'',
    popularity: 0,
    poster_path: '',
    release_year: 0,
    title: ''
  })

  const {adult,backdrop_path, original_language, original_title, overview, popularity, poster_path, release_year, title} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  const onChange = (e) => {
    setFormData((prevState) =>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const movieData = {
      adult,backdrop_path, original_language, original_title, overview, popularity, poster_path, release_year, title
    }
    dispatch(createMovie(movieData))
    toast.success('Pelicula nueva creada')
    navigate('/mainPage')
    dispatch(reset())
  }

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
      <section className="container py-5">
        <section className="container header">
          <h4>¿Quieres crear una nueva pelicula</h4>
          <p>Por favor ingresa los datos y da click en el boton crear</p>
        </section>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Ingresa el titulo de la pelicula</label>
            <input 
              type="text"
              className='form-control' 
              id='title' 
              name='title'
              value={title}
              placeholder="Ingresa el titulo"
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="original_title" className="form-label">Ingresa el titulo en el idioma original</label>
              <input 
                type="text"
                className='form-control' 
                id='original_title' 
                name='original_title'
                value={original_title}
                placeholder="Ingresa el titulo con el idioma original"
                onChange={onChange}
              />
          </div>

          <div className="mb-3">
            <label htmlFor="original_language" className="form-label">Ingresa el idioma original</label>
              <input 
                type="text"
                className='form-control' 
                id='original_language' 
                name='original_language'
                value={original_language}
                placeholder="Ingresa el titulo con el idioma original"
                onChange={onChange}
              />
          </div>

          <div className="mb-3">
            <label htmlFor="overview" className="form-label">Ingresa el overview de la pelicula</label>
              <textarea 
                type="text"
                className='form-control' 
                id='overview' 
                name='overview'
                value={overview}
                placeholder="Ingresa el resumen de la pelicula"
                onChange={onChange}
              />
          </div>

          <div className="mb-3">
            <label htmlFor="backdrop_path" className="form-label">Poster de la pelicula</label>
              <input 
                type="text"
                className='form-control' 
                id='backdrop_path' 
                name='backdrop_path'
                value={backdrop_path}
                placeholder="Ingresa el link del poster de la pelicula por favor"
                onChange={onChange}
              />
          </div>

          <div className="mb-3">
            <label htmlFor="poster_path" className="form-label">Fondo de la pelicula</label>
              <input 
                type="text"
                className='form-control' 
                id='poster_path' 
                name='poster_path'
                value={poster_path}
                placeholder="Ingresa el link del fondo de la pelicula por favor"
                onChange={onChange}
              />
          </div>

          <div className="mb-3">
            <label htmlFor="release_year" className="form-label">Año de lanzamiento</label>
              <input 
                type="number"
                className='form-control' 
                id='release_year' 
                name='release_year'
                value={release_year}
                placeholder="Ingresael año de lanzamiento de la pelicula"
                onChange={onChange}
              />
          </div>

          <div className="mb-3">
            <label htmlFor="popularity" className="form-label">Preferencia</label>
              <input 
                type="number"
                className='form-control' 
                id='popularity' 
                name='popularity'
                value={popularity}
                placeholder="Del uno al 10 cuanto te gusta la pelicula"
                onChange={onChange}
              />
          </div>

          <label htmlFor="adult" className="form-label">Es para adultos?</label>
          <select className="form-select" id="adult" name="adult" value={adult} onChange={onChange}>
            <option value="Selected" selected disabled="disabled">Selecciona...</option>
            <option value={true} >Si</option>
            <option value={false}>No</option>
          </select>

          <button type="submit" className="btn btn-success my-3">Crear pelicula</button>
        </form>
      </section>
    </>
  )
}

export default CreateMovie