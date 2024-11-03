import React, { useState, useEffect } from "react";

const ProductUpdate = () => {
  const productId = 109; // ID của sản phẩm bạn muốn sửa đổi
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    stock: "",
    Categories: "",
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/bookstore_api/api/products/${productId}`
        );
        if (!response.ok)
          throw new Error(`Failed to fetch product: ${response.status}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setMessage("Error fetching product. Please try again.");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/bookstore_api/api/Category"
        );
        if (!response.ok)
          throw new Error(`Failed to fetch categories: ${response.status}`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setMessage("Error fetching categories. Please try again.");
      }
    };

    fetchProduct();
    fetchCategories();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/bookstore_api/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage("Error updating product. Please try again.");
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="Categories"
            value={product.Categories}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.Categories} value={category.Categories}>
                {category.Categories_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default ProductUpdate;
