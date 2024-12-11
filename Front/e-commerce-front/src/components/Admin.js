import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Adminn.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    stock: "",
    price: "",
    image: "",
    date: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);

  // Estado para gestionar qué sección mostrar
  const [currentTab, setCurrentTab] = useState('');

  // Fetch all products from the server
  useEffect(() => {
    if (currentTab === 'crud1') {
      axios
        .get("http://localhost:8080/product/list")
        .then((response) => setProducts(response.data))
        .catch((error) => console.error("Error fetching products:", error));
    } else if (currentTab === 'crud2') {
      axios
        .get("http://localhost:8080/user/list")
        .then((response) => setUsers(response.data))
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [currentTab]);

  // Manejar los cambios en los inputs del formulario de productos
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingProduct((prevState) => ({
        ...prevState,
        [name]: value || "",
      }));
    } else {
      setNewProduct((prevState) => ({
        ...prevState,
        [name]: value || "",
      }));
    }
  };

  // Crear o actualizar un producto
  const handleProductSubmit = (e) => {
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
            description: "",
            stock: "",
            price: "",
            image: "",
            date: "",
          });
        })
        .catch((error) => console.error("Error creating product:", error));
    }
  };

  // Editar un producto
  const handleProductEdit = (product) => {
    setIsEditing(true);
    setEditingProduct(product);
    setShowForm(true);
  };

  // Eliminar un producto
  const handleProductDelete = (id) => {
    axios
      .delete(`http://localhost:8080/product/delete/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  // Manejar los cambios en los inputs del formulario de usuarios
  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditingUser) {
      setEditingUser((prevState) => ({
        ...prevState,
        [name]: value || "",
      }));
    } else {
      setNewUser((prevState) => ({
        ...prevState,
        [name]: value || "",
      }));
    }
  };

  // Crear o actualizar un usuario
  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (isEditingUser) {
      axios
        .put("http://localhost:8080/user/update", editingUser)
        .then((response) => {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === response.data.id ? response.data : user
            )
          );
          setIsEditingUser(false);
          setEditingUser(null);
        })
        .catch((error) => console.error("Error updating user:", error));
    } else {
      axios
        .post("http://localhost:8080/user/create", newUser)
        .then((response) => {
          setUsers([...users, response.data]);
          setNewUser({
            name: "",
            email: "",
            password: "",
            role: "",
          });
        })
        .catch((error) => console.error("Error creating user:", error));
    }
  };

  // Editar un usuario
  const handleUserEdit = (user) => {
    setIsEditingUser(true);
    setEditingUser(user);
    setShowUserForm(true);
  };

  // Eliminar un usuario
  const handleUserDelete = (id) => {
    axios
      .delete(`http://localhost:8080/user/delete/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  // Manejar el cambio de pestaña
  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      {/* Mostrar botones de pestañas */}
      {currentTab === '' && (
        <div className="tabs">
          <button onClick={() => handleTabClick('crud1')}>CRUD 1: Productos</button>
          <button onClick={() => handleTabClick('crud2')}>CRUD 2: Usuarios</button>
        </div>
      )}

      {/* Mostrar CRUD 1 (Productos) si está seleccionado */}
      {currentTab === 'crud1' && (
        <div>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Create New Product"}
          </button>

          {showForm && (
            <form onSubmit={handleProductSubmit}>
              <input
                type="text"
                name="name"
                value={isEditing ? editingProduct?.name || "" : newProduct.name}
                onChange={handleProductInputChange}
                placeholder="Product Name"
                required
              />
              <input
                type="text"
                name="category"
                value={isEditing ? editingProduct?.category || "" : newProduct.category}
                onChange={handleProductInputChange}
                placeholder="Category"
                required
              />
              <input
                type="text"
                name="description"
                value={isEditing ? editingProduct?.description || "" : newProduct.description}
                onChange={handleProductInputChange}
                placeholder="Description"
                required
              />
              <input
                type="number"
                name="stock"
                value={isEditing ? editingProduct?.stock || "" : newProduct.stock}
                onChange={handleProductInputChange}
                placeholder="Stock"
                required
              />
              <input
                type="number"
                name="price"
                value={isEditing ? editingProduct?.price || "" : newProduct.price}
                onChange={handleProductInputChange}
                placeholder="Price"
                required
              />
              <input
                type="text"
                name="image"
                value={isEditing ? editingProduct?.image || "" : newProduct.image}
                onChange={handleProductInputChange}
                placeholder="Image URL"
              />
              <input
                type="date"
                name="date"
                value={isEditing ? editingProduct?.date || "" : newProduct.date}
                onChange={handleProductInputChange}
                placeholder="Date"
                required
              />
              <button type="submit">{isEditing ? "Update Product" : "Create Product"}</button>
            </form>
          )}

          <h2>Product List</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="product-data">
                  <span><strong>Category:</strong> {product.category}</span>
                  <span><strong>Stock:</strong> {product.stock}</span>
                  <span><strong>Price:</strong> ${product.price}</span>
                  <span><strong>Date:</strong> {product.date}</span>
                </div>
                <div className="product-description">
                  <span><strong>Description:</strong> {product.description}</span>
                </div>
                <div className="product-actions">
                  <button onClick={() => handleProductEdit(product)}>Edit</button>
                  <button onClick={() => handleProductDelete(product.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mostrar CRUD 2 (Usuarios) si está seleccionado */}
      {currentTab === 'crud2' && (
        <div>
          <button onClick={() => setShowUserForm(!showUserForm)}>
            {showUserForm ? "Cancel" : "Create New User"}
          </button>

          {showUserForm && (
            <form onSubmit={handleUserSubmit}>
              <input
                type="text"
                name="name"
                value={isEditingUser ? editingUser?.name || "" : newUser.name}
                onChange={handleUserInputChange}
                placeholder="User Name"
                required
              />
              <input
                type="email"
                name="email"
                value={isEditingUser ? editingUser?.email || "" : newUser.email}
                onChange={handleUserInputChange}
                placeholder="Email"
                required
              />
              <input
                type="password"
                name="password"
                value={isEditingUser ? editingUser?.password || "" : newUser.password}
                onChange={handleUserInputChange}
                placeholder="Password"
                required
              />
              <input
                type="text"
                name="role"
                value={isEditingUser ? editingUser?.role || "" : newUser.role}
                onChange={handleUserInputChange}
                placeholder="Role"
              />
              <button type="submit">{isEditingUser ? "Update User" : "Create User"}</button>
            </form>
          )}

          <h2>User List</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <span><strong>Name:</strong> {user.name}</span>
                <span><strong>Email:</strong> {user.email}</span>
                <span><strong>Role:</strong> {user.role}</span>
                <div className="user-actions">
                  <button onClick={() => handleUserEdit(user)}>Edit</button>
                  <button onClick={() => handleUserDelete(user.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Admin;
