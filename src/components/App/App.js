import React from 'react';
import './App.css';
import { completeOrder, getOrders, sendOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';
import { useState, useEffect } from 'react/cjs/react.development';



const App = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    getOrders()
      .then(data => setOrders(data.orders))
      .catch(err => console.error('Error fetching:', err));
  }, [])

  const handleNewOrder = (newOrder) => {
    sendOrder(newOrder)
      .then(data => {
        setOrders([...orders, data])
      })
  }

  const handleCompleteOrder = (id) => {
    completeOrder(id)
    setOrders(orders.filter(order => order.id !== id))
  }

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm handleNewOrder={handleNewOrder}/>
      </header>
      <Orders orders={orders} handleCompleteOrder={handleCompleteOrder}/>
    </main>
  );
}


export default App;
