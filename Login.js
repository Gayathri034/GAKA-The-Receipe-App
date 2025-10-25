import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // make sure path is correct

function Login() {
  const navigate = useNavigate();
  const bgRef = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    const ctx = bg.getContext("2d");
    const emojis = ["🍎", "🥕", "🍇", "🍅", "🍓", "🥦", "🍉", "🍒", "🥑", "🍊"];
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

    // Optional: handle window resize
    const handleResize = () => {
      bg.width = window.innerWidth;
      bg.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/"); // redirect to home or dashboard
  };

  return (
    <div className="auth-wrapper">
      <canvas ref={bgRef}></canvas>
      <div className="auth-container">
        <h1 className="auth-title rainbow-text">Login to GAKA</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="rainbow-button">Login</button>
        </form>
        <p className="redirect-text">
          Don’t have an account?{" "}
          <span className="link-text" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

