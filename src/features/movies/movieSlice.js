import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieService from './moviesService'

const initialState = {
  movies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//Crear una pelicula
export const createMovie = createAsyncThunk('movies/create', async (movie, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await movieService.createMovie(movie, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Update de una pelicula
export const updateMovie = createAsyncThunk('movies/update', async (movie, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await movieService.updateMovie(movie, token) && movieService.getMovie(movie.id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Obtener una peliculas
export const getMovie = createAsyncThunk('movies/getone', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await movieService.getMovie(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

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

//Actualizar dislikes
export const deleteMovie = createAsyncThunk('movies/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await movieService.deleteMovie(id, token) && movieService.getMovies()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Eliminar una pelicula
export const updateMovieDislikes = createAsyncThunk('movies/dislike', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await movieService.updateMovieDislikes(id, token)  && await movieService.getMovies(token)
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
      .addCase(createMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMovie.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = action.payload
      })
      .addCase(createMovie.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(updateMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateMovie.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = action.payload
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = action.payload
      })
      .addCase(getMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
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
      .addCase(updateMovieDislikes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateMovieDislikes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = action.payload
      })
      .addCase(updateMovieDislikes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteMovie.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deleteMovie.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  }
})

export const { reset } = movieSlice.actions
export default movieSlice.reducer