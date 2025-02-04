import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(credentials);
            const response = await api.post('/users/login', credentials);

            const { token, bioId, name, email: userEmail } = response.data;

            // Store token and user details in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('bioId', bioId);
            localStorage.setItem('email', userEmail);
            if (userEmail === 'admin@petitions.parliment.sr') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Invalid credentials, please try again.');
        }
    };

    return (
        <div className="container-fluid mt=5 mx-0-0 w-50">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Login to SLPP</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="btn btn-primary w-100" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Login;
