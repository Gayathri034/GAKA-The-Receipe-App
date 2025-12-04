import os
import json
import requests
from fastapi import FastAPI, Query, HTTPException

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv   # <--- ADD THIS

load_dotenv()  # <--- IMPORTANT

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
print("DEBUG: Loaded GROQ_API_KEY =", GROQ_API_KEY)






app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow all temporarily to confirm it's working
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# --- sample data for now ---
SAMPLE_RECIPES = [
    {
        "name": "Masala Dosa",
        "cuisine": "Indian (South)",
        "meal_type": "Breakfast",
        "is_veg": True,
        "time": "30 mins",
        "difficulty": "Medium",
        "description": "Crispy rice-lentil crepes filled with spiced potato masala, served with chutney and sambar.",
        "ingredients": [
            "rice",
            "urad dal",
            "fenugreek seeds",
            "potato",
            "onion",
            "green chilli",
            "mustard seeds",
            "oil",
            "salt",
        ],
        "steps": [
            "Soak rice, urad dal, and a few fenugreek seeds for 4–6 hours.",
            "Grind to a smooth batter, add salt, and ferment overnight.",
            "Boil potatoes, peel and mash them.",
            "In a pan, heat oil, splutter mustard seeds, then sauté onion and green chilli.",
            "Add mashed potatoes, salt, and a little water to make the masala filling.",
            "Heat a dosa tawa, spread a ladle of batter into a thin circle.",
            "Drizzle oil around the edges, cook until crisp, add masala and fold.",
        ],
    },
    {
        "name": "Butter Chicken",
        "cuisine": "Indian (North)",
        "meal_type": "Dinner",
        "is_veg": False,
        "time": "45 mins",
        "difficulty": "Medium",
        "description": "Rich and creamy tomato-based chicken curry finished with butter and cream.",
        "ingredients": [
            "chicken",
            "yogurt",
            "ginger garlic paste",
            "tomato",
            "cream",
            "butter",
            "onion",
            "garam masala",
            "chilli powder",
            "salt",
        ],
        "steps": [
            "Marinate chicken with yogurt, ginger-garlic paste, chilli powder, salt and keep for at least 30 minutes.",
            "Grill or pan-fry the marinated chicken pieces until almost cooked.",
            "In another pan, sauté onions in butter until golden.",
            "Add tomato puree, spices, and cook until the raw smell goes away.",
            "Add cream and a little water to adjust consistency.",
            "Add cooked chicken pieces, simmer for 10–15 minutes.",
            "Finish with more butter and fresh coriander.",
        ],
    },
    {
        "name": "Veg Fried Rice",
        "cuisine": "Chinese",
        "meal_type": "Lunch",
        "is_veg": True,
        "time": "25 mins",
        "difficulty": "Easy",
        "description": "Indo-Chinese style stir-fried rice with mixed vegetables and soy sauce.",
        "ingredients": [
            "rice",
            "carrot",
            "beans",
            "capsicum",
            "spring onion",
            "soy sauce",
            "vinegar",
            "pepper",
            "oil",
            "salt",
        ],
        "steps": [
            "Cook rice and let it cool completely so the grains stay separate.",
            "Chop all vegetables finely.",
            "Heat oil in a wok on high flame.",
            "Add vegetables and stir-fry for 2–3 minutes; keep them slightly crunchy.",
            "Add cooked rice, soy sauce, vinegar, pepper, and salt.",
            "Toss everything on high flame for 2–3 minutes.",
            "Garnish with spring onion greens and serve hot.",
        ],
    },
    {
        "name": "Margherita Pizza",
        "cuisine": "Italian",
        "meal_type": "Dinner",
        "is_veg": True,
        "time": "20 mins",
        "difficulty": "Easy",
        "description": "Classic thin-crust pizza topped with tomato sauce, mozzarella, and fresh basil.",
        "ingredients": [
            "pizza dough",
            "flour",
            "tomato sauce",
            "mozzarella cheese",
            "basil",
            "olive oil",
            "salt",
        ],
        "steps": [
            "Preheat oven to a high temperature (220–250°C / 430–480°F).",
            "Roll out the pizza dough on a floured surface.",
            "Spread a thin layer of tomato sauce on the base.",
            "Top with slices or shreds of mozzarella cheese.",
            "Bake until the crust is golden and cheese is melted and bubbly.",
            "Finish with fresh basil leaves and a drizzle of olive oil.",
        ],
    },
]


@app.get("/")
def root():
    return {"message": "Welcome to GAKA API 🍳"}


