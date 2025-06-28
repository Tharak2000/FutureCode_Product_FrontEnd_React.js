import React from "react";
import axios from "axios";
import { useState , useEffect } from "react";

const Product = () => {
    const [products , setProduct] = useState([]);

    useEffect (()=>{
        axios.get("http://localhost:5000/product/")
        
        .then(response =>{
            console.log('Fetched products:', response.data);
            setProduct(response.data);
        

        })
        .catch(err => {
            console.error('Error fetching data',err);
        });
    },[]);

    return(
        // <div>
        //     <h1>User List</h1>
        //     <ul>
        //         {products.map(product =>(
        //             <li key = {product._id}>{product.name}</li>
        //         ))}
        //     </ul>
        // </div>

        <div>
      <h1>Product List</h1>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map(product => (
            <ol key={product._id}>
              <strong>{product.name}</strong> - ${product.price} ({product.quantity} in stock)
            </ol>
          ))}
        </ul>
      )}
    </div>
    )

}

export default Product;

