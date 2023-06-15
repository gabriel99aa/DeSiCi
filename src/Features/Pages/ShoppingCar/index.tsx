import { useSelector } from 'react-redux'
import { Product } from '../../Components/Product'
import { SalesCheck } from '../../Components/SalesCheck'
import './styles.css'
import { RootState } from '../../../Store/store'

export const ShoppingCart = () => {
  const { wannaProduct } = useSelector((state: RootState) => state.shoppingCar)
  
  return (
    <>
      <div style={{ paddingBottom: '5rem' }} className="gridCar">
        <div style={{ width: '100%' }}>
          <SalesCheck isCarPage={true} />
        </div>
        <div className="rageDiv">
          {wannaProduct.map((item: any, index: number) => (
            <div key={index} style={{ height: 'fit-content' }}>
              <Product load={true} isCarPage={true} product={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
