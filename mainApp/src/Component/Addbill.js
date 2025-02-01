import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Bills() {
  const bills = useSelector((state) => state.updater.data);
  const month = useSelector((state) => state.updater.month);
  const [filt, setFil] = useState(bills);
  const [ttotal, setTotal] = useState(0);
  const [budget, setBudget] = useState(null)

  useEffect(() => {
    setFil(bills);
    let filteredBills = bills;
    if (month !== 'All') {
      filteredBills = bills.filter((item) => item.date.slice(0, 7).includes(month));
    }
    setFil(filteredBills);
    setTotal(filteredBills.reduce((total, bill) => total + parseInt(bill.amount), 0));
  }, [bills, month]);

  const sortJson = (data, key, order = "asc",) => {
    return [...data].sort((a, b) => {
      if (parseInt(a[key]) < parseInt(b[key])) return order === "asc" ? -1 : 1;
      if (parseInt(a[key]) > parseInt(b[key])) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  function handleBudget() {
    if (budget) {
      const sortedItems = sortJson(filt, "amount", "asc");

      let sum = 0;
      let newSort = [];

      for (let i = 0; i < sortedItems.length; i++) {
        const itemAmount = parseFloat(sortedItems[i].amount);

        if (sum + itemAmount <= budget) {
          sum += itemAmount;
          newSort.push(sortedItems[i]);
        } else {
          break;
        }
      }
      setTotal(sum)
      setFil(newSort);
    } else {
      alert('Please Enter Budget Amount');
    }
  }

  return (
    <div className="add-container">
      <h3 style={{ textAlign: 'center' }}>{month} Months Payble {budget ? "Under Budget" : "All"} Amounts</h3>
      <div className="all-items">
        {filt.map((item) => (
          <div key={item.id} className="total-listing">
            <span>{item.description}</span>
            <span>Rs. {item.amount}</span>
          </div>
        ))}
      </div>
      <h3 className='totalam'><span>Total</span>Rs. {ttotal}</h3>
      <div className="budget" >
        <form action="submit" onSubmit={(fo) => {
          fo.preventDefault()
          handleBudget()
        }}>
          <input type="number" name="budget" onChange={(b) => setBudget(b.target.value)} id="budget-input" placeholder='Enter Your Budget' />
        </form>
      </div>
    </div>
  );
}
