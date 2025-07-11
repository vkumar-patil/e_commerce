import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { FaArrowRight } from "react-icons/fa";
import { doCreateUserWithEmailAndPassword } from "../../FirebaseConfig/Auth";
import { useAuth } from "../../Context/Authcontext";
function Registerpage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  useEffect(() => {
    if (userLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [userLoggedIn, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
      alert("Registration successful");
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
      alert("Registration failed: " + error.message);
    } finally {
      setIsRegistering(false);
    }
  };
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-heading">Register</h2>

        <label className="register-label">Email</label>
        <input
          type="email"
          className="register-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="register-label">Password</label>
        <input
          type="password"
          className="register-input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="register-button" disabled={isRegistering}>
          {isRegistering ? "Registering..." : "Submit"}
        </button>
        <p style={{ color: "orange" }}>
          Already registered? <FaArrowRight />
          <Link to="/login">Log in</Link>
        </p>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </form>
    </div>
  );
}
export default Registerpage;
