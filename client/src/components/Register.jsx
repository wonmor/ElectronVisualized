import { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const isValidEmail = (email) => {
    // You can use any email validation regex you prefer
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const isValidPassword = (password) => {
    // This is a basic password validation, you can update it to include more rules
    return password.length >= 8;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email.trim())) {
      setError("Invalid email address");
      return;
    }
    if (!isValidPassword(password)) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await firebase.auth().createUserWithEmailAndPassword(email.trim(), password);
      navigate("/membership");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      navigate("/membership");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-gray-700 pb-5 overflow-auto" style={{ minHeight: "100vh", width: "-webkit-fill-available" }}>
      <div className="text-center pt-10 pl-5 pr-5 text-gray-400">
        <h1 className="sm:pb-5 scale-75 sm:scale-100">
          <span className="text-white">{"Sign Up"}</span>
        </h1>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block mt-4 lg:inline-block lg:mt-0 mr-4 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block mt-4 lg:inline-block lg:mt-0 mr-4 text-white"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block mt-4 lg:inline-block lg:mt-0 mr-4 text-white"
          />
          <button type="submit" className="block mt-4 lg:inline-block lg:mt-0 mr-4 text-white">
            Sign Up
          </button>
        </form>
        <button onClick={handleGoogleSignUp} className="block mt-4 lg:inline-block lg:mt-0 mr-4 text-white">
          Sign Up with Google
        </button>
        {error && <p className="text-red-200">{error}</p>}
        </div>
    </div>
  );
}