import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [bills, setBills] = useState([]);
  const [Items, setItems] = useState([]);
  const [Customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch Bills, Items, and Customers from Backend
    axios.get('http://localhost:5000/api/bills')
      .then(res => setBills(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:5000/api/items')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:5000/api/customers')
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Billing System</h1>

      <h2>Bills Down</h2>
      <ul>
        {bills.map(bill => (
          <li key={bill._id}>
            {bill.customer.name} - {bill.totalAmount}
          </li>
        ))}
      </ul>

      {/* Similarly, display customers and items */}
    </div>
  );
};

export default App;
