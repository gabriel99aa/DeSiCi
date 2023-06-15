import './styles.css'
import 'animate.css'
import Brand from '../../../Resources/DeSiCi.jpeg'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import { Link } from 'react-router-dom'
import { Mobile } from './Mobile'

export const Header = () => {
  return (
    <>
      <div className="fund animate__animated animate__fadeInDown">
        <div className="barMenu background-Glass">
          <div>
            <img className="brandMenu" alt="brand" src={Brand} />
          </div>
          <div>
            <b className="BH1">E-COMMERCE</b>
          </div>
          <div className="gridMenu">
            <Link
              to={'DeSiCi/Offers'}
              type="button"
              className="generalButton buttonPrimary center hvr-float-shadow"
            >
              <b>Ofertas</b>
            </Link>
            <Badge badgeContent={5} color="primary">
              <Link
                to={'DeSiCi/Bills'}
                type="button"
                className="generalButton buttonPrimary center hvr-float-shadow"
              >
                <b>Facturas</b>
              </Link>
            </Badge>
            <Tooltip title="Favoritos">
              <Badge badgeContent={1} color="primary">
                <Link
                  to={'DeSiCi/Favorites'}
                  type="button"
                  className="generalButton buttonPrimary center hvr-float-shadow"
                >
                  <FavoriteIcon />
                </Link>
              </Badge>
            </Tooltip>
            <Tooltip title="Carrito">
              <Badge badgeContent={4} color="primary">
                <Link
                  to={'DeSiCi/ShoppingCart'}
                  type="button"
                  className="generalButton buttonPrimary center hvr-float-shadow"
                >
                  <ShoppingCartIcon />
                </Link>
              </Badge>
            </Tooltip>
          </div>
          <Mobile />
        </div>
      </div>
    </>
  )
}
