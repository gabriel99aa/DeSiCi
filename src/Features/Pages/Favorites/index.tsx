import { useSelector } from 'react-redux'
import { Product } from '../../Components/Product'
import { RootState } from '../../../Store/store'
import './styles.css'

export const Favorites = () => {
  const { favorites } = useSelector((state: RootState) => state.favorites)

  return (
    <>
      <div className="gridProducts">
        {favorites.map((item: any, index: number) => (
          <Product key={index} load={true} isCarPage={false} product={item} />
        ))}
      </div>
    </>
  )
}
