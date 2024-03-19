import { useDispatch, useSelector } from 'react-redux'
import { updateMovieLikes, updateMovieDislikes, deleteMovie, reset, getMovies} from '../features/movies/movieSlice'
import { toast } from 'react-toastify'



const MovieCard = ({ movie }) => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const onClick = (e) => {
    e.preventDefault()

    dispatch(deleteMovie(movie._id))
    toast.success('Pelicula eliminada')
    dispatch(reset())
  }

  return (
    <div className="cards">
      {user.isAdmin === true ? (
        <>
          <img className="cardImg" src={movie.backdrop_path} />
          <div className="cardText d-flex justify-content-evenly">
            <section className="d-flex justify-content-end"> 
              <button onClick={onClick} type="button" className="btn btn-danger rounded-circle btn-eliminate">X</button>
            </section>

            <section>
              <div className="cardTitle">{movie.original_title}</div>
              <div className="d-flex">
                <button onClick={() => dispatch(updateMovieLikes(movie._id))} className="btn btn-info btn-card" >
                  Me gusta
                  <i className="bi bi-hand-thumbs-up-fill"></i>
                </button>
                <button onClick={() => dispatch(updateMovieDislikes(movie._id))} className="btn btn-danger btn-card">
                  No me gusta
                  <i className="bi bi-hand-thumbs-down-fill"></i>
                </button>
              </div>
              <div className="cardDate">
                {movie.release_year}
              <span className="cardRating">{parseFloat(movie.vote_average).toFixed(1)}<i className="bi bi-star-fill"></i></span>
              <span className="cardRating">{movie.vote_count}<i className="bi bi-person-check-fill"></i></span>
              </div>
              <div className="cardDescription">{movie.overview}</div>
            </section>
          </div>
        </>  
      ) : (
        <>
          <img className="cardImg" src={movie.backdrop_path} />
          <div className="cardText">
            <div className="cardTitle">{movie.original_title}</div>
            <div className="d-flex">
              <button onClick={() => dispatch(updateMovieLikes(movie._id))} className="btn btn-info btn-card" >
                Me gusta
                <i className="bi bi-hand-thumbs-up-fill"></i>
              </button>
              <button onClick={() => dispatch(updateMovieDislikes(movie._id))} className="btn btn-danger btn-card">
                No me gusta
                <i className="bi bi-hand-thumbs-down-fill"></i>
              </button>
            </div>
            <div className="cardDate">
              {movie.release_year}
              <span className="cardRating">{parseFloat(movie.vote_average).toFixed(1)}<i className="bi bi-star-fill"></i></span>
              <span className="cardRating">{movie.vote_count}<i className="bi bi-person-check-fill"></i></span>
            </div>
            <div className="cardDescription">{movie.overview}</div>
          </div>
        </>
      )}      
    </div>
  )
}

export default MovieCard
