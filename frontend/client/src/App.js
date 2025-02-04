import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './Dashboard/Dashboard';
import PetitionerDashboard from './Dashboard/PetitionerDashboard';
import AdminDashboard from './Dashboard/AdminDashboard';
import Navbar from './components/Navbar';
import ProtectedRoute from "./Security/ProtectedRoute";
import CreatePetition from "./components/createPetitions";
import Chart from './components/chart'

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/register" element={<Registration />}/>
                    <Route path="/login" element={<Login />}/>
                    {/*<Route path="/dashboard" element={<PetitionerDashboard />}/>*/}
                    {/*<Route path="/admin" element={<AdminDashboard />}/>*/}
                    <Route path="/dashboard" element={<ProtectedRoute><PetitionerDashboard /></ProtectedRoute>} />
                    <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                    <Route path="/createPetition" element={<ProtectedRoute><CreatePetition /></ProtectedRoute>} />
                    <Route path="/chart" element={<Chart />}/>
                    {/* Default route or fallback */}
                    <Route path="*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
