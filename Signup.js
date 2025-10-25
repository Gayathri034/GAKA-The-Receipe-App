import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const bgRef = useRef(null);
  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  // here you could call your backend API later
  navigate("/home"); // redirect after login/signup
};


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
  }, []);

  return (
    <div className="auth-wrapper">
      <canvas ref={bgRef}></canvas>
      <div className="auth-container">
        <h1 className="auth-title rainbow-text">SIGN UP FOR GAKA 🥦</h1>
        <form className="auth-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="rainbow-button">
            Create Account
          </button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
