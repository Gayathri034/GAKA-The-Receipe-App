from fastapi import FastAPI
from typing import List, Optional

app = FastAPI(title="GAKA - Recipe App API")

# Sample recipes
recipes = [
    {
        "id": 1,
        "name": "Chicken Biryani",
        "ingredients": ["chicken", "rice", "spices"],
        "cuisine": "Indian",
        "region": "North Indian",
        "meal_type": "Lunch",
        "veg": False
    },
    {
        "id": 2,
        "name": "Masala Dosa",
        "ingredients": ["rice", "lentils", "potato", "spices"],
        "cuisine": "Indian",
        "region": "South Indian",
        "meal_type": "Breakfast",
        "veg": True
    },
    {
        "id": 3,
        "name": "Mango Smoothie",
        "ingredients": ["mango", "milk", "ice"],
        "cuisine": "Indian",
        "meal_type": "Drinks",
        "veg": True
    },
    {
        "id": 4,
        "name": "Pasta Primavera",
        "ingredients": ["pasta", "vegetables", "cream"],
        "cuisine": "Italian",
        "meal_type": "Lunch",
        "veg": True
    },
    {
        "id": 5,
        "name": "Chicken Tacos",
        "ingredients": ["chicken", "taco shells", "lettuce", "cheese"],
        "cuisine": "Mexican",
        "meal_type": "Dinner",
        "veg": False
    }
]

# Root route
@app.get("/")
def read_root():
    return {"message": "Welcome to GAKA API 🍳"}

# Get recipes with filters
@app.get("/recipes")
def get_recipes(
    ingredients: Optional[List[str]] = None,  # list of ingredients user has
    cuisine: Optional[str] = None,
    region: Optional[str] = None,
    meal_type: Optional[str] = None,
    veg: Optional[bool] = None
):
    results = recipes

    # Filter by cuisine
    if cuisine:
        results = [r for r in results if r["cuisine"].lower() == cuisine.lower()]

    # Filter by region
    if region:
        results = [r for r in results if r.get("region", "").lower() == region.lower()]

    # Filter by meal type
    if meal_type:
        results = [r for r in results if r.get("meal_type", "").lower() == meal_type.lower()]

    # Filter by veg/non-veg
    if veg is not None:
        results = [r for r in results if r.get("veg", True) == veg]

    # Filter by ingredients
    if ingredients:
        ingredients_lower = [i.lower() for i in ingredients]
        results = [
            r for r in results
            if all(item.lower() in ingredients_lower for item in r["ingredients"])
        ]

    return results
