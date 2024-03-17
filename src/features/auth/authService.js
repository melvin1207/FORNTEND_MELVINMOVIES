import axios from "axios"

const API_URL = 'https://backend-melvinmovies.onrender.com/api/users/'

//Peticón al backend para crear un usuario
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  return response.data
}

//Funcion para logear
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if(response.data){
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

//Funcion para actualizar un usuario
const  updateUser = async (id, userData, token) =>{
  return (await axios({ method: 'patch', url: API_URL + id, headers: { 'Authorization': `Bearer ${token}` }, data: userData })).data
}

//Logout para el usuario
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  updateUser,
  logout
}

export default authService