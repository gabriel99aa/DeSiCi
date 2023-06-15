import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ProductInterface } from '../../Features/Interfaces'
import { favoritesState } from '../Interfaces'

const initialState: favoritesState = {
  favorites: [],
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<ProductInterface>) => {
      if (!state.favorites.some((item) => action.payload.id === item.id)) {
        return {
          ...state,
          favorites: state.favorites.concat(action.payload),
        }
      }
      if (state.favorites.some((item) => action.payload.id === item.id)) {
        const dontLike = state.favorites.find(
          (item) => action.payload.id === item.id
        )
        return {
          ...state,
          favorites: state.favorites.filter((item) => dontLike?.id !== item.id),
        }
      }
    },
  },
})

export const { addFavorite } = favoritesSlice.actions

export const favoritesSelect = (state: RootState) => state.favorites

export default favoritesSlice.reducer
