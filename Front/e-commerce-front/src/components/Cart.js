import React from 'react';
import styles from '../styles/Cart.module.css'; // Asegúrate de tener estilos para el carrito

const Cart = ({ items, onClose }) => {
  return (
    <div className={styles.cartOverlay}>
      <div className={styles.cartContainer}>
        <h2>Carrito de Compras</h2>
        <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
        {items.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li key={index} className={styles.cartItem}>
                <img src={item.image} alt={item.name} width={50} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Precio: ${item.price}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;