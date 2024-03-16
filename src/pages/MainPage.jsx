import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getMovies, reset } from "../features/movies/movieSlice"
import Spinner from "../components/Spinner"

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
      <section className="container header my-4">
          <h3>Bienvenido {user && user.first_name}</h3>
          <p>Tus peliculas favoritas en un solo lugar</p>
      </section>

      <section>
        {movies.length > 0 ? (
            <div className="container my-5">
              {movies.map((movie) => (
                <div className="cards" key={movie._id}>
                <img className="cardImg" src={movie.backdrop_path} />
                <div className="cardText">
                    <div className="cardTitle">{movie.original_title}</div>
                    <div className="cardDate">
                        {movie.release_date}
                        <span className="cardRating">{movie.vote_average}<i className="fas fa-star" /></span>
                    </div>
                    <div className="cardDescription">{movie.overview}</div>
                </div>
            </div>
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
