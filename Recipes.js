import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8000";

function Recipes() {
  const navigate = useNavigate();

  // search-by-name mode
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [mealType, setMealType] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ingredient mode
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientRecipes, setIngredientRecipes] = useState([]);
  const [ingLoading, setIngLoading] = useState(false);
  const [ingError, setIngError] = useState("");

  // AI recipe generator
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiRecipe, setAiRecipe] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  // ------------ search-by-name handlers ------------
 const handleSearch = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    // 1) Try exact/partial match using backend local search
    const localRes = await fetch(
      `${API_BASE_URL}/api/recipes/by-name?name=${search.trim()}`
    );

    if (localRes.ok) {
      console.log("Local recipe found!");
      const data = await localRes.json();
      setRecipes([data.recipe]);
      return;
    }

    console.log("Local recipe NOT FOUND → Using AI generator");

    // 2) AI fallback
    const aiRes = await fetch(`${API_BASE_URL}/api/ai-recipe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: search.trim(),
        ingredients: [],
      }),
    });

    const aiData = await aiRes.json();
    setRecipes([aiData.recipe]);

  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  // ------------ ingredient mode handlers ------------
  const handleAddIngredient = () => {
    const trimmed = ingredientInput.trim().toLowerCase();
    if (!trimmed) return;
    if (!ingredients.includes(trimmed)) {
      setIngredients((prev) => [...prev, trimmed]);
    }
    setIngredientInput("");
  };

  const handleIngredientKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleRemoveIngredient = (ing) => {
    setIngredients((prev) => prev.filter((i) => i !== ing));
  };

  const handleGenerateFromIngredients = async () => {
    try {
      setIngLoading(true);
      setIngError("");

      const body = {
        ingredients,
        cuisine: cuisine || null,
        meal_type: mealType || null,
      };

      const res = await fetch(`${API_BASE_URL}/api/recipes/from-ingredients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed to generate recipes");
      }

      const data = await res.json();
      setIngredientRecipes(data.recipes || []);
    } catch (err) {
      console.error(err);
      setIngError("Could not generate recipes. Please try again.");
    } finally {
      setIngLoading(false);
    }
  };

  const handleOpenDetails = (name) => {
    navigate(`/recipes/${encodeURIComponent(name)}`);
  };

  // ------------ AI generator handlers ------------
  const handleGenerateAIRecipe = async () => {
    try {
      setAiLoading(true);
      setAiError("");
      setAiRecipe(null);

      const body = {
        prompt: aiPrompt || null,
        ingredients: ingredients.length > 0 ? ingredients : null,
      };

      const res = await fetch(`${API_BASE_URL}/api/ai-recipe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("AI error response:", text);
        throw new Error("Failed to generate AI recipe");
      }

      const data = await res.json();
      setAiRecipe(data.recipe || null);
    } catch (err) {
      console.error(err);
      setAiError("AI could not generate a recipe. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  // ---- styles ----
  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#020617",
    color: "white",
    padding: "24px",
    boxSizing: "border-box",
  };

  const innerStyle = {
    maxWidth: "960px",
    margin: "0 auto",
  };

  const headerStyle = {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "8px",
  };

  const subHeaderStyle = {
    fontSize: "14px",
    color: "#9ca3af",
    marginBottom: "24px",
  };

  const cardStyle = {
    borderRadius: "16px",
    backgroundColor: "rgba(15,23,42,0.9)",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
    border: "1px solid rgba(148,163,184,0.4)",
    marginBottom: "24px",
  };

  const labelStyle = {
    fontSize: "13px",
    marginBottom: "4px",
    display: "block",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: "10px",
    border: "1px solid #4b5563",
    backgroundColor: "#020617",
    color: "white",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "80px",
    resize: "vertical",
  };

  const selectStyle = { ...inputStyle };

  const buttonStyle = {
    padding: "10px 18px",
    borderRadius: "9999px",
    border: "none",
    background: "linear-gradient(to right, #22c55e, #16a34a)",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
  };

  const smallButtonStyle = {
    ...buttonStyle,
    padding: "6px 12px",
    marginTop: 0,
    fontSize: "12px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px",
  };

  const recipeCardStyle = {
    backgroundColor: "#020617",
    borderRadius: "14px",
    padding: "14px 16px",
    border: "1px solid rgba(75,85,99,0.9)",
    cursor: "pointer",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  };

  const chipContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "8px",
  };

  const chipStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    borderRadius: "9999px",
    backgroundColor: "#111827",
    border: "1px solid #4b5563",
    fontSize: "12px",
  };

  const chipRemoveStyle = {
    cursor: "pointer",
    fontWeight: "700",
  };

  const sectionTitleStyle = {
    fontSize: "18px",
    marginTop: "16px",
    marginBottom: "12px",
  };

  return (
    <div style={pageStyle}>
      <div style={innerStyle}>
        <h1 style={headerStyle}>What would you like to cook today? 🍽️</h1>
        <p style={subHeaderStyle}>
          Search by recipe name, use your ingredients, or let GAKA&apos;s AI
          create a recipe for you.
        </p>

        {/* ---------- Search by name ---------- */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: "18px", marginBottom: "12px" }}>
            Recipe search by name 🔎
          </h2>
          <form onSubmit={handleSearch} style={{ display: "grid", gap: "12px" }}>
            <div>
              <label style={labelStyle}>Recipe name</label>
              <input
                style={inputStyle}
                type="text"
                placeholder="e.g., dosa, pizza, fried rice"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div
              style={{
                display: "grid",
                gap: "12px",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              }}
            >
              <div>
                <label style={labelStyle}>Cuisine</label>
                <select
                  style={selectStyle}
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                >
                  <option value="">Any cuisine</option>
                  <option value="Indian (North)">Indian (North)</option>
                  <option value="Indian (South)">Indian (South)</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Italian">Italian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Thai">Thai</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Meal type</label>
                <select
                  style={selectStyle}
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                >
                  <option value="">Any meal</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Sweets">Sweets</option>
                </select>
              </div>
            </div>

            <button type="submit" style={buttonStyle}>
              Find Recipes
            </button>
          </form>

          {loading && <p style={{ marginTop: "12px" }}>Loading recipes...</p>}
          {error && (
            <p style={{ marginTop: "12px", color: "#f97373" }}>{error}</p>
          )}
        </div>

        <h2 style={sectionTitleStyle}>Search results</h2>
        {recipes.length === 0 && !loading && !error && (
          <p style={{ fontSize: "14px", color: "#9ca3af" }}>
            No recipes yet. Try searching for something like <b>dosa</b> or{" "}
            <b>fried rice</b>.
          </p>
        )}
        <div style={gridStyle}>
          {recipes.map((r, idx) => (
            <div
              key={idx}
              style={recipeCardStyle}
              onClick={() => handleOpenDetails(r.name)}
            >
              <div style={{ fontWeight: "600", marginBottom: "4px" }}>
                {r.name}
              </div>
              <div style={{ fontSize: "13px", color: "#9ca3af" }}>
                {r.cuisine} • {r.meal_type}
              </div>
              <div style={{ fontSize: "13px", marginTop: "6px" }}>
                {r.is_veg ? "Veg 🌱" : "Non-veg 🍗"} • {r.time}
              </div>
            </div>
          ))}
        </div>

        {/* ---------- Ingredient mode ---------- */}
        <div style={{ ...cardStyle, marginTop: "32px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "12px" }}>
            Ingredient-based mode 🧺
          </h2>
          <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "12px" }}>
            Tell GAKA what you already have in your kitchen. We’ll suggest
            recipes that best match your ingredients.
          </p>

          <div style={{ display: "grid", gap: "12px" }}>
            <div>
              <label style={labelStyle}>Add ingredients</label>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="e.g., rice, tomato, chicken"
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  onKeyDown={handleIngredientKeyDown}
                />
                <button
                  type="button"
                  style={smallButtonStyle}
                  onClick={handleAddIngredient}
                >
                  Add
                </button>
              </div>

              {ingredients.length > 0 && (
                <div style={chipContainerStyle}>
                  {ingredients.map((ing) => (
                    <span key={ing} style={chipStyle}>
                      {ing}
                      <span
                        style={chipRemoveStyle}
                        onClick={() => handleRemoveIngredient(ing)}
                      >
                        ×
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              style={buttonStyle}
              onClick={handleGenerateFromIngredients}
              disabled={ingredients.length === 0 || ingLoading}
            >
              {ingLoading
                ? "Cooking up ideas..."
                : "Generate recipes from ingredients"}
            </button>

            {ingError && (
              <p style={{ marginTop: "8px", color: "#f97373" }}>{ingError}</p>
            )}
          </div>
        </div>

        <h2 style={sectionTitleStyle}>Ingredient-based suggestions</h2>
        {ingredientRecipes.length === 0 && !ingLoading && !ingError && (
          <p style={{ fontSize: "14px", color: "#9ca3af" }}>
            Add some ingredients like <b>rice</b>, <b>tomato</b>, <b>chicken</b>{" "}
            and click “Generate recipes from ingredients”.
          </p>
        )}
        <div style={gridStyle}>
          {ingredientRecipes.map((r, idx) => (
            <div
              key={idx}
              style={recipeCardStyle}
              onClick={() => handleOpenDetails(r.name)}
            >
              <div style={{ fontWeight: "600", marginBottom: "4px" }}>
                {r.name}
              </div>
              <div style={{ fontSize: "13px", color: "#9ca3af" }}>
                {r.cuisine} • {r.meal_type}
              </div>
              <div style={{ fontSize: "13px", marginTop: "6px" }}>
                {r.is_veg ? "Veg 🌱" : "Non-veg 🍗"} • {r.time}
              </div>
            </div>
          ))}
        </div>

        {/* ---------- AI recipe generator ---------- */}
        <div style={{ ...cardStyle, marginTop: "32px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "12px" }}>
            AI Recipe Generator 🤖
          </h2>
          <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "12px" }}>
            Describe what you want to cook or just list ingredients. GAKA’s AI
            will create a full recipe for you.
          </p>

          <div style={{ display: "grid", gap: "12px" }}>
            <div>
              <label style={labelStyle}>Your idea or ingredients</label>
              <textarea
                style={textareaStyle}
                placeholder="Example: I have rice, tomatoes and eggs. I want a quick spicy Indian dinner."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
            </div>

            {ingredients.length > 0 && (
              <p style={{ fontSize: "12px", color: "#9ca3af" }}>
                Current ingredient chips will also be sent to AI:{" "}
                {ingredients.join(", ")}
              </p>
            )}

            <button
              type="button"
              style={buttonStyle}
              onClick={handleGenerateAIRecipe}
              disabled={aiLoading}
            >
              {aiLoading ? "Asking GAKA AI..." : "Generate recipe with AI"}
            </button>

            {aiError && (
              <p style={{ marginTop: "8px", color: "#f97373" }}>{aiError}</p>
            )}
          </div>
        </div>

        {aiRecipe && (
          <div style={{ ...cardStyle, marginTop: "16px" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>
              {aiRecipe.name}
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#9ca3af",
                marginBottom: "12px",
              }}
            >
              {aiRecipe.description}
            </p>

            <h3 style={{ fontSize: "16px", marginBottom: "6px" }}>
              Ingredients 🧺
            </h3>
            <ul style={{ paddingLeft: "18px", fontSize: "14px" }}>
              {aiRecipe.ingredients?.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>

            <h3
              style={{
                fontSize: "16px",
                marginTop: "12px",
                marginBottom: "6px",
              }}
            >
              Steps 👩‍🍳
            </h3>
            <ol style={{ paddingLeft: "18px", fontSize: "14px" }}>
              {aiRecipe.steps?.map((step, idx) => (
                <li key={idx} style={{ marginBottom: "6px" }}>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recipes;
