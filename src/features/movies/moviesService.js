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

  const response = await axios.get(API_URL, config )

  return response.data
}

//Delete Movie
const deleteMovie = async (id, token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
  const response = await axios.delete(API_URL + id, config)

  return response.data
}

const tareaService = {
  crearMovie,
  getMovies,
  deleteMovie
}

export default tareaService