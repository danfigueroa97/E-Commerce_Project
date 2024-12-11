import React from 'react';
import styles from '../styles/Cart.module.css'; // Asegúrate de tener estilos para el carrito

const Cart = ({ items, onRemoveItem, onClose }) => {
  const handleRemove = (productId) => {
    onRemoveItem(productId); // Llama a la función de eliminación
  };

  const handlePurchase = () => {
    alert("¡Gracias por tu compra!"); // Aquí puedes integrar más lógica de compra
  };

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Carrito de Compras</h2>
      {items.length === 0 ? (
        <p className={styles.emptyCart}>Tu carrito está vacío.</p>
      ) : (
        <ul className={styles.cartList}>
          {items.map((item, index) => (
            <li key={index} className={styles.cartItem}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.cartItemImage}
                width={50}
              />
              <div className={styles.cartItemDetails}>
                <h3 className={styles.cartItemName}>{item.name}</h3>
                <p className={styles.cartItemPrice}>Precio: ${item.price}</p>
              </div>
              <button
                className={styles.removeButton}
                onClick={() => handleRemove(index)} // Elimina el producto
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      {items.length > 0 && (
        <div className={styles.cartActions}>
          <button
            className={styles.purchaseButton}
            onClick={handlePurchase}
          >
            Comprar
          </button>
        </div>
      )}
      <button className={styles.closeButton} onClick={onClose}>
        Cerrar Carrito
      </button>
    </div>
  );
};

export default Cart;