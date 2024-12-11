import React, { useState } from 'react';
import axios from 'axios';
import '../styles/User.css';

const User = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(""); // Estado para la categoría seleccionada

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
        <button className="cart-button">
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
