import React, { useState } from 'react';
import Cart from './Cart';
import axios from 'axios';
import styles from '../styles/User.module.css'; // Importa las clases como un objeto

const User = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [showCart, setShowCart] = useState(false);

  const fetchProductsByCategory = (category) => {
    axios.get(`http://localhost:8080/product/list/${category}`)
      .then((response) => {
        setProducts(response.data);
        setCategory(category);
      })
      .catch((error) => console.error("Error fetching products by category:", error));
  };

  const addToCart = (productId) => {
    axios.post(`http://localhost:8080/cart/add/${productId}`)
      .then(() => {
        alert("Producto añadido al carrito");
        setShowCart(true);
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };

  const closeCart = () => {
    setShowCart(false);
  };

  return (
    <div className={styles.userPage}> {/* Usa las clases de CSS como estilos del objeto styles */}
      <header className={styles.header}>
        <h1 className={styles.siteName}>Mi E-Commerce</h1>
        <nav className={styles.navBar}>
          <button className={styles.navButton} onClick={() => fetchProductsByCategory("Computador")}>
            Computadores
          </button>
          <button className={styles.navButton} onClick={() => fetchProductsByCategory("Celular")}>
            Celulares
          </button>
          <button className={styles.navButton} onClick={() => fetchProductsByCategory("Accesorio")}>
            Accesorios
          </button>
        </nav>
        <button className={styles.cartButton} onClick={() => setShowCart(true)}>
          View Cart
          {showCart && <Cart onUpdateCart={(length) => console.log('Cart updated with length:', length)} closeCart={closeCart} />}
          Carrito
          <span className={styles.cartIcon}>🛒</span>
        </button>
      </header>

      <main className={styles.mainContent}>
        <h2>{category ? `Productos de ${category}` : "¡Bienvenido a nuestra tienda!"}</h2>
        <p>Selecciona una categoría para explorar nuestros productos.</p>

        <div className={styles.productList}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className={styles.productItem}>
                <img src={product.image} alt={product.name} width={100} />
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price}</p>
                <button className={styles.addToCartButton} onClick={() => addToCart(product.id)}>
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No hay productos en esta categoría.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default User;
