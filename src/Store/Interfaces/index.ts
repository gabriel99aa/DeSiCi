import { Bill, ProductInterface } from '../../Features/Interfaces'

export interface favoritesState {
  favorites: ProductInterface[]
}

export interface shoppingCarState {
  wannaProduct: ProductInterface[]
}

interface summaryShoppingCar {
  product: string
  off: number
  total: number
}
export interface dataBill extends Bill {
  totalPay?: number
  table: summaryShoppingCar[]
}
export interface billsState {
  bills: dataBill[]
  billSelected: dataBill
}
