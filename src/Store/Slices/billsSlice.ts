import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { billsState, dataBill } from '../Interfaces'
const currentDate = new Date()
const formattedDate = currentDate.toISOString()

const initialState: billsState = {
  bills: [],
  billSelected: {
    direction: '',
    customer: '',
    date: formattedDate,
    id: '',
    totalPay: 0,
    table: [
      {
        product: '',
        off: 0,
        total: 0,
      },
    ],
  },
}

export const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    addBill: (state, action: PayloadAction<dataBill>) => {
      return {
        ...state,
        bills: state.bills.concat(action.payload),
      }
    },
    deleteBill: (state, action: PayloadAction<dataBill>) => {
      if (state.bills.some((item) => action.payload.id === item.id)) {
        const bill = state.bills.find((item) => action.payload.id === item.id)
        return {
          ...state,
          favorites: state.bills.filter((item) => bill?.id !== item.id),
        }
      }
    },
    billSelected: (state, action: PayloadAction<dataBill>) => {
      state.billSelected = action.payload
    },
  },
})

export const { addBill, deleteBill, billSelected } = billsSlice.actions

export const billsSelect = (state: RootState) => state.bills

export default billsSlice.reducer
