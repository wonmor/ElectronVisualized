import { useState } from "react";
import { useNavigate } from "react-router-dom";

import firebase from "firebase/compat/app";

import "firebase/compat/auth";

export default function SignUp() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const isValidPassword = (password) => {
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
      const result = await firebase.auth().createUserWithEmailAndPassword(email.trim(), password);
      await result.user.updateProfile({
        displayName: displayName.trim(),
      });
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
    <div className="pb-5 overflow-auto" style={{ minHeight: "100vh", width: "-webkit-fill-available" }}>
      <div className="text-center pt-10 pl-5 pr-5 text-gray-400">
      <h1 className="sm:pb-5 scale-75 sm:scale-100">
        <span className="text-white font-thin">{"Sign up"}</span>
      </h1>

      <h3>or <button onClick={() => {
        navigate("/login");
      }}><span className="text-blue-200 hover:underline">{"Sign in"}</span></button>.</h3>

        <div className="mx-auto" style={{ maxWidth: "400px" }}>
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="block w-full py-2 px-4 mt-4 text-white bg-gray-700 rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full py-2 px-4 mt-4 text-white bg-gray-700 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full py-2 px-4 mt-4 text-white bg-gray-700 rounded-md"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full py-2 px-4 mt-4 text-white bg-gray-700 rounded-md"
            />
            <button type="submit" className="block w-full py-2 px-4 mt-4 text-white bg-sky-800 rounded-md">
              <span>
                Sign up
              </span>
            </button>
          </form>
          <button onClick={handleGoogleSignUp} className="block w-full py-2 px-4 mt-4 text-white bg-orange-800 rounded-md">
            <span>
              Sign up with Google
            </span>
          </button>
          {error && <p className="mt-5 text-red-200">{`${error}.`}</p>}
        </div>

        <div className="max-w-lg m-auto pt-5">
                  <span className="text-center text-gray-400">
                  Enjoy the Pro membership benefits<br />with unlimited access to all content.
                  </span>
              </div>
      </div>
    </div>
  );
}