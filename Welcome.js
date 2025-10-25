import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const emojis = ["🍎", "🥕", "🍇", "🍅", "🍓", "🥦", "🍉", "🍒", "🥑", "🍊"];
    const particles = [];
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

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
    <div className="welcome-wrapper">
      <canvas ref={canvasRef}></canvas>
      <div className="welcome-content">
        <h1>Welcome to GAKA 🍳</h1>
        <p>Discover and share amazing recipes!</p>
        <button
          className="get-started-button"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Welcome;
