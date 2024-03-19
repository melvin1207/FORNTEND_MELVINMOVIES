import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

//Obtener local Storage de los datos del usuario
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//Registrar un nuevo usuario
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
  try{
    return await authService.register(user)
  }catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Logear un nuevo usuario
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) { 
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Logear un nuevo usuario
export const updateUser = createAsyncThunk('auth/update', async (user, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    const id = thunkAPI.getState().auth.user._id
    return await authService.updateUser(id, user, token) 
  } catch (error) { 
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Eliminar un usuario
export const deleteUser = createAsyncThunk('auth/borrar', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await authService.deleteUser(id, token) 
  } catch (error) { 
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Logout
export const logout = createAsyncThunk('auth/logout', async() =>{
  await authService.logout()
})

export const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(register.fulfilled,(state)=>{
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(register.rejected, (state, action) =>{
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer