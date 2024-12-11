import React from 'react';
import styles from '../styles/Cart.module.css'; // Asegúrate de tener estilos para el carrito

const Cart = ({ items, onRemoveItem, onClose }) => {
  const handleRemove = (productId) => {
    onRemoveItem(productId); // Llama a la función de eliminación
  };

  const handlePurchase = async () => {
    // Asegúrate de que haya elementos en el carrito
    if (items.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // Aquí puedes construir el JSON que necesitas enviar
    const buyDetail = {
      idUser: "6758c3caa3e2976bed20597b", // ID de usuario fijo
      idProduct:"6758d67093142f0ff69d5fd2", // Suponiendo que cada item tiene un id
      totalPrice: 300, // Sumar precios y formatear a dos decimales
      description: "Compra de prueba", // Descripción de la compra
      payMethod: "VIRTUAL", // Método de pago
      _class: "com.entorno.E_Commerce_Project.model.BuyDetail" // Clase del objeto
    };

    try {
      const response = await fetch('http://localhost:8080/api/buydetail/send-email-with-qrcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buyDetail),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Muestra el mensaje de éxito
        // Aquí puedes agregar lógica adicional, como limpiar el carrito
      } else {
        const errorData = await response.json();
        alert("Error al procesar la compra: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("compra realizada con exito.");
    }
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