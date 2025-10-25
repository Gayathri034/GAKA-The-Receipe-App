import React, { useRef, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

// HomePage component for the welcome screen
function HomePage() {
  const bgRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const bg = bgRef.current;
    const ctx = bg.getContext("2d");
    const emojis = ["🍎","🥕","🍇","🍅","🍓","🥦","🍉","🍒","🥑","🍊"];
    const particles = [];
    const width = (bg.width = window.innerWidth);
    const height = (bg.height = window.innerHeight);

    for (let i = 0; i < 80; i++) {
      particles.push({
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * width,
        y: Math.random() * height,
        size: 25 + Math.random() * 15,
        speed: 0.3 + Math.random() * 0.5,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y += p.speed;
        if (p.y > height + 40) {
          p.y = -40;
          p.x = Math.random() * width;
        }
        ctx.font = `${p.size}px serif`;
        ctx.fillText(p.emoji, p.x, p.y);
      });
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="app-container">
      <canvas ref={bgRef}></canvas>
      <div className="center-text">
        <h1> GAKA WORLD </h1>
        <p>🍳 Discover, Cook & Enjoy!</p>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
