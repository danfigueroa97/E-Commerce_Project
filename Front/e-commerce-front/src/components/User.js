import React, { useState } from 'react';
import Cart from './Cart'; // Ajusta la ruta según tu estructura de archivos
import axios from 'axios';
import '../styles/User.css';

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
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };

  return (
    <div className="user-page">
      <header className="header">
        <h1 className="site-name">Mi E-Commerce</h1>
        <nav className="nav-bar">
          <button className="nav-button" onClick={() => fetchProductsByCategory("Computador")}>
            Computadores
          </button>
          <button className="nav-button" onClick={() => fetchProductsByCategory("Celular")}>
            Celulares
          </button>
          <button className="nav-button" onClick={() => fetchProductsByCategory("Accesorio")}>
            Accesorios
          </button>
        </nav>
        <button className="cart-button" onClick={() => setShowCart(!showCart)}>
          {showCart ? 'Close Cart' : 'View Cart'}
        </button>
      </header>

      {showCart && <Cart showCart={showCart} onClose={() => setShowCart(false)} />}

      <main className="main-content">
        <h2>{category ? `Productos de ${category}` : "¡Bienvenido a nuestra tienda!"}</h2>
        <div className="product-list">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-item">
                <img src={product.image} alt={product.name} width={100} />
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price}</p>
                <button
                  className="add-to-cart-button"
                  onClick={() => addToCart(product.id)}
                >
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
