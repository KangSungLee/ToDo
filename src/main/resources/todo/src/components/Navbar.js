import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/authUtils'; // logout 함수 추가

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  const handleLogout = () => {
    logout(); 
    setIsAuthenticated(false);
    navigate('/login'); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">🏠 홈</Link>
              </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">👤 프로필</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>🚪 로그아웃</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">🔑 로그인</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
