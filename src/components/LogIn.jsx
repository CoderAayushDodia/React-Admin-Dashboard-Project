import React, { useState } from "react";

function LogIn() {
  const [language, setLanguage] = useState("mr");

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

  return (
    // <div className="login-wrapper">
      <div className="login-container">
        <img src="/image 5.png" alt="Logo" />

        <div className="title-text">
          <h1 className="mb-4">श्रमजीवी संघटना (महाराष्ट्र)</h1>
          <h2 className="mb-2">{texts[language].loginTitle}</h2>
          <p>{texts[language].welcome}</p>
        </div>

        <form action="/" className="form-group mt-4 mb-3">
          <label htmlFor="username mb-2">{texts[language].username}</label>
          <input
            type="text"
            id="username"
            placeholder={texts[language].usernamePlaceholder}
            className="mb-3"
          />

          <label htmlFor="password" className="mb-2">
            {texts[language].password}
          </label>
          <input type="password" id="password" placeholder="********" />
        </form>

        <div className="d-flex justify-content-between align-items-center language">
          <div>
            <span>{texts[language].selectLang}</span>
          </div>
          <div className="language-switch rounded-5 d-flex gap-1 shadow-sm">
            <button
              className={`lang-btn ${language === "en" ? "active" : ""}`}
              onClick={() => setLanguage("en")}
            >
              {texts[language].eng}
            </button>
            <button
              className={`lang-btn ${language === "mr" ? "active" : ""}`}
              onClick={() => setLanguage("mr")}
            >
              {texts[language].marathi}
            </button>
          </div>
        </div>

        <button className="login-btn">Log In</button>
      </div>
    // </div>
  );
}

export default LogIn;
