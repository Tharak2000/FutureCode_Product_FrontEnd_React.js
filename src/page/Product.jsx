import React, { useState, useEffect } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:5000/product/")
      .then(response => {
        console.log('Fetched products:', response.data);
        setProducts(response.data);
      })
      .catch(err => {
        console.error('Error fetching data', err);
      });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    const { name, price, quantity } = form;

    if (!name || !price || !quantity) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      // Update existing product
      axios.put(`http://localhost:5000/product/${editingId}`, {
        name,
        price: Number(price),
        quantity: Number(quantity)
      })
        .then(() => {
          alert("Product updated!");
          setForm({ name: "", price: "", quantity: "" });
          setEditingId(null);
          fetchProducts();
        })
        .catch(err => {
          console.error(err);
          alert("Update failed");
        });
    } else {
      // Add new product
      axios.post("http://localhost:5000/product/", {
        name,
        price: Number(price),
        quantity: Number(quantity)
      })
        .then(() => {
          alert("Product added!");
          setForm({ name: "", price: "", quantity: "" });
          fetchProducts();
        })
        .catch(err => {
          console.error(err);
          alert("Add failed");
        });
    }
  };

  const handleEditClick = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity
    });
    setEditingId(product._id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product List</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editingId ? "Update Product" : "Add Product"}
        </button>
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", price: "", quantity: "" });
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product._id}>
              <strong>{product.name}</strong> - Rs {product.price} ({product.quantity})
              <button
                onClick={() => handleEditClick(product)}
                style={{ marginLeft: "10px" }}
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Product;
