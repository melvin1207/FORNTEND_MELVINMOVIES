import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getMovies, reset, updateMovieLikes } from "../features/movies/movieSlice"
import Spinner from "../components/Spinner"
import MovieCard from "../components/MovieCard"

const MainPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { movies, isLoading, isError, isSuccess, message } = useSelector((state) => state.movie)
  
  useEffect(() => {

    if (isError) {
        console.log(message)
    }

    if (!user) {
        navigate('/login')
    } else {
        //Hay que poner el get aqui
        dispatch(getMovies())
    }

    return () => {
        dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

if (isLoading) {
    return <Spinner/>
}

  return (
    <>
      <section className="container header my-4 py-5">
          <h3>Bienvenido {user && user.first_name}</h3>
          <p>Tus peliculas favoritas en un solo lugar</p>
      </section>

      <section className="container my-5">
        {movies.length > 0 ? (
            <div>
              {movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie}/>
              ))}
            </div>
        ) : (
          <h3>No hay peliculas para mostrar</h3>
        )}
      </section>
    </>
  )
}

export default MainPage
