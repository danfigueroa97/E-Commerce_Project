import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Cart.css';

const Cart = ({ showCart, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Cargar el carrito cada vez que se abre
  useEffect(() => {
    if (showCart) {
      const fetchCartItems = () => {
        axios.get("http://localhost:8080/cart/items")
          .then((response) => {
            setCartItems(response.data);
            calculateTotal(response.data);
          })
          .catch((error) => console.error("Error fetching cart items:", error));
      };
  
      fetchCartItems();
    }
  }, [showCart]);
  

  const fetchCartItems = () => {
    axios.get("http://localhost:8080/cart/items")
      .then((response) => {
        setCartItems(response.data);
        calculateTotal(response.data);
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  };

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalAmount);
  };

  const removeFromCart = (productId) => {
    axios.delete(`http://localhost:8080/cart/remove/${productId}`)
      .then(() => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        calculateTotal(updatedCart);
      })
      .catch((error) => console.error("Error removing from cart:", error));
  };

  return (
    <div className={`cart-container ${showCart ? 'visible' : 'hidden'}`}>
      <button className="close-cart" onClick={onClose}>Cerrar</button>
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
