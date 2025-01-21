import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";
import User from "./pages/User";
import Recipe from "./pages/Recipe/Recipe";
import Category from "./pages/Category/Category";
import Review from "./pages/Review/Review";
import CreateRecipe from "./pages/Recipe/CreateRecipe";
import CreateCategory from "./pages/Category/CreateCategory";
import UpdateCategory from "./pages/Category/UpdateCategory";
import UpdateRecipe from "./pages/Recipe/UpdateRecipe";
import CreateReview from "./pages/Review/CreateReview";
import UpdateReview from "./pages/Review/UpdateReview";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

 
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
     
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              RecipeApp
            </Link>
            <button
              className="navbar-toggler"
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
              <ul className="navbar-nav">
                {isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/recipe">
                        Recipes
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/categories">
                        Categories
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/review">
                        Reviews
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button
                        className="btn btn-link nav-link"
                        onClick={() => {
                         
                          Cookies.remove("token");
                          setIsLoggedIn(false); 
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

     
        {error && <div className="alert alert-danger">{error}</div>}

       
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/recipe" /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<User isLogin={true} />} />
          <Route path="/register" element={<User isLogin={false} />} />
          <Route
            path="/recipe"
            element={isLoggedIn ? <Recipe /> : <Navigate to="/login" />}
          />
          <Route
            path="/categories"
            element={isLoggedIn ? <Category /> : <Navigate to="/login" />}
          />
          <Route
            path="/review"
            element={isLoggedIn ? <Review /> : <Navigate to="/login" />}
          />
          <Route
            path="/recipe/create"
            element={isLoggedIn ? <CreateRecipe /> : <Navigate to="/login" />}
          />
          <Route
            path="/review/create"
            element={isLoggedIn ? <CreateReview /> : <Navigate to="/login" />}
          />
          <Route
            path="/categories/create"
            element={isLoggedIn ? <CreateCategory /> : <Navigate to="/login" />}
          />
          <Route
            path="/categories/update/:id"
            element={isLoggedIn ? <UpdateCategory /> : <Navigate to="/login" />}
          />
          <Route
            path="/recipe/update/:id"
            element={isLoggedIn ? <UpdateRecipe /> : <Navigate to="/login" />}
          />
          <Route
            path="/review/update/:id"
            element={isLoggedIn ? <UpdateReview /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
