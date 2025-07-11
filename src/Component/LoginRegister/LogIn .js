import { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { FaArrowRight } from "react-icons/fa";
import { doSignInWithEmailAndPassword } from "../../FirebaseConfig/Auth";
import { useAuth } from "../../Context/Authcontext";

function LogIn() {
  const { userLoggedIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location=useLocation()
  const redirectTo = location.state?.from || "/";
  useEffect(() => {
    if (userLoggedIn) {
      navigate(redirectTo);
    }
  }, [userLoggedIn,redirectTo, navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
      toast.success("Login successful", { autoClose: 1500 });
      navigate(redirectTo);
    } catch (error) {
      setErrorMessage(error.message);
      toast.error("Login failed: " + error.message, { autoClose: 2000 });
    } finally {
      setIsSigningIn(false);
    }
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h3 className="login-heading">Log In</h3>
        <label htmlFor="email" className="login-label">Email</label>
        <input
          type="email"
          className="login-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className="login-label">Password</label>
        <input
          type="password"
          className="login-input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button" disabled={isSigningIn}>
          {isSigningIn ? "Logging In..." : "Log In"}
        </button>
        <p style={{ color: "orange" }}>
          If you are not registered? <FaArrowRight />
          <Link to="/Register">Register</Link>
        </p>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </form>
      <ToastContainer />
    </div>
  );
}
export default LogIn;
