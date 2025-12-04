import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const bgRef = useRef(null);

  const handleSignup = (e) => {
    e.preventDefault();
    // later: send data to backend API
    navigate("/recipes");
  };

  // 🍉 Same falling fruits background
  useEffect(() => {
    const canvas = bgRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const emojis = ["🍎", "🥕", "🍇", "🍅", "🍓", "🥦", "🍉", "🍒", "🥑", "🍊"];

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * width,
        y: Math.random() * height,
        size: 25 + Math.random() * 15,
        speed: 0.3 + Math.random() * 0.5,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

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

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // --- styles (same as login) ---
  const pageStyle = {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#000000",
  };

  const canvasStyle = {
    position: "absolute",
    inset: 0,
  };

  const overlayStyle = {
    position: "relative",
    zIndex: 1,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "rgba(0,0,0,0.75)",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    backdropFilter: "blur(6px)",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "24px",
  };

  const highlightStyle = {
    color: "#22c55e",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "4px",
    display: "block",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #4b5563",
    outline: "none",
    fontSize: "14px",
    backgroundColor: "rgba(15,23,42,0.8)",
    color: "white",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px 0",
    borderRadius: "9999px",
    border: "none",
    background:
      "linear-gradient(to right, #22c55e, #16a34a)", // green gradient
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  };

  const linkTextStyle = {
    color: "#22c55e",
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      <canvas ref={bgRef} style={canvasStyle} />

      <div style={overlayStyle}>
        <div style={cardStyle}>
          <h2 style={titleStyle}>
            Create your <span style={highlightStyle}>GAKA account 🍳</span>
          </h2>

          <form onSubmit={handleSignup} style={{ display: "grid", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                style={inputStyle}
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                style={inputStyle}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                style={inputStyle}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" style={buttonStyle}>
              Create Account
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              marginTop: "16px",
            }}
          >
            Already have an account?{" "}
            <span style={linkTextStyle} onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
