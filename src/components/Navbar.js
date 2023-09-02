import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-primary">
        <div className="container-fluid">
          <Link
            className="navbar-brand fs-2 fst-italic "
            style={{ fontFamily: "'Righteous', cursive" }}
            to="/"
          >
            QuickFood
          </Link>
          <button
            className="navbar-toggler jd"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link fs-5 mb-2" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <>
                  <Link
                    className="nav-link fs-5 mb-2"
                    aria-current="page"
                    to="/"
                  >
                    My Orders
                  </Link>
                </>
              ) : (
                ""
              )}
            </ul>
            <div className="d-flex">
              {!localStorage.getItem("authToken") ? (
                <>
                  <Link className="btn bg-white  mx-1" to="/login">
                    Login
                  </Link>
                  <Link className="btn bg-white mx-1 " to="/signup">
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="btn bg-white mx-1 text-weight-bold"
                    to="/cart"
                  >
                    My Cart
                  </Link>
                  <Link
                    className="btn btn-danger mx-1 text-weight-bold"
                    to="/"
                    onClick={handleLogout}
                  >
                    LogOut
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
