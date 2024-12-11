// User.js
import React, { useState } from 'react';
import Cart from './Cart'; // Ajusta la ruta según tu estructura de archivos
import axios from 'axios';
import '../styles/User.css';

const User = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(""); // Estado para la categoría seleccionada
  const [showCart, setShowCart] = useState(false); // Estado para controlar la visibilidad del carrito

  // Función para obtener productos por categoría
  const fetchProductsByCategory = (category) => {
    axios
      .get(`http://localhost:8080/product/list/${category}`)
      .then((response) => {
        setProducts(response.data); // Guardar los productos obtenidos en el estado
        setCategory(category); // Actualizar la categoría seleccionada
      })
      .catch((error) => console.error("Error fetching products by category:", error));
  };

  // Agregar producto al carrito
  const addToCart = (productId) => {
    axios.post(`http://localhost:8080/cart/add/${productId}`)
      .then(() => {
        alert("Producto añadido al carrito");
        setShowCart(true); // Asegúrate de que el carrito se muestre después de agregar un producto
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };

  // Manejar la acción de cerrar el carrito
  const closeCart = () => {
    setShowCart(false);
  };

  return (
    <div className="user-page">
      <header className="header">
        <h1 className="site-name">Mi E-Commerce</h1>
        <nav className="nav-bar">
          <button
            className="nav-button"
            onClick={() => fetchProductsByCategory("Computador")}
          >
            Computadores
          </button>
          <button
            className="nav-button"
            onClick={() => fetchProductsByCategory("Celular")}
          >
            Celulares
          </button>
          <button
            className="nav-button"
            onClick={() => fetchProductsByCategory("Accesorio")}
          >
            Accesorios
          </button>
        </nav>
        <button className="cart-button" onClick={() => setShowCart(true)}>
          View Cart
          {showCart && <Cart onUpdateCart={(length) => console.log('Cart updated with length:', length)} closeCart={closeCart} />}
          Carrito
          <span className="cart-icon">🛒</span>
        </button>
      </header>

      <main className="main-content">
        <h2>{category ? `Productos de ${category}` : "¡Bienvenido a nuestra tienda!"}</h2>
        <p>Selecciona una categoría para explorar nuestros productos.</p>

        {/* Mostrar los productos si hay productos en el estado */}
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
