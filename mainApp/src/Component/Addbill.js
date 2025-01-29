import { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';

export default function Bills() {
  const bills = useSelector((state) => state.updater.data);
  const month = useSelector((state) => state.updater.month);
  const [filt, setFil] = useState(bills);
  const [ttotal, setTotal] = useState(0);
  
 useEffect(()=>{
  setFil(bills)
  if(month!=='All'){
    const f = bills.filter((item) => item.date.slice(0, 7).includes(month))
    setFil(f)
  }
  setTotal(filt.reduce((total, bill) => total + parseInt(bill.amount), 0))
 })
  
  return (
    <div className="add-container">
      <h3 style={{textAlign:'center'}}>{month} Months Spends</h3>
      <div className="all-items">
        {filt.map((item) => (
          <div key={item.id} className="total-listing">
            <span>{item.description}</span>
            <span>Rs. {item.amount}</span>
          </div>
        ))}
      </div>
      <h3 className='totalam'><span>Total</span>Rs. {ttotal}</h3>
    </div>
  );
}
