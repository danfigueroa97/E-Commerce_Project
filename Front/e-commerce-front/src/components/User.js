import React, { useState } from 'react';
import Cart from './Cart';
import axios from 'axios';
import styles from '../styles/User.module.css'; // Importa las clases como un objeto

const User = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado
  const welcomeImage = '/fondo.png';
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

  const viewProductDetails = (product) => {
    setSelectedProduct(product); // Establecer el producto seleccionado
  };

  const closeProductDetails = () => {
    setSelectedProduct(null); // Limpiar el producto seleccionado
  };

  return (
    <div className={styles.userPage}>
      <header className={styles.header}>
        <h1 className={styles.siteName}>InnovaTech</h1>
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
          Carrito
          <span className={styles.cartIcon}>🛒</span>
        </button>
      </header>

      <main className={styles.mainContent}>
        {category ? (
          <h2>{`Productos de ${category}`}</h2>
        ) : (
          <div className={styles.welcomeContainer}>
            <img src={welcomeImage} alt="Bienvenido a InnovaTech" className={styles.welcomeImage} />
          </div>
        )}
        <p></p>

        <div className={styles.productList}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className={styles.productItem} onClick={() => viewProductDetails(product)}>
                <img src={product.image} alt={product.name} width={100} />
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price}</p>
                <button className={styles.addToCartButton} onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}>
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>

        {selectedProduct && (
          <div className={styles.productDetails}>
            <img src={selectedProduct.image} alt={selectedProduct.name} className={styles.productDetailImage} />
            <div className={styles.productDetailsContent}>
              <h2>{selectedProduct.name}</h2>
              <p>Price: ${selectedProduct.price}</p>
              <p>Description: {selectedProduct.description}</p>
              <button className={styles.closeButton} onClick={closeProductDetails}>
                Cerrar
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default User;