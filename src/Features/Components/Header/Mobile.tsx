import { useState } from 'react'
import { PaperProps } from '../../Helpers/PaperProps'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import MenuIcon from '@mui/icons-material/Menu'

export const Mobile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <div className="Mobile">
        <Box
          sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <MenuIcon sx={{ width: 32, height: 32, color: 'withe' }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={PaperProps}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Link to={'DeSiCi/Offers'} style={{ color: 'black' }}>
            <MenuItem onClick={handleClose}>Ofertas</MenuItem>
          </Link>
          <Link to={'DeSiCi/Bills'} style={{ color: 'black' }}>
            <MenuItem onClick={handleClose}>Facturas</MenuItem>
          </Link>
          <Link to={'DeSiCi/Favorites'} style={{ color: 'black' }}>
            <MenuItem onClick={handleClose}>Favoritos</MenuItem>
          </Link>
          <Link to={'DeSiCi/ShoppingCart'} style={{ color: 'black' }}>
            <MenuItem onClick={handleClose}>Carrito de compras</MenuItem>
          </Link>
        </Menu>
      </div>
    </>
  )
}
