import './styles.css'
import 'animate.css'
import { Invoice } from '../Invoice'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Store/store'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import DeleteIcon from '@mui/icons-material/Delete'
import master from '../../../Resources/master.png'
import CountUp from 'react-countup'
import SwipeDownIcon from '@mui/icons-material/SwipeDown'
import { clearShoppingCar } from '../../../Store/Slices/shoppingCarSlice'
import { Toaster, toast } from 'sonner'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export const SalesCheck = ({
  isCarPage = false,
  isSelectedBill = false,
}: {
  isCarPage?: boolean
  isSelectedBill?: boolean
}) => {
  const dispatch = useDispatch()
  const { wannaProduct } = useSelector((state: RootState) => state.shoppingCar)
  const { billSelected } = useSelector((state: RootState) => state.bills)
  const formRef = useRef<any>(null)

  const day = new Date()
  const formattedDate = format(day, 'MMMM d, yyyy HH:mm', { locale: es })

  let totalPay = wannaProduct.reduce(
    (acumulador: number, objeto) => acumulador + objeto.price,
    0
  )
  if (isSelectedBill && billSelected.totalPay !== undefined) {
    totalPay = billSelected.totalPay
  }

  return (
    <>
      <div style={{ height: 'fit-content' }} className="cards">
        <Invoice
          formRef={formRef}
          totalPay={totalPay}
          isCarPage={isCarPage}
          isSelectedBill={isSelectedBill}
        />
        <div className="TableContainerBox">
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Descuento</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isSelectedBill
                  ? billSelected.table.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {item.product}
                        </TableCell>
                        <TableCell>
                          %{' '}
                          <CountUp
                            start={0}
                            end={item.off}
                            decimals={2}
                            decimal="."
                          />
                        </TableCell>
                        <TableCell>
                          ${' '}
                          <CountUp
                            start={0}
                            end={item.total}
                            decimals={2}
                            decimal="."
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  : wannaProduct.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {item.title}
                        </TableCell>
                        <TableCell>
                          %{' '}
                          <CountUp
                            start={0}
                            end={item.discountPercentage}
                            decimals={2}
                            decimal="."
                          />
                        </TableCell>
                        <TableCell>
                          ${' '}
                          <CountUp
                            start={0}
                            end={item.price}
                            decimals={2}
                            decimal="."
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">Total a pagar:</TableCell>
                  <TableCell>
                    ${' '}
                    <CountUp
                      start={0}
                      end={totalPay}
                      decimals={2}
                      decimal="."
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {isCarPage && (
          <>
            <div>
              <h3 className="titlePay">
                Pagar aquí <SwipeDownIcon />
              </h3>
            </div>
            <br />
            <div className="flip-container animate__animated animate__flipInX">
              <div className="flipper">
                <div
                  style={{ width: '400px', height: '220px' }}
                  className="front"
                >
                  <div className="fundCard">
                    <div
                      style={{
                        display: 'inlie-block',
                        padding: '6rem 20px 0px 2rem',
                        color: 'whitesmoke',
                        fontSize: '2rem',
                      }}
                    >
                      <CountUp start={0} end={893315386079} separator="  " />
                    </div>
                    <br />
                    <div className="gridCardSurplus">
                      <div>
                        <p style={{ color: 'whitesmoke', margin: '0px' }}>
                          Nombre
                        </p>
                        <h4 style={{ color: 'whitesmoke', margin: '0px' }}>
                          Gabriel Esteban Agudelo Alvarez
                        </h4>
                      </div>
                      <div>
                        <img
                          style={{ width: '100%' }}
                          alt="master card"
                          src={master}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="back">
                  <button
                    disabled={wannaProduct.length < 1}
                    type="button"
                    className={
                      wannaProduct.length < 1
                        ? 'generalButton buttonSecondaryCalculator center'
                        : 'generalButton buttonPrimary center hvr-float-shadow'
                    }
                    onClick={() => {
                      if (formRef.current) {
                        formRef?.current?.submitForm()
                        toast('Gracias por la compra!', {
                          description: formattedDate,
                        })
                        setTimeout(
                          () => toast('Tu factura fue registrada'),
                          1000
                        )
                        setTimeout(
                          () =>
                            toast('El carrito de compras fue vaciado', {
                              description: formattedDate,
                            }),
                          3000
                        )
                      }
                    }}
                  >
                    Pago automatico
                  </button>
                </div>
              </div>
            </div>
            <br />
          </>
        )}
        <br />
        <div className="footerBill">
          <div>
            <h2>Thank you!</h2>
            <br />
            <p>
              If you encounter any issues related to the invoice you can contact
              us at email:
            </p>
            <br />
            <em>gabriel.agudelo@utp.edu.co</em>
          </div>
          <button
            disabled={wannaProduct.length < 1}
            style={
              isCarPage
                ? { width: '80px', height: '50px' }
                : { display: 'none' }
            }
            className={
              wannaProduct.length < 1 && isCarPage
                ? 'generalButton buttonSecondaryCalculator center'
                : isCarPage
                ? 'generalButton buttonWarning center hvr-buzz'
                : ''
            }
            onClick={() => {
              dispatch(clearShoppingCar())
              toast('El carrito de compras fue vaciado', {
                description: formattedDate,
              })
            }}
          >
            <DeleteIcon />
          </button>
        </div>
        <br />
      </div>
      <Toaster />
    </>
  )
}
