import React from 'react';
import { useState } from 'react/cjs/react.development';

const OrderForm = ({ handleNewOrder }) => {
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [error, setError] = useState('')

  const handleNameChange = (event) => {
    event.preventDefault()
    setName(event.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (!name) {
      setError('Please Enter a Name!')
      return
    }
    if (!ingredients.length) {
      setError('Please select at least one ingredient!')
      return
    }
      handleNewOrder({
        name,
        ingredients
      })
      clearInputs();
      setError('')
  }

  const clearInputs = () => {
    setName('');
    setIngredients([])
  }

  const handleIngredientChange = (event) => {
    event.preventDefault()
    if (!ingredients.includes(event.target.value))
    setIngredients([...ingredients, event.target.value])
  }

  const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
  const ingredientButtons = possibleIngredients.map(ingredient => {
    return (
      <button className='order-form-button' key={ingredient} value={ingredient} onClick={event => handleIngredientChange(event)}>
        {ingredient}
      </button>
    )
  });

  return (
    <form>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={event => handleNameChange(event)}
      />

      {ingredientButtons}

      {error && <p className='order-form-error'>{error}</p>}
      <p className='order-form-selected-ingredients'>Order: {ingredients.join(', ') || 'Nothing selected'}</p>

      <button className='order-form-submit-btn' onClick={event => handleSubmit(event)}>
        Submit Order
      </button>
    </form>
  )
}

export default OrderForm;
