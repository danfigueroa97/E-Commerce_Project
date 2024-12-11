import React, { useState } from 'react';
import Cart from './Cart';
import axios from 'axios';
import styles from '../styles/User.module.css';

const User = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [currentView, setCurrentView] = useState("welcome");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const welcomeImage = '/fondo.png';

  const fetchProductsByCategory = (category) => {
    axios.get(`http://localhost:8080/product/list/${category}`)
      .then((response) => {
        setProducts(response.data);
        setCategory(category);
        setCurrentView("category");
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    alert("Producto añadido al carrito");
  };

  const removeFromCart = (productIndex) => {
    setCartItems((prevItems) => prevItems.filter((_, index) => index !== productIndex));
  };

  const viewProductDetails = (product) => setSelectedProduct(product);
  const closeProductDetails = () => setSelectedProduct(null);
  const goToCart = () => setCurrentView("cart");

  return (
    <div className={styles.userPage}>
      <header className={styles.header}>
        <h1 className={styles.siteName}>InnovaTech</h1>
        <nav className={styles.navBar}>
          <button className={styles.navButton} onClick={() => fetchProductsByCategory("Computador")}>Computers</button>
          <button className={styles.navButton} onClick={() => fetchProductsByCategory("Celular")}>Cellphones</button>
          <button className={styles.navButton} onClick={() => fetchProductsByCategory("Accesorio")}>Accessories</button>
        </nav>
        <button className={styles.cartButton} onClick={goToCart}>
          Cart <span className={styles.cartIcon}>🛒</span>
        </button>
      </header>

      <main className={styles.mainContent}>
        {currentView === "welcome" && (
          <div className={styles.welcomeContainer}>
            <img src={welcomeImage} alt="Bienvenido" className={styles.welcomeImage} />
          </div>
        )}

        {currentView === "category" && (
          <>
            <h2>{`Productos de ${category}`}</h2>
            <div className={styles.productList}>
              {products.map((product) => (
                <div key={product.id} className={styles.productItem}>
                  <img src={product.image} alt={product.name} width={100} />
                  <h3>{product.name}</h3>
                  <p>Precio: ${product.price}</p>
                  <button
                    className={styles.addToCartButton} // Conserva tu clase existente
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {currentView === "cart" && (
          <Cart
            items={cartItems}
            onRemoveItem={removeFromCart}
            onClose={() => setCurrentView("welcome")}
          />
        )}
      </main>
    </div>
  );
};

export default User;
