import React from "react";
import { FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";

const CartDrawer = ({ isOpen, onClose, cart, setCart }) => {
  const router = useRouter();

  // Calculate Bag Total
  const bagTotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  // Fixed or dynamic discount (you can change this based on your needs)
  const discountOnMRP = 100;

  // Calculate Sub Total
  //   const subTotal = bagTotal - discountOnMRP;

  // Fixed Convenience Charges (you can adjust this as needed)
  const convenienceCharges = 129;

  // Calculate Final Amount to Pay
  const finalAmount = bagTotal + convenienceCharges - discountOnMRP;

  const removeProduct = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId)
    );
  };

  const handleProceedToBuy = () => {
    router.push("/accounts"); // Navigate to the account details page
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Cart Content */}
      <div className="absolute right-0 top-0 bg-white w-full sm:w-96 h-full shadow-lg p-6 overflow-y-auto">
        <button className="text-gray-700 hover:text-pink-600" onClick={onClose}>
          <FiX size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Bag</h2>

        {/* Cart Items */}
        {cart?.length > 0 ? (
          cart?.map((product) => (
            <div key={product.id} className="flex items-center mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600">
                  Category: {product.category}
                </p>
                <p className="text-lg font-bold text-pink-600">
                  Price: $ {product.price}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {product.quantity}
                </p>
              </div>
              <button
                className="text-gray-700 hover:text-red-600 ml-auto"
                onClick={() => removeProduct(product.id)}
              >
                <FiX />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}

        {/* Coupon Section */}
        <div className="mb-4">
          <button className="w-full text-left py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded text-gray-700">
            Apply Coupons and save extra
          </button>
        </div>

        {/* Price Summary */}
        {cart?.length > 0 && (
          <div className="border-t border-b py-4">
            <h3 className="text-lg font-semibold mb-2">Price Summary</h3>
            <div className="flex justify-between">
              <p>Bag Total</p>
              <p>₹{bagTotal.toFixed(2)}</p>
            </div>
            {/* <div className="flex justify-between">
  <p>Discount on MRP</p>
  <p className="text-green-500">-₹{discountOnMRP.toFixed(2)}</p>
</div>
<div className="flex justify-between">
  <p>Sub Total</p>
  <p>₹{subTotal.toFixed(2)}</p>
</div> */}
            <div className="flex justify-between">
              <p>Convenience Charges</p>
              <p>₹{convenienceCharges.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount on Convenience Charges </p>
              <p className="text-green-500">-₹{discountOnMRP.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <p>You Pay</p>
              <p>₹{finalAmount.toFixed(2)}</p>
            </div>
            <div className="bg-green-100 text-green-800 rounded p-2 mt-2 text-center">
              Yay! You are saving ₹{discountOnMRP.toFixed(2)}.
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center">
          <span className="text-xl font-bold">₹{finalAmount.toFixed(2)}</span>
          <button
            className={`px-4 py-2 rounded-md ${
              cart?.length > 0
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            onClick={handleProceedToBuy}
            disabled={cart?.length === 0}
          >
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
