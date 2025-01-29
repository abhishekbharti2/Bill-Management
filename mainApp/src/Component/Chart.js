import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, remove, update, changemonth } from "../Features/updateState.js";

export default function Bills() {
  const bills = useSelector((state) => state.updater.data);
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState(bills);
  const [edit, setEdit] = useState(false);
  const [editBill, setEditBill] = useState(null);
  const [newBill, setNewBill] = useState({
    description: "",
    category: "",
    date: "",
    amount: "",
  });

  let cate = bills.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.category === item.category)
  );

  useEffect(() => {
    setFilteredData(bills);
  }, [bills]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newBill.description && newBill.amount) {
      dispatch(add({ id: Date.now(), ...newBill }));
      setNewBill({ description: "", category: "", date: "", amount: "" });
    }
  };

  function handleRemove(id) {
    dispatch(remove(id));
  }

  function handleEdit(bill) {
    setEditBill(bill);
    setEdit(true);
    setNewBill(bill);
  }

  function handleUpdate(event) {
    event.preventDefault();
    if (editBill) {
      dispatch(update(newBill));
      setEdit(false);
      setNewBill({ description: "", category: "", date: "", amount: "" });
    }
  }

  function filterMonth(mo) {
    dispatch(changemonth(mo))
    const filtered = bills.filter((item) =>
      item.date.slice(0, 7).includes(mo)
    );
    setFilteredData(filtered);
  }

  function filterCategory(values) {
    let month = document.getElementById('selMonth').value
    let filt = bills.filter((item)=> item.date.slice(0, 7).includes(month))
    const filtered = filt.filter((item) => item.category.includes(values));
    setFilteredData(values === "all" ? bills : filtered);
  }

  return (
    <div className="chart-container">
      <div className="title">
        <strong>
          Monthly Billing 
          <input id='selMonth' onChange={(r) => filterMonth(r.target.value)} type="month" />
        </strong>
        <span>
          <select
            name="category"
            className="filter-category"
            onChange={(op) => filterCategory(op.target.value)}
          >
            <option value="all">All Categories</option>
            {cate.map((datas) => (
              <option key={datas.id} value={datas.category}>
                {datas.category}
              </option>
            ))}
          </select>
          <i onClick={() => setEdit(true)} className="add-btn">
            +
          </i>
        </span>
      </div>

      {edit && (
        <div className="form-container">
          <div className="addform">
            <span className="form-close" onClick={() => setEdit(false)}>
              &#10005;
            </span>
            <p>{editBill ? "Edit" : "Add"} BILL</p>
            <form onSubmit={editBill ? handleUpdate : handleAdd}>
              <input
                type="text"
                placeholder="Enter Description"
                value={newBill.description}
                onChange={(e) => setNewBill({ ...newBill, description: e.target.value })}
              />
              <select
                name="category"
                id="categories"
                value={newBill.category}
                onChange={(e) => setNewBill({ ...newBill, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="FoodNDining">Food & Dining</option>
                <option value="Utility">Utility</option>
                <option value="Shopping">Shopping</option>
                <option value="Education">Education</option>
                <option value="PersonalCare">Personal Care</option>
              </select>
              <input
                type="number"
                placeholder="Enter Amount"
                value={newBill.amount}
                onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
              />
              <input
                type="date"
                value={newBill.date}
                onChange={(e) => setNewBill({ ...newBill, date: e.target.value })}
              />
              <button type="submit" className="submit-btn">
                {editBill ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bill-container">
        <div className="data-all">
          {filteredData.map((datas) => (
            <div key={datas.id} className="data">
              <div className="dataDes">
                {datas.description}
                <span>{datas.date}</span>
              </div>
              <strong>Rs. {datas.amount}</strong>
              <div className="update-btn">
                <button className="removeBtn" onClick={() => handleRemove(datas.id)}>
                  &#10007;
                </button>
                <button className="editBtn" onClick={() => handleEdit(datas)}>
                  &#9998;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
