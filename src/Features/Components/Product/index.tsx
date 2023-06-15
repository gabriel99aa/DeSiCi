import './styles.css'
import { useEffect, useState } from 'react'
import { MediaProps } from '../../Interfaces'
import { ExpandMore } from '../../Helpers/ExpandMore'
import { blue } from '@mui/material/colors'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Skeleton from '@mui/material/Skeleton'
import DeleteIcon from '@mui/icons-material/Delete'
import Rating from '@mui/material/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite } from '../../../Store/Slices/favoritesSlice'
import { RootState } from '../../../Store/store'
import {
  dontWannaProduct,
  wannaProduct,
} from '../../../Store/Slices/shoppingCarSlice'
import CountUp from 'react-countup'

export const Product = ({ load, isCarPage, product }: MediaProps) => {
  const dispatch = useDispatch()
  const { favorites } = useSelector((state: RootState) => state.favorites)
  const [expanded, setExpanded] = useState(false)
  const [like, setLike] = useState(
    favorites.some((item) => product.id === item.id)
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //? este useEffect y setTimeout es
    //? solo para poder dejar ver la pantalla de carga
    if (load === false) {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    } else {
      setLoading(false)
    }
  }, [])

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <Card
        key={product?.id}
        className="cardsProducts"
        sx={{ boxShadow: 'none', m: 2, height: '100%', width: '100%' }}
      >
        <CardHeader
          avatar={
            loading ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            ) : (
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                G
              </Avatar>
            )
          }
          action={
            loading ? null : (
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={
            loading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              product?.brand
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              product?.category
            )
          }
        />
        {loading ? (
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <CardMedia
            component="img"
            height="190px"
            image={product?.thumbnail}
            alt="Paella dish"
          />
        )}
        <div className="gridCardP">
          <CardContent style={{ height: 'fit-content' }}>
            {loading ? (
              <>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="80%" />
              </>
            ) : (
              <>
                <div className="grupTypography">
                  <Typography variant="body2">{product?.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product?.description}
                  </Typography>
                  <br />
                  <div>
                    <Typography variant="body2" color="text.secondary">
                      Descuento:{' '}
                      <CountUp
                        start={0}
                        end={product?.discountPercentage}
                        decimals={2}
                        decimal="."
                      />{' '}
                      %
                    </Typography>
                    <br />
                    <Typography variant="body2" color="text.secondary">
                      Precio: ${' '}
                      <CountUp
                        start={0}
                        end={product?.price}
                        decimals={2}
                        decimal="."
                      />
                    </Typography>
                    <br />
                    <Typography variant="body2" color="text.secondary">
                      Stock: <CountUp start={0} end={product?.stock} />
                    </Typography>
                    <br />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="legend"
                    >
                      Rating
                    </Typography>
                    <Rating name="read-only" value={product?.rating} readOnly />
                  </div>
                </div>
              </>
            )}
          </CardContent>
          <CardContent className="CardActions">
            <CardActions disableSpacing style={{ gap: '15px' }}>
              {isCarPage ? (
                <>
                  <button
                    style={{ width: '60px', height: '35px' }}
                    className="BtnCard buttonWarning center hvr-buzz"
                    onClick={() => {
                      dispatch(dontWannaProduct(product))
                    }}
                  >
                    <DeleteIcon />
                  </button>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => {
                      setLike(!like)
                      dispatch(addFavorite(product))
                    }}
                  >
                    <FavoriteIcon style={like ? { color: 'red' } : {}} />
                  </IconButton>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    style={{
                      width: 'auto',
                      height: '35px',
                    }}
                    className="BtnCard buttonPrimary center hvr-float-shadow"
                    onClick={() => {
                      dispatch(wannaProduct(product))
                    }}
                  >
                    <p
                      style={{
                        fontSize: '16px',
                      }}
                    >
                      Comprar
                    </p>
                  </button>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => {
                      setLike(!like)
                      dispatch(addFavorite(product))
                    }}
                  >
                    <FavoriteIcon style={like ? { color: 'red' } : {}} />
                  </IconButton>
                </>
              )}
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              {product?.images.map((img: string, index: number) => (
                <div key={index}>
                  <CardMedia
                    component="img"
                    height="190"
                    image={img}
                    alt="Paella dish"
                  />
                  <br />
                </div>
              ))}
            </Collapse>
          </CardContent>
        </div>
      </Card>
    </>
  )
}
