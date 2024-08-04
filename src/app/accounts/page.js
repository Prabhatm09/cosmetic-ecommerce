import React from "react";

function Account() {
  return (
    <div className="bg-[#694F8E] py-10">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Address</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div>
          {/* Address Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <input
              type="text"
              placeholder="Pincode"
              className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-pink-500"
            />
            <input
              type="text"
              placeholder="House/ Flat/ Office No."
              className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-pink-500"
            />
            <textarea
              placeholder="Road Name/ Area /Colony"
              className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-pink-500"
              rows="3"
            ></textarea>
          </div>

          {/* Contact Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-sm text-gray-500 mb-4">
              Information provided here will be used to contact you for delivery
              updates
            </p>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-pink-500"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-pink-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>

        <button className="w-full py-3 text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
          SHIP TO THIS ADDRESS
        </button>
      </div>
    </div>
  );
}

export default Account;
