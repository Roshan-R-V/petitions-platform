import React, { useState } from 'react';
import api from '../api';
import {useNavigate} from "react-router-dom";
import '../App.css'

function Registration() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        password: '',
        bioId: '',
        dob: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/register', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('API Response:', response);
            alert('Registration Successful: ' + response.data);
            navigate('/login')
        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error.response.data);
        }
    };

    return (
        <div className="container mt-5 my-auto w-50">
            <h2 className="text-center">Register as a Petitioner</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
                <div className="mb-3">
                    <input className="form-control" type="email" name="email" placeholder="Email"
                           onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <input className="form-control" type="text" name="fullName" placeholder="Full Name"
                           onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <input className="form-control" type="date" name="dob" onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <input className="form-control" type="password" name="password" placeholder="Password"
                           onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <input className="form-control" type="text" name="bioId" placeholder="BioID" onChange={handleChange}
                           required/>
                </div>
                <button className="btn btn-primary w-100" type="submit">Register</button>
            </form>
        </div>
    );
}

export default Registration;