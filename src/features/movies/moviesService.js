import axios from 'axios'

const API_URL = 'https://backend-melvinmovies.onrender.com/api/movies/'

//Crear una pelicula
const createMovie = async (movieData, token) => {
  const config = {
    headers: { 
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, movieData, config)
  return response.data
}

//Actualizar una pelicula
const updateMovie = async (id, movieData, token) => {
  const { data } = await axios({ method: 'patch', url: API_URL + 'update/' + id, headers: { 'Authorization': `Bearer ${token}` }, data: movieData})
  return data
}

//Get peliculas
const getMovie = async (id, token) => {
  const config ={
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL + id, config)
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
  const { data } = await axios({ method: 'patch', url: API_URL + 'like/' + id, headers: { 'Authorization': `Bearer ${token}` } })
  return data
}

//Actualizar dislikes de una pelicula
const updateMovieDislikes = async (id, token) => {
  const { data } = await axios({ method: 'patch', url: API_URL + 'dislike/' + id, headers: { 'Authorization': `Bearer ${token}` } })
  return data
}

//Delete peliculas
const deleteMovie = async (id, token) => {
  const config ={
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + 'destroy/' + id, config)
  return response.data
}

const movieService = {
  createMovie,
  updateMovie,
  getMovie,
  getMovies,
  updateMovieLikes,
  deleteMovie,
  updateMovieDislikes,
}

export default movieService