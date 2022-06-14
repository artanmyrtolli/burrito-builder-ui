export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => response.json())
}

export const sendOrder = (newOrder) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    body: JSON.stringify({
      "name": newOrder.name,
      "ingredients": newOrder.ingredients
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
}

export const completeOrder = (id) => {
  return fetch(`http://localhost:3001/api/v1/orders/${id}`, {
    method: 'DELETE'
  })
}