@app.get("/api/recipes/by-name")
def get_recipe_by_name(name: str = Query(...)):
    """
    Find recipe by full or partial name.
    If not found locally → return 404 so frontend can call AI.
    """
    target = name.strip().lower()

    for r in SAMPLE_RECIPES:
        if target in r["name"].lower():  # partial match allowed
            return {"recipe": r}

    raise HTTPException(status_code=404, detail="Recipe not found")



# ---------- Ingredient-based mode ----------

class IngredientRequest(BaseModel):
    ingredients: List[str]
    cuisine: Optional[str] = None
    meal_type: Optional[str] = None

@app.post("/api/recipes/from-ingredients")
def recipes_from_ingredients(payload: IngredientRequest):
    user_ings = [ing.strip().lower() for ing in payload.ingredients if ing.strip()]

    if not user_ings:
        return {"recipes": []}

    filtered = SAMPLE_RECIPES.copy()

    if payload.cuisine:
        c = payload.cuisine.lower()
        filtered = [r for r in filtered if c in r["cuisine"].lower()]

    if payload.meal_type:
        m = payload.meal_type.lower()
        filtered = [r for r in filtered if m in r["meal_type"].lower()]

    scored = []
    for r in filtered:
        recipe_ings = [i.lower() for i in r.get("ingredients", [])]
        score = sum(1 for ing in user_ings if ing in recipe_ings)
        if score > 0:
            scored.append((score, r))

    scored.sort(key=lambda x: x[0], reverse=True)
    result = [r for _, r in scored]

    # --------- AI FALLBACK ----------
    if len(result) == 0:
        ai_prompt = f"Create a recipe using only these ingredients: {', '.join(user_ings)}"
        
        ai_body = {
            "prompt": ai_prompt,
            "ingredients": user_ings
        }

        # Call your AI generator function
        ai_response = ai_recipe(AIRecipeRequest(**ai_body))
        return {"recipes": [ai_response["recipe"]]}

    return {"recipes": result}



# ---------- Single recipe by name (for details page) ----------
@app.get("/api/recipes/by-name")
def get_recipe_by_name(name: str = Query(...)):
    target = name.strip().lower()

    # First, look for recipe locally
    for r in SAMPLE_RECIPES:
        if r["name"].lower() == target:
            return {"recipe": r, "source": "local"}

    # AI fallback if not found
    if not GROQ_API_KEY:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not set.")

    ai_prompt = f"""
Create exactly ONE cooking recipe in valid JSON only.

User searched for: {name}

Format:
{{
  "name": "",
  "description": "",
  "ingredients": [],
  "steps": []
}}
"""

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }

    body = {
        "model": "llama3-8b-8192",
        "messages": [
            {"role": "system", "content": "You are a helpful cooking assistant."},
            {"role": "user", "content": ai_prompt}
        ],
        "max_tokens": 600,
        "temperature": 0.7,
    }

    try:
        resp = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            json=body,
            timeout=30,
        )
        resp.raise_for_status()

        data = resp.json()
        content = data["choices"][0]["message"]["content"]
        start = content.find("{")
        end = content.rfind("}") + 1
        recipe_obj = json.loads(content[start:end])

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI fallback failed: {e}")

    return {"recipe": recipe_obj, "source": "ai"}





# ---------- AI Recipe Generator (Groq) ----------

class AIRecipeRequest(BaseModel):
    prompt: Optional[str] = None
    ingredients: Optional[List[str]] = None

@app.post("/api/ai-recipe")
def ai_recipe(req: AIRecipeRequest):

    if not GROQ_API_KEY:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not set in the environment.")

    user_prompt_text = (req.prompt or "").strip()
    ingredients_text = ", ".join(req.ingredients or [])

    final_user_message = f"""
You are a cooking assistant. Return ONLY valid JSON.

Ingredients: {ingredients_text or "not provided"}
User Request: {user_prompt_text or "none"}

JSON format:

{{
  "name": "",
  "description": "",
  "ingredients": [],
  "steps": []
}}
"""

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }

    body = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {"role": "system", "content": "Return ONLY valid JSON."},
            {"role": "user", "content": final_user_message}
        ],
        "temperature": 0.7,
        "max_tokens": 600,
        "response_format": {"type": "json_object"}   # IMPORTANT
    }

    try:
        resp = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            json=body,
            timeout=30,
        )
        resp.raise_for_status()
        data = resp.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Error calling Groq API: {e}")

    # Groq returns JSON inside message["content"], NOT message["parsed"]
    try:
        content = data["choices"][0]["message"]["content"]
        recipe_obj = json.loads(content)  # Parse JSON directly
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI returned invalid JSON: {e}")

    return {"recipe": recipe_obj}
