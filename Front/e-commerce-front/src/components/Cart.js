// Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Cart.css';

const Cart = ({ onUpdateCart, closeCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch cart items for the current user
  useEffect(() => {
    axios.get("http://localhost:8080/cart/items")
      .then((response) => {
        setCartItems(response.data);
        calculateTotal(response.data);
        if (onUpdateCart) onUpdateCart(response.data.length); // Actualizar la cantidad de productos en el carrito
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalAmount);
  };

  const removeFromCart = (productId) => {
    axios.delete(`http://localhost:8080/cart/remove/${productId}`)
      .then(() => {
        setCartItems(cartItems.filter(item => item.id !== productId));
        calculateTotal(cartItems);
        if (onUpdateCart) onUpdateCart(cartItems.length); // Actualizar la cantidad de productos en el carrito
      })
      .catch((error) => console.error("Error removing from cart:", error));
  };

  const addToCart = (productId) => {
    axios.post(`http://localhost:8080/cart/add/${productId}`)
      .then((response) => {
        alert("Producto añadido al carrito");
        setCartItems([...cartItems, response.data]); // Añadir el nuevo producto al estado de los productos en el carrito
        calculateTotal([...cartItems, response.data]); // Calcular el nuevo total
        if (onUpdateCart) onUpdateCart(cartItems.length + 1); // Actualizar la cantidad de productos en el carrito
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };

  return (
    <div className="cart-container">
      <button className="close-cart-button" onClick={closeCart}>Close Cart</button>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <div className="cart-item">
              <img src={item.image} alt={item.name} />
              <span>{item.name}</span>
              <span>Quantity: {item.quantity}</span>
              <span>Price: ${item.price}</span>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <strong>Total:</strong> ${total}
      </div>
    </div>
  );
};

export default Cart;
