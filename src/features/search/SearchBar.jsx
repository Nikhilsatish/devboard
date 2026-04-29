import React from "react";

function SearchBar({ handleSearch, username, setUsername }) {
  return (
    <div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username..."
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
