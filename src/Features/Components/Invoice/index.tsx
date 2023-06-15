import './styles.css'
import Brand from '../../../Resources/DeSiCi.jpeg'
import { Form, Formik } from 'formik'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { Bill } from '../../Interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Store/store'
import { addBill } from '../../../Store/Slices/billsSlice'
import { v4 as idv4 } from 'uuid'
import { dataBill } from '../../../Store/Interfaces'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import NumbersIcon from '@mui/icons-material/Numbers'
import PlaceIcon from '@mui/icons-material/Place'
import { clearShoppingCar } from '../../../Store/Slices/shoppingCarSlice'

export const Invoice = ({
  formRef,
  totalPay,
  bill,
  isCarPage = false,
  isSelectedBill = false,
}: {
  formRef?: any
  totalPay?: number
  bill?: dataBill
  isCarPage?: boolean
  isSelectedBill?: boolean
}) => {
  const dispatch = useDispatch()
  const { wannaProduct } = useSelector((state: RootState) => state.shoppingCar)
  const { billSelected } = useSelector((state: RootState) => state.bills)
  const id = idv4().substring(0, 15)
  const currentDate = new Date()
  const formattedDate = currentDate.toISOString()

  let initialValues: Bill = {
    direction: '',
    customer: '',
    date: formattedDate,
    id: id,
  }

  if (isSelectedBill) {
    initialValues = {
      direction: billSelected?.direction,
      customer: billSelected?.customer,
      date: billSelected?.date,
      id: billSelected?.id,
    }
  } else if (!isCarPage && !isSelectedBill) {
    initialValues = {
      direction: bill?.direction,
      customer: bill?.customer,
      date: bill?.date,
      id: bill?.id,
    }
  }

  const Submit = ({ direction, customer, date, id }: Bill) => {
    const table = wannaProduct.map((item) => ({
      product: item.title,
      off: item.discountPercentage,
      total: item.price,
    }))
    dispatch(
      addBill({
        direction: direction,
        customer: customer,
        date: date,
        id: id,
        totalPay: totalPay,
        table: table,
      })
    )
    setTimeout(() => dispatch(clearShoppingCar()), 2000)
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        innerRef={formRef}
        // validationSchema={}
        onSubmit={(formData, { resetForm }) => {
          if (!isSelectedBill) {
            Submit(formData)
            resetForm()
          }
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <div
              style={isSelectedBill ? { display: 'none' } : {}}
              className="gridInvoice"
            >
              <div className="subGridInvoice2">
                <div>
                  <img
                    className="brandMenu BrandBill"
                    alt="brand"
                    src={Brand}
                  />
                </div>
                <FormControl>
                  <InputLabel htmlFor="Dirección">Dirección</InputLabel>
                  <OutlinedInput
                    style={{ width: '100%' }}
                    id="Dirección"
                    disabled={!isCarPage}
                    label="Dirección"
                    placeholder={
                      isSelectedBill ? '' : 'Colombia, Caldas, Manizales'
                    }
                    name="direction"
                    onChange={handleChange}
                    value={values.direction}
                    onBlur={handleBlur}
                    startAdornment={
                      <InputAdornment position="start">
                        <PlaceIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className="subGridInvoice">
                <FormControl>
                  <InputLabel htmlFor="customer">Factutado a</InputLabel>
                  <OutlinedInput
                    style={{ width: '100%' }}
                    id="customer"
                    disabled={!isCarPage}
                    label="Factutado a"
                    placeholder={
                      isSelectedBill ? '' : 'Gabriel Esteban Agudelo Alvarez'
                    }
                    name="customer"
                    onChange={handleChange}
                    value={values.customer}
                    onBlur={handleBlur}
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountBoxIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label="Fecha"
                    disabled={!isCarPage}
                    onChange={(event) => {
                      setFieldValue('date', event?.toString())
                    }}
                    value={new Date(values.date!)}
                  />
                </LocalizationProvider>
                <FormControl>
                  <InputLabel htmlFor="Factura">Factura</InputLabel>
                  <OutlinedInput
                    style={{ width: '100%' }}
                    disabled={true}
                    id="Factura"
                    label="Factura"
                    name="id"
                    onChange={handleChange}
                    value={values.id}
                    onBlur={handleBlur}
                    startAdornment={
                      <InputAdornment position="start">
                        <NumbersIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
