import React, { useState } from "react";

function Recipes() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    // Example API call — connect to your gaka-api endpoint later
    const response = await fetch(`http://localhost:5000/api/recipes?search=${search}`);
    const data = await response.json();
    setRecipes(data);
  };

  return (
    <div className="recipes">
      <h2>Search for Recipes 🍛</h2>
      <input
        type="text"
        placeholder="Type a recipe name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {recipes.map((r, i) => (
          <li key={i}>{r.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recipes;
