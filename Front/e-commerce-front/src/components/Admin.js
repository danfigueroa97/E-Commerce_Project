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
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);

  const [currentTab, setCurrentTab] = useState('');

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

  const handleProductEdit = (product) => {
    setIsEditing(true);
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleProductDelete = (id) => {
    axios
      .delete(`http://localhost:8080/product/delete/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

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
            username: "",
            email: "",
            password: "",
            role: "",
          });
        })
        .catch((error) => console.error("Error creating user:", error));
    }
  };

  const handleUserEdit = (user) => {
    setIsEditingUser(true);
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleUserDelete = (id) => {
    axios
      .delete(`http://localhost:8080/user/delete/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    setShowForm(false);
    setShowUserForm(false);
    setIsEditing(false);
    setIsEditingUser(false);
  };

  return (
    <div className={styles.adminPanel}>
      <h1 className={styles.heading}>Admin Panel</h1>

      {/* Mostrar botones de pestañas */}
      {currentTab === '' && (
        <div className={styles.tabs}>
          <button onClick={() => handleTabClick('crud1')} className={styles.tabButton}>Products</button>
          <button onClick={() => handleTabClick('crud2')} className={styles.tabButton}>Users</button>
        </div>
      )}

      {/* Mostrar productos o usuarios según la pestaña seleccionada */}
      {currentTab === 'crud1' && (
        <div className={styles.crudContainer}>
          <h2 className={styles.subHeading}>Product List</h2>

          {/* Botón de crear producto */}
          <button onClick={() => setShowForm(true)} className={styles.addButton}>Create Product</button>
          <button onClick={() => handleTabClick('')} className={styles.cancelButton}>Back</button>

          {/* Tabla de productos */}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.productImage}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.stock}</td>
                  <td>{product.price}</td>
                  <td>{product.date}</td>
                  <td className={styles.productActions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleProductEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleProductDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Formulario para crear o editar productos */}
          {showForm && (
            <form onSubmit={handleProductSubmit} className={styles.form}>
              <input
                className={styles.input}
                type="text"
                name="name"
                value={isEditing ? editingProduct.name : newProduct.name}
                onChange={handleProductInputChange}
                placeholder="Product Name"
              />
              <input
                className={styles.input}
                type="text"
                name="category"
                value={isEditing ? editingProduct.category : newProduct.category}
                onChange={handleProductInputChange}
                placeholder="Category"
              />
              <input
                className={styles.input}
                type="text"
                name="description"
                value={isEditing ? editingProduct.description : newProduct.description}
                onChange={handleProductInputChange}
                placeholder="Description"
              />
              <input
                className={styles.input}
                type="number"
                name="stock"
                value={isEditing ? editingProduct.stock : newProduct.stock}
                onChange={handleProductInputChange}
                placeholder="Stock"
              />
              <input
                className={styles.input}
                type="number"
                name="price"
                value={isEditing ? editingProduct.price : newProduct.price}
                onChange={handleProductInputChange}
                placeholder="Price"
              />
              <input
                className={styles.input}
                type="text"
                name="image"
                value={isEditing ? editingProduct.image : newProduct.image}
                onChange={handleProductInputChange}
                placeholder="Image URL"
              />
              <input
                className={styles.input}
                type="date"
                name="date"
                value={isEditing ? editingProduct.date : newProduct.date}
                onChange={handleProductInputChange}
                placeholder="Date"
              />
              <button type="submit" className={styles.submitButton}>
                {isEditing ? 'Update Product' : 'Create Product'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Mostrar usuarios cuando CRUD 2 está seleccionado */}
      {currentTab === 'crud2' && (
        <div className={styles.crudContainer}>
          <h2 className={styles.subHeading}>User List</h2>

          <button onClick={() => setShowUserForm(true)} className={styles.addButton}>
            Create User
          </button>
          <button onClick={() => handleTabClick('')} className={styles.cancelButton}>Back</button>

          {/* Tabla de usuarios */}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className={styles.productActions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleUserEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleUserDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Formulario para crear o editar usuarios */}
          {showUserForm && (
            <form onSubmit={handleUserSubmit} className={styles.form}>
              <input
                className={styles.input}
                type="text"
                name="username"
                value={isEditingUser ? editingUser.username : newUser.username}
                onChange={handleUserInputChange}
                placeholder="Username"
              />
              <input
                className={styles.input}
                type="email"
                name="email"
                value={isEditingUser ? editingUser.email : newUser.email}
                onChange={handleUserInputChange}
                placeholder="Email"
              />
              <input
                className={styles.input}
                type="password"
                name="password"
                value={isEditingUser ? editingUser.password : newUser.password}
                onChange={handleUserInputChange}
                placeholder="Password"
              />
              <input
                className={styles.input}
                type="text"
                name="role"
                value={isEditingUser ? editingUser.role : newUser.role}
                onChange={handleUserInputChange}
                placeholder="Role"
              />
              <button type="submit" className={styles.submitButton}>
                {isEditingUser ? 'Update User' : 'Create User'}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
