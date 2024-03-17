import axios from "axios"

const API_URL = 'https://backend-melvinmovies.onrender.com/api/movies/'

//Crear una pelicula
const crearMovie = async (movieData, token) => {
  const  config = { 
    headers: { 
      Authorization: `Bearer ${token}` 
     }
   }

   const response = await axios.post(API_URL, movieData, config)

   return response.data
}

//Get peliculas
const getMovies = async (token) => {
  const config ={
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

//Actualizar likes de una pelicula
const updateMovieLikes = async (id, token) => {
  return (await axios({ method: 'patch', url: API_URL + 'like/' + id, headers: { 'Authorization': `Bearer ${token}` } })).data
}

//Actualizar dislikes de una pelicula
const updateMovieDislikes = async (id, token) => {
  return (await axios({ method: 'patch', url: API_URL + 'dislike/' + id, headers: { 'Authorization': `Bearer ${token}` } })).data
}



const movieService = {
  crearMovie,
  getMovies,
  updateMovieLikes,
  updateMovieDislikes
}

export default movieService