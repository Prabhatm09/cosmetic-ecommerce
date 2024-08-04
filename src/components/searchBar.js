import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value); // Pass the search query to the parent component
  };

  return (
    <div className="flex items-center border rounded-full py-2 px-4 bg-gray-100">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for products, styles, brands"
        className="bg-gray-100 outline-none flex-1"
      />
    </div>
  );
};

export default SearchBar;
