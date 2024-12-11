import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Adminn.module.css'; 

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
    <div className={styles.adminPanel}>
      <h1 className={styles.heading}>Admin Panel</h1>

      {/* Mostrar botones de pestañas */}
      {currentTab === '' && (
        <div className={styles.tabs}>
          <button onClick={() => handleTabClick('crud1')} className={styles.tabButton}>CRUD 1: Productos</button>
          <button onClick={() => handleTabClick('crud2')} className={styles.tabButton}>CRUD 2: Usuarios</button>
        </div>
      )}

      {/* Mostrar CRUD 1 (Productos) si está seleccionado */}
      {currentTab === 'crud1' && (
        <div className={styles.crudContainer}>
          <button onClick={() => handleTabClick('')} className={styles.backButton}>Volver</button>
          <button onClick={() => setShowForm(!showForm)} className={styles.createButton}>
            {showForm ? "Cancel" : "Create New Product"}
          </button>

          {showForm && (
            <form onSubmit={handleProductSubmit} className={styles.form}>
              <input type="text" name="name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Product Name" className={styles.input} required />
              <input type="text" name="category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} placeholder="Category" className={styles.input} required />
              <input type="text" name="description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Description" className={styles.input} required />
              <input type="number" name="stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} placeholder="Stock" className={styles.input} required />
              <input type="number" name="price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="Price" className={styles.input} required />
              <input type="text" name="image" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} placeholder="Image URL" className={styles.input} />
              <input type="date" name="date" value={newProduct.date} onChange={(e) => setNewProduct({ ...newProduct, date: e.target.value })} placeholder="Date" className={styles.input} required />
              <button type="submit" className={styles.submitButton}>Create Product</button>
            </form>
          )}

          <h2 className={styles.subHeading}>Product List</h2>
          <ul className={styles.productList}>
            {products.map((product) => (
              <li key={product.id} className={styles.productItem}>
                <img src={product.image} alt={product.name} className={styles.productImage} />
                <div className={styles.productData}>
                  <span><strong>Category:</strong> {product.category}</span>
                  <span><strong>Stock:</strong> {product.stock}</span>
                  <span><strong>Price:</strong> ${product.price}</span>
                  <span><strong>Date:</strong> {product.date}</span>
                </div>
                <div className={styles.productDescription}>
                  <span><strong>Description:</strong> {product.description}</span>
                </div>
                <div className={styles.productActions}>
                  <button className={styles.actionButton}>Edit</button>
                  <button className={styles.actionButton}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mostrar CRUD 2 (Usuarios) si está seleccionado */}
      {currentTab === 'crud2' && (
        <div className={styles.crudContainer}>
          <button onClick={() => handleTabClick('')} className={styles.backButton}>Volver</button>
          <button onClick={() => setShowUserForm(!showUserForm)} className={styles.createButton}>
            {showUserForm ? "Cancel" : "Create New User"}
          </button>

          {showUserForm && (
            <form onSubmit={handleUserSubmit} className={styles.form}>
              <input type="text" name="username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} placeholder="User Name" className={styles.input} required />
              <input type="email" name="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} placeholder="Email" className={styles.input} required />
              <input type="password" name="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} placeholder="Password" className={styles.input} required />
              <input type="text" name="address" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} placeholder="Address" className={styles.input} required />
              <input type="text" name="role" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} placeholder="Role" className={styles.input} />
              <button type="submit" className={styles.submitButton}>Create User</button>
            </form>
          )}

          <h2 className={styles.subHeading}>User List</h2>
          <ul className={styles.userList}>
            {users.map((user) => (
              <li key={user.id} className={styles.userItem}>
                <span><strong>Name:</strong> {user.username}</span>
                <span><strong>Email:</strong> {user.email}</span>
                <span><strong>Address:</strong> {user.address}</span>
                <span><strong>Role:</strong> {user.role}</span>
                <div className={styles.userActions}>
                  <button className={styles.actionButton}>Edit</button>
                  <button className={styles.actionButton}>Delete</button>
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
