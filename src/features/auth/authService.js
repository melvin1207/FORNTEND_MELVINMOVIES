import axios from "axios"

const API_URL = 'https://backend-melvinmovies.onrender.com/api/users/'

//Peticón al backend para crear un usuario
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  return response.data
}

const authService = {
  register
}

export default authService