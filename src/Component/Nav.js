import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../assets/logo.jpg";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../Context/Authcontext";
import { doSignOut } from "../FirebaseConfig/Auth";
import "./Nav.css"
function Nav({ searchProduct, setSearchProduct,cart }) {
 const cartlength = cart ? cart.length : 0;

  const [isOpen, setIsOpen] = useState(false); 
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth(); 

  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    doSignOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img
        src={logo}
        alt="Logo"
        style={{ height: "30px", borderRadius: "10px" }}
      />
    </Link>

    <button
      className="navbar-toggler"
      type="button"
      onClick={toggleNavbar}
      aria-expanded={isOpen ? "true" : "false"}
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div
  className={`collapse navbar-collapse ${isOpen ? "show mobile-menu-open" : ""}`}
  id="navbarNav"
>
      <ul className="navbar-nav me-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            Home 
          </Link>
        </li>
      </ul>
       
      <ul className="navbar-nav ms-auto align-items-center gap-3">
        <li className="nav-item">
<form className="d-flex me-auto ms-3" onSubmit={(e) => e.preventDefault()}>
    <input
      type="search"
      className="form-control"
      placeholder="Search products..."
      value={searchProduct}
      onChange={(e) => setSearchProduct(e.target.value)}
      style={{ width: "250px" }}
    />
  </form>
        </li>
        <li className="nav-item position-relative">
  <Link to="/Cart" className="nav-link position-relative" style={{ fontSize: "1.8rem" }}>
    <span className="position-relative">
      <MdOutlineShoppingCart />
      <span className="cart-badge">{cartlength}</span>
    </span>
  </Link>
</li>
        {userLoggedIn ? (
          <>
            <li className="nav-item d-flex align-items-center">
              <span className="nav-link">
                <CgProfile style={{ fontSize: "1.5rem", color: "green" }} />{" "}
                {userLoggedIn.email}
              </span>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger" style={{ width: "auto" }} onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <button className="btn btn-primary" onClick={handleLogin}>
                Log In
              </button>
            </li>
            <li className="nav-item">
              <Link to="/register">
                <button className="btn btn-success">Register</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>

  );
}

export default Nav;


