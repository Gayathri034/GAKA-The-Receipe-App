import React, { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const bgRef = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    const ctx = bg.getContext("2d");
    const emojis = ["🍎", "🥕", "🍇", "🍅", "🍓", "🥦", "🍉", "🍒", "🥑", "🍊"];
    const particles = [];
    const width = (bg.width = window.innerWidth);
    const height = (bg.height = window.innerHeight);

    // Create scrolling fruits and veggies
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

  return (
    <div className="app-container">
      <canvas ref={bgRef}></canvas>
      <div className="center-text">
        <h1>GAKA WORLD</h1>
        <p>🍳 Discover, Cook & Enjoy!</p>
      </div>
    </div>
  );
}

export default App;
