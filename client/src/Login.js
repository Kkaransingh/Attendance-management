import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./Login.css";

const Login = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpActive, setIsSignUpActive] = useState(true);
  const [error, setError] = useState("");

  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
    setError(""); // Clear error when switching modes
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
      setError(""); // Clear error on success
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
      setError(""); // Clear error on success
    } catch (error) {
      setError(error.message);
    }
  };

  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="login-page__container">
      <section className="login-page">
        <form className="login-page__form">
          {isSignUpActive && <legend className="login-page__legend">Sign Up</legend>}
          {!isSignUpActive && <legend className="login-page__legend">Sign In</legend>}

          <fieldset className="login-page__fieldset">
            <ul className="login-page__list">
              <li className="login-page__item">
                <label htmlFor="email" className="login-page__label">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-page__input"
                />
              </li>
              <li className="login-page__item">
                <label htmlFor="password" className="login-page__label">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-page__input"
                />
              </li>
            </ul>
            {error && <p className="error-message">{error}</p>}
            {isSignUpActive && (
              <button type="button" onClick={handleSignUp} className="login-page__button">
                Sign Up
              </button>
            )}
            {!isSignUpActive && (
              <button type="button" onClick={handleSignIn} className="login-page__button">
                Sign In
              </button>
            )}
          </fieldset>
          <a onClick={handleMethodChange} className="login-page__link">
            {isSignUpActive ? "Login" : "Create an account"}
          </a>
        </form>
      </section>
    </div>
  );
};

export default Login;
