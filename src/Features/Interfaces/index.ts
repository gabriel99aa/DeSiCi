import { IconButtonProps } from '@mui/material/IconButton'

export interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

export interface ProductInterface {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface MediaProps {
  load?: boolean
  isCarPage?: boolean
  product: ProductInterface
}

export interface Bill {
  direction: string | undefined
  customer: string | undefined
  date: Date | string | undefined
  id: number | string | undefined
}
