import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ProductInterface } from '../../Features/Interfaces'
import { shoppingCarState } from '../Interfaces'

const initialState: shoppingCarState = {
  wannaProduct: [],
}

export const shoppingCarSlice = createSlice({
  name: 'shoppingCar',
  initialState,
  reducers: {
    wannaProduct: (state, action: PayloadAction<ProductInterface>) => {
      if (!state.wannaProduct.some((item) => action.payload.id === item.id)) {
        return {
          ...state,
          wannaProduct: state.wannaProduct.concat(action.payload),
        }
      }
    },
    dontWannaProduct: (state, action: PayloadAction<ProductInterface>) => {
      if (state.wannaProduct.some((item) => action.payload.id === item.id)) {
        const wanna = state.wannaProduct.find(
          (item) => action.payload.id === item.id
        )
        return {
          ...state,
          wannaProduct: state.wannaProduct.filter(
            (item) => wanna?.id !== item.id
          ),
        }
      }
    },
    clearShoppingCar: (state) => {
      state.wannaProduct = []
    },
  },
})

export const { wannaProduct, dontWannaProduct, clearShoppingCar } =
  shoppingCarSlice.actions

export const shoppingCarSelect = (state: RootState) => state.shoppingCar

export default shoppingCarSlice.reducer
