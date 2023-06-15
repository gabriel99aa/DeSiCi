import './styles.css'
import { Invoice } from '../../Components/Invoice'
import { SalesCheck } from '../../Components/SalesCheck'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Store/store'
import { dataBill } from '../../../Store/Interfaces'
import { billSelected } from '../../../Store/Slices/billsSlice'

export const Bills = () => {
  const dispatch = useDispatch()
  const { bills } = useSelector((state: RootState) => state.bills)
  const selected = useSelector((state: RootState) => state.bills.billSelected)

  return (
    <>
      <div className="gridBill">
        <SalesCheck isSelectedBill={true} />
        <div className="historyInvoice">
          {bills.map((bill: dataBill, index: number) => (
            <div
              key={index}
              className={
                selected.id === bill.id ? 'cards selectedInvoice' : 'cards'
              }
              style={{ cursor: 'pointer', height: 'fit-content' }}
              onClick={() => dispatch(billSelected(bill))}
            >
              <Invoice bill={bill} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
