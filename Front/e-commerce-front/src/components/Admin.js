import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Adminn.css'

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    image: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario

  // Fetch all products from the server
  useEffect(() => {
    axios
      .get("http://localhost:8080/product/list")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Create or update a product
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      axios
        .put("http://localhost:8080/product/update", editingProduct)
        .then((response) => {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === response.data.id ? response.data : product
            )
          );
          setIsEditing(false);
          setEditingProduct(null);
        })
        .catch((error) => console.error("Error updating product:", error));
    } else {
      axios
        .post("http://localhost:8080/product/create", newProduct)
        .then((response) => {
          setProducts([...products, response.data]);
          setNewProduct({
            name: "",
            category: "",
            stock: "",
            price: "",
            image: ""
          });
        })
        .catch((error) => console.error("Error creating product:", error));
    }
  };

  // Edit a product
  const handleEdit = (product) => {
    setIsEditing(true);
    setEditingProduct(product);
  };

  // Delete a product
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/product/delete/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <div>
      <h1>Product Management</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Create New Product"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={isEditing ? editingProduct.name : newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
          />
          <input
            type="text"
            name="category"
            value={isEditing ? editingProduct.category : newProduct.category}
            onChange={handleInputChange}
            placeholder="Category"
            required
          />
          <input
            type="number"
            name="stock"
            value={isEditing ? editingProduct.stock : newProduct.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            required
          />
          <input
            type="number"
            name="price"
            value={isEditing ? editingProduct.price : newProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
          />
          <input
            type="text"
            name="image"
            value={isEditing ? editingProduct.image : newProduct.image}
            onChange={handleInputChange}
            placeholder="Image URL"
          />
          <button type="submit">{isEditing ? "Update Product" : "Create Product"}</button>
        </form>
      )}

      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div>
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Stock: {product.stock}</p>
              <p>Price: ${product.price}</p>
              <img src={product.image} alt={product.name} width={100} />
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
