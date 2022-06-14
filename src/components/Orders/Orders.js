import React from 'react';
import './Orders.css';

const Orders = ({ orders , handleCompleteOrder}) => {
  const orderEls = orders.map(order => {
    return (
      <div className="order" key={order.id}>
        <h3 className="order-header">{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={ingredient}>{ingredient}</li>
          })}
        </ul>
        <button className='order-complete-btn' onClick={() => handleCompleteOrder(order.id)}>Complete</button>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;