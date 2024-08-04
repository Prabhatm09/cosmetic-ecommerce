import React, { useState, useEffect } from "react";
import axios from "axios";

const Product = ({ productId, onClose, addToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white bg-opacity-50">
        Loading...
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 sm:px-6">
      <div className="bg-white w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl rounded-lg shadow-lg overflow-hidden relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl p-2 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        {product && (
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="w-[30%] md:w-1/2">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">
                  {product.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">
                  {product.description}
                </p>
                <div className="flex items-center mb-2 sm:mb-4">
                  <span className="text-yellow-500">
                    {"★".repeat(Math.round(product.rating.rate))}
                  </span>
                  <span className="ml-2 text-xs sm:text-sm text-gray-600">
                    ({product.rating.count} reviews)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={() => addToCart(product.id)}
                className="bg-pink-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-pink-700 transition duration-300 mt-4 sm:mt-6"
              >
                Add to Bag
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
