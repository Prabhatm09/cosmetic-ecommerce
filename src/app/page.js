"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./product/page";
import Navbar from "@/components/navbar";
import CartDrawer from "@/components/cartDrawer";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null); // For managing selected product
  const [isModalOpen, setIsModalOpen] = useState(false); // For managing modal state
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle product click
  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedProductId(null);
    setIsModalOpen(false);
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );
      const product = await response.json();

      setCart((prevCart) => {
        const existingProductIndex = prevCart.findIndex(
          (item) => item.id === productId
        );

        if (existingProductIndex !== -1) {
          // Product already exists in the cart, increase quantity
          const updatedCart = [...prevCart];
          updatedCart[existingProductIndex].quantity += 1;
          return updatedCart;
        } else {
          // Add new product to the cart
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });

      setIsModalOpen(false); // Close modal after adding to cart
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  console.log("cart", cart);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar
        cartItemCount={cart.length}
        cart={cart}
        setCart={setCart}
        onSearch={(query) => setSearchQuery(query)}
      />{" "}
      {/* Pass search handler */}
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-24">
        {filteredProducts.map((product) => (
          <div
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            key={product.id}
            onClick={() => handleProductClick(product.id)} // Attach click handler
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-700 text-sm">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-600">
                  {product.category}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-sm text-yellow-500">
                  {"★".repeat(Math.round(product.rating.rate))}
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  ({product.rating.count} reviews)
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Modal for displaying product details */}
        {isModalOpen && (
          <Product
            productId={selectedProductId}
            onClose={closeModal}
            addToCart={addToCart}
          />
        )}
      </div>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCartToggle}
        cart={cart}
        setCart={setCart}
      />
    </>
  );
}
