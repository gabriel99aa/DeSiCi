import { useGetProductsQuery } from '../../../Services/api/Products'
import { Product } from '../../Components/Product'
import { ProductInterface } from '../../Interfaces'
import './styles.css'

export const Offers = () => {
  const { data, error, isLoading } = useGetProductsQuery()
  
  return (
    <>
      <div className="gridProducts">
        {data?.products?.map((item: ProductInterface, index: number) => (
          <Product
            key={index}
            load={isLoading}
            isCarPage={false}
            product={item}
          />
        ))}
      </div>
    </>
  )
}
