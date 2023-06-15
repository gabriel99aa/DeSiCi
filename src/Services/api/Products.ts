import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import ky from 'ky'
import { DocsList } from '../interfaces/types'

export const Products = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
    fetchFn: (...args) => ky(...args),
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<any, void>({
      query: () => `/products`,
    }),
  }),
  reducerPath: 'getProducts',
})

export const { useGetProductsQuery } = Products
