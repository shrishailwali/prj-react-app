import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validUsers } from "../data/users";
import "./Login.css";

function Login() {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const id = userId.trim().toUpperCase();

    if (validUsers.includes(id)) {
      localStorage.setItem("userId", id);
      navigate("/dashboard");
    } else {
      setError("Invalid Employee ID");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="logo">�</div>

        <h1></h1>

        <p className="subtitle">
          Document Upload Portal
        </p>

        <input
          type="text"
          placeholder="E-ID"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
            setError("");
          }}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={handleLogin}>
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;