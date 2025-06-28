import React from "react";
import axios from "axios";
import { useState , useEffect } from "react";

const Product = () => {
    const [products , setProduct] = useState([]);

    const [form , setForm] = useState({
        name:"",
        price:"",
        quantity:""
    });

    useEffect (()=>{
        fetchProducts();
    },[]);

    const fetchProducts =() => {
        axios.get("http://localhost:5000/product/")
        
        .then(response =>{
            console.log('Fetched products:', response.data);
            setProduct(response.data);
        

        })
        .catch(err => {
            console.error('Error fetching data',err);
        });
    }

     const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Handle add product
  const handleAddProduct = () => {
    const { name, price, quantity } = form;

    if (!name || !price || !quantity) {
      alert("Please fill all fields");
      return;
    }

    axios.post("http://localhost:5000/product/", {
      name,
      price: Number(price),
      quantity: Number(quantity)
    })
      .then((res) => {
        console.log("Product added:", res.data);
        setForm({ name: "", price: "", quantity: "" }); // Reset form
        fetchProducts(); // Refresh product list
      })
      .catch((err) => {
        console.error("Error adding product:", err);
      });
  };


    return(
        // <div>
        //     <h1>User List</h1>
        //     <ul>
        //         {products.map(product =>(
        //             <li key = {product._id}>{product.name}</li>
        //         ))}
        //     </ul>
        // </div>

    //     <div>
    //   <h1>Product List</h1>
    //   {products.length === 0 ? (
    //     <p>No products available.</p>
    //   ) : (
    //     <ul>
    //       {products.map(product => (
    //         <ol key={product._id}>
    //           <strong>{product.name}</strong> - ${product.price} ({product.quantity} in stock)
    //         </ol>
    //       ))}
    //     </ul>
    //   )}
    // </div>

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
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <strong>{product.name}</strong> - ${product.price} ({product.quantity})
            </li>
          ))}
        </ul>
      )}
    </div>
    )

}

export default Product;

