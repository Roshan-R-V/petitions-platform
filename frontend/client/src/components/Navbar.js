import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">

                <Link className="navbar-brand" to="/">
                    Shangri-La Petition Platform
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        {token ? (
                            <>
                                {email === 'admin@petitions.parliment.sr' ? (
                                    <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/chart">
                                            Analyze
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin">
                                            Petitions
                                        </Link>
                                    </li>
                                    </>
                                ) : (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/dashboard">
                                            Sign Petitions
                                        </Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-light nav-link"
                                        style={{ border: 'none' }}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
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

export default Navbar;
