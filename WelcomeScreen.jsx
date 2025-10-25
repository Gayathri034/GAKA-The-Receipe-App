import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomeScreen.css";

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const emojis = ["🍎","🍌","🥕","🍇","🥦","🍉","🍓","🍋","🍊","🍒","🌽","🍍"];
    const tempParticles = [];
    for (let i = 0; i < 50; i++) {
      tempParticles.push({
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100,
        size: 25 + Math.random() * 25,
        duration: 4 + Math.random() * 6
      });
    }
    setParticles(tempParticles);
  }, []);

  return (
    <div className="welcome-container">
      {particles.map((p, idx) => (
        <span
          key={idx}
          className="emoji"
          style={{
            left: `${p.left}vw`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`
          }}
        >
          {p.emoji}
        </span>
      ))}
      <div className="content">
        <h1>👨‍🍳 WELCOME TO GAKA WORLD 🍳</h1>
        <button
          className="get-started-btn"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
