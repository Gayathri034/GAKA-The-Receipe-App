
import React, { useEffect } from "react";
import "./WelcomeScreen.css";

export default function WelcomeScreen() {
  useEffect(() => {
    const emojis = ["🍎","🍌","🥕","🍇","🥦","🍉","🍓","🍋","🍊","🍒","🌽","🍍"];
    for (let i = 0; i < 40; i++) {
      const span = document.createElement("span");
      span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      span.classList.add("emoji");
      span.style.left = Math.random() * 100 + "vw";
      span.style.animationDuration = 4 + Math.random() * 4 + "s";
      document.body.appendChild(span);
    }
  }, []);

  return (
    <div className="welcome-container">
      <h1>👨‍🍳 WELCOME TO GAKA WORLD 🍳</h1>
    </div>
  );
}
