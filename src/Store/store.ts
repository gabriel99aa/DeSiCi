import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { Products } from '../Services/api/Products'
import favoritesSlice from './Slices/favoritesSlice'
import billsSlice from './Slices/billsSlice'
import shoppingCarSlice from './Slices/shoppingCarSlice'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Products.middleware),
  reducer: {
    bills: billsSlice,
    favorites: favoritesSlice,
    shoppingCar: shoppingCarSlice,
    [Products.reducerPath]: Products.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
