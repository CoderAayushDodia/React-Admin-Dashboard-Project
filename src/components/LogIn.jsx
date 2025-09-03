import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [language, setLanguage] = useState("mr");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const texts = {
    en: {
      title: "Shramjeevi Sanghatna (Maharashtra)",
      loginTitle: "Log in to Your Account",
      welcome: "Welcome back! Please enter your details.",
      username: "User Name",
      usernamePlaceholder: "Mobile Number or Email Address",
      password: "Password",
      loginBtn: "Log In",
      selectLang: "Select Language",
      eng: "Eng",
      marathi: "मराठी",
    },
    mr: {
      title: "श्रमजीवी संघटना (महाराष्ट्र)",
      loginTitle: "तुमच्या खात्यात लॉगिन करा",
      welcome: "पुन्हा स्वागत आहे! कृपया आपली माहिती भरा.",
      username: "वापरकर्त्याचे नाव",
      usernamePlaceholder: "मोबाईल नंबर किंवा ईमेल पत्ता",
      password: "पासवर्ड",
      loginBtn: "लॉगिन",
      selectLang: "भाषा निवडा",
      eng: "Eng",
      marathi: "मराठी",
    },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // const response = await fetch(
      //   "shramjivi-backend.onrender.com/api/auth/login/",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Accept": "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       phone,
      //       password,
      //     }),
      //   }
      // );

      const response = await fetch(
        "https://shramjivi-backend.onrender.com/api/auth/login/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            password,
          }),
        }
      );
      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.user_id);

      console.log("Login successful:", data);

      localStorage.setItem("token", data.access || data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img src="/image 5.png" alt="Logo" />

      <div className="title-text">
        <h1 className="mb-4">श्रमजीवी संघटना (महाराष्ट्र)</h1>
        <h2 className="mb-2">{texts[language].loginTitle}</h2>
        <p>{texts[language].welcome}</p>
      </div>

      <form action="/" className="form-group mt-4 mb-3" onSubmit={handleLogin}>
        <label htmlFor="username mb-2">{texts[language].username}</label>
        <input
          type="text"
          id="username"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={texts[language].usernamePlaceholder}
          className="mb-3"
          required
        />

        <label htmlFor="password" className="mb-2">
          {texts[language].password}
        </label>
        <input
          type="password"
          className="mb-3"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          required
        />

        {error && <div className="error-text text-danger mb-2">{error}</div>}

        <div className="d-flex justify-content-between align-items-center language">
          <div>
            <span>{texts[language].selectLang}</span>
          </div>
          <div className="language-switch rounded-5 d-flex gap-1 shadow-sm">
            <button
              type="button"
              className={`lang-btn ${language === "en" ? "active" : ""}`}
              onClick={() => setLanguage("en")}
            >
              {texts[language].eng}
            </button>
            <button
              type="button"
              className={`lang-btn ${language === "mr" ? "active" : ""}`}
              onClick={() => setLanguage("mr")}
            >
              {texts[language].marathi}
            </button>
          </div>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging In..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

export default LogIn;
