import React, { useState } from "react";
import "./RecipeSearch.css";

function RecipeSearch() {
  const [dish, setDish] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", dish);
  };

  return (
    <div className="recipe-search-wrapper">
      <h2>🍽️ Know what you want to cook?</h2>

      <input
        type="text"
        placeholder="Enter dish name..."
        value={dish}
        onChange={(e) => setDish(e.target.value)}
        className="recipe-input"
      />

      <button className="search-btn" onClick={handleSearch}>
        Get Steps 👉
      </button>
    </div>
  );
}

export default RecipeSearch;
