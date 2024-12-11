import React, { useState } from 'react';
import Cart from './Cart';
import axios from 'axios';
import styles from '../styles/User.module.css';

const User = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [currentView, setCurrentView] = useState("welcome"); // 'welcome', 'category', 'cart'
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado
  const [cartItems, setCartItems] = useState([]); // Estado para los productos en el carrito
  const welcomeImage = '/fondo.png';

  const fetchProductsByCategory = (category) => {
    axios.get(`http://localhost:8080/product/list/${category}`)
      .then((response) => {
        setProducts(response.data);
        setCategory(category);
        setCurrentView("category"); // Cambiar la vista actual a categoria
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

  const viewProductDetails = (product) => {
    setSelectedProduct(product); // Establecer el producto seleccionado
  };

  const closeProductDetails = () => {
    setSelectedProduct(null); // Limpiar el producto seleccionado
  };

  const goToCart = () => {
    setCurrentView("cart"); // Cambiar la vista actual al carrito
  };

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
                <div 
                  key={product.id} 
                  className={styles.productItem} 
                  onClick={() => viewProductDetails(product)} // Mostrar detalles del producto
                >
                  <img src={product.image} alt={product.name} width={100} />
                  <h3>{product.name}</h3>
                  <p>Precio: ${product.price}</p>
                  <button
                    className={styles.addToCartButton} // Conserva tu clase existente
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }} // Evitar el click en detalles
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {selectedProduct && (
              <div className={styles.productDetails}>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className={styles.productDetailImage} 
                />
                <div className={styles.productDetailsContent}>
                  <h2>{selectedProduct.name}</h2>
                  <p>Precio: ${selectedProduct.price}</p>
                  <p>Descripción: {selectedProduct.description}</p>
                  <button className={styles.closeButton} onClick={closeProductDetails}>Cerrar</button>
                </div>
              </div>
            )}
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
