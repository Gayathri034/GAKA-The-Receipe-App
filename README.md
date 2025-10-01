# 🍳 GAKA – Great AI for Kitchen Adventures

**Turn what you have into what you love**

GAKA is your AI-powered kitchen companion that helps you:  
- **Discover recipes** based on ingredients you already have.  
- **Get step-by-step guidance** for any recipe you want to cook, with AI-generated videos.  
- **Select cuisines**: Indian (North & South), Chinese, Italian, Mexican, Japanese, Thai, Spanish.  
- **Filter by meal type**: Breakfast, Lunch, Dinner, Snacks, Sweets.  
- **Find juices and drinks** you can make from available ingredients.  
- **Follow multilingual instructions**: English, Hindi, Telugu (expandable to more languages).  

Whether you’re experimenting with ingredients, preparing daily meals, or exploring world cuisines, GAKA makes cooking **simple, fun, and shared across cultures**.

---

## 🚀 Tech Stack
- **Frontend**: Next.js + TailwindCSS  
- **Backend**: FastAPI (Python) + PostgreSQL + Redis  
- **AI**: LLM APIs for recipe generation, TTS for voice, FFmpeg/MoviePy for videos  
- **Hosting**: Vercel (frontend), Render/Cloud Run (backend), AWS S3 (videos)  

---

## 📌 Features

### **Dual Cooking Modes**
1. **Ingredient-Based Mode** – Enter available ingredients and get AI-generated recipes.  
2. **Recipe-Specific Mode** – Ask how to cook a recipe you already want, with step-by-step instructions and videos.  

### **Cuisine & Meal Type Selection**
- Global cuisines: Indian (North & South), Chinese, Italian, Mexican, Japanese, Thai, Spanish  
- Meal types: Breakfast, Lunch, Dinner, Snacks, Sweets  

### **Drinks/Juices**
- Suggest recipes for drinks or juices based on available ingredients.  

### **Multilingual Instructions**
- Cook in English, Hindi, or Telugu (expandable).  

### **AI-Powered Video Guides**
- Short video demonstrations for each recipe.  

---

## 📌 Complete Roadmap

### **Phase 1 – Setup & Skeleton (Days 1–3)**
1. ✅ Day 1: Setup repository + folder structure (`gaka-ui`, `gaka-api`, `gaka-infra`)  
2. Day 2: Setup **Next.js frontend skeleton**  
   - Homepage  
   - TailwindCSS styling  
   - Placeholder components for ingredient input, cuisine, meal type  
3. Day 3: Setup **FastAPI backend skeleton**  
   - API endpoints for recipes, cuisines, meal types, ingredients  

### **Phase 2 – Frontend & Backend Integration (Days 4–6)**
4. Day 4: Connect frontend ↔ backend via **API calls**  
5. Day 5: Add **state management** for ingredients, cuisine, meal type  
6. Day 6: Display **recipe suggestions dynamically**  

### **Phase 3 – Core AI Features (Days 7–12)**
7. Day 7: Integrate **LLM API** to generate recipes from ingredients  
8. Day 8: Implement **recipe-specific mode** (user asks how to cook a recipe)  
9. Day 9: Add **multilingual support**  
10. Day 10–11: Integrate **TTS for audio instructions**  
11. Day 12: Use **FFmpeg / MoviePy** to create **AI-generated short videos**  

### **Phase 4 – Advanced Features (Days 13–16)**
12. Add **cuisine filters** (Indian → North/South, Chinese, Italian, etc.)  
13. Add **meal type filters** (Breakfast, Lunch, Dinner, Snacks, Sweets)  
14. Add **juice / drinks suggestions**  
15. Implement **frontend UI updates** for new features  

### **Phase 5 – Deployment & Optimization (Days 17–20)**
16. Host **frontend** on Vercel  
17. Host **backend** on Render / Cloud Run  
18. Store videos on **AWS S3**  
19. Add **Redis caching** for faster responses  
20. Test full app with sample users / recipes  

### **Phase 6 – Future Enhancements**
- Add more languages for recipe guidance  
- User accounts / favorite recipes  
- Nutrition info / calorie calculator  
- Shopping list generation from selected recipes  
- Mobile-friendly design / Android & iOS app  

---

## 👨‍💻 Author
Project by **<JahnaviLakshmisetti>**

---

### ✅ Why GAKA is Unique
- Combines **ingredient-based discovery** and **recipe-guided mode**.  
- Supports **global cuisines** with **Indian subcategories (North/South)**.  
- Offers **meal type & drinks filtering**, uncommon in typical recipe apps.  
- Provides **multilingual instructions + AI-generated video guidance**.  
- Perfect for **portfolio/resume**: demonstrates full-stack development, AI integration, and user-friendly design.
