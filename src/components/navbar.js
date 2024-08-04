"use client";

import React, { useState } from "react";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import CartDrawer from "./cartDrawer";

function Navbar({ cartItemCount, cart, setCart, onSearch }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass the search query to the parent component
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 ">
          <img
            src="https://cdn.pixabay.com/photo/2021/09/05/19/06/oil-6600227_960_720.png" // replace with your logo
            alt="Logo"
            className="w-12 h-auto rounded-full"
          />
          <span className="font-bold text-xl text-pink-600">Fashion</span>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="lg:hidden text-gray-700 hover:text-pink-600 focus:outline-none"
          onClick={toggleNav}
        >
          {isNavOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Navigation Links for Large Screens */}
        <nav className="hidden lg:flex space-x-8">
          <a href="#" className="text-gray-700 hover:text-pink-600">
            Women
          </a>
          <a href="#" className="text-gray-700 hover:text-pink-600">
            Men
          </a>
          <a href="#" className="text-gray-700 hover:text-pink-600">
            Kids
          </a>
          <a href="#" className="text-gray-700 hover:text-pink-600">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-pink-600">
            All Brands
          </a>
          <a href="#" className="text-gray-700 hover:text-pink-600">
            More
          </a>
        </nav>

        {/* Search Bar for Medium and Larger Screens */}
        <div className="hidden md:flex items-center border rounded-full py-2 px-4 bg-gray-100">
          <FiSearch className="text-gray-600 mr-2" />
          <input
            type="text"
            placeholder="Search for products, styles, brands"
            className="bg-gray-100 outline-none"
            value={searchQuery}
            onChange={handleSearchChange} // Handle search input change
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <a
            href="/account"
            className="text-gray-700 hover:text-pink-600 hidden md:flex items-center"
          >
            <FiUser className="mr-1" />
            Account
          </a>

          <button
            onClick={() => setIsCartOpen(true)}
            className="text-gray-700 hover:text-pink-600 flex items-center relative"
          >
            <FiShoppingCart className="mr-1" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-1 text-[10px] font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isNavOpen && (
        <nav className="lg:hidden bg-white shadow-md border-t">
          <ul className="flex flex-col items-center space-y-2 py-4">
            <li>
              <a
                href="#"
                className="text-gray-700 hover:text-pink-600 block"
                onClick={() => setIsNavOpen(false)}
              >
                Women
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 hover:text-pink-600 block"
                onClick={() => setIsNavOpen(false)}
              >
                Men
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 hover:text-pink-600 block"
                onClick={() => setIsNavOpen(false)}
              >
                Kids
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 hover:text-pink-600 block"
                onClick={() => setIsNavOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 hover:text-pink-600 block"
                onClick={() => setIsNavOpen(false)}
              >
                All Brands
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 hover:text-pink-600 block"
                onClick={() => setIsNavOpen(false)}
              >
                More
              </a>
            </li>
          </ul>
        </nav>
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
      />
    </header>
  );
}

export default Navbar;
