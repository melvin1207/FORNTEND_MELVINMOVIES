import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import movieService from "./moviesService"

const initialState = {
  movies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//Obtener las peliculas
export const getMovies = createAsyncThunk('movies/get', async (_, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token
      return await movieService.getMovies(token)
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

//Actualizar likes
export const updateMovieLikes = createAsyncThunk('movies/like', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await movieService.updateMovieLikes(id, token)  && await movieService.getMovies(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = action.payload
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateMovieLikes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateMovieLikes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = action.payload
      })
      .addCase(updateMovieLikes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = movieSlice.actions
export default movieSlice.reducer