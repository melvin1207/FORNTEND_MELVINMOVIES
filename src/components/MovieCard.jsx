import { useDispatch} from "react-redux"
import { updateMovieLikes} from "../features/movies/movieSlice"



const MovieCard = ({ movie }) => {
  const dispatch = useDispatch()


  return (
    <div className="cards">
      <img className="cardImg" src={movie.backdrop_path} />
      <div className="cardText">
        <div className="cardTitle">{movie.original_title}</div>
        <div className="d-flex">
          <button onClick={() => dispatch(updateMovieLikes(movie._id))} className="btn btn-info btn-card" >
            Me gusta
            <i className="bi bi-hand-thumbs-up-fill"></i>
          </button>
          <button type="button" className="btn btn-danger btn-card">No me gusta<i className="bi bi-hand-thumbs-down-fill"></i></button>
        </div>
        <div className="cardDate">
          {movie.release_year}
          <span className="cardRating">{movie.vote_average}<i className="bi bi-star-fill"></i></span>
          <span className="cardRating">{movie.vote_count}<i className="bi bi-person-check-fill"></i></span>
        </div>
        <div className="cardDescription">{movie.overview}</div>
      </div>
    </div>
  )
}

export default MovieCard
