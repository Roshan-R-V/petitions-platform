// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from "../api";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Dashboard.css'; // Custom CSS for the color palette and additional styling

const Dashboard = () => {
    const [petitions, setPetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch petitions from the backend
    const fetchPetitions = async () => {
        try {
            const response = await api.get('/petitions');
            setPetitions(response.data); // Adjust according to your API's response structure
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch petitions');
            setLoading(false);
        }
    };

    // Load petitions when the component mounts
    useEffect(() => {
        fetchPetitions();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="container py-5">
                <h1 className="text-center dashboard-title" id={'heading'}>Open Dashboard</h1>
                {loading && <div className="text-center"><div className="spinner-border text-primary" role="status"></div></div>}
                {error && <div className="alert alert-danger text-center">{error}</div>}
                {!loading && !error && (
                    <div className="table-responsive">
                        <table className="table table-hover table-striped">
                            <thead className="dashboard-table-header">
                            <tr>
                                {/*<th>ID</th>*/}
                                <th>Status</th>
                                <th>Title</th>
                                <th>Context</th>
                                <th>Petitioner</th>
                                <th>Signatures</th>
                                <th>Response</th>
                            </tr>
                            </thead>
                            <tbody>
                            {petitions.length > 0 ? (
                                petitions.map((petition) => (
                                    <tr key={petition.petitionid}>
                                        {/*<td>{petition.petitionid}</td>*/}
                                        <td>
                                                <span id={'button'} className={`badge ${petition.status === 'open' ? 'bg-primary' : 'bg-secondary'}`}>
                                                    {petition.status}
                                                </span>
                                        </td>
                                        <td>{petition.title}</td>
                                        <td>{petition.content}</td>
                                        <td>{petition.bioId.email}</td>
                                        <td>{petition.signatures}</td>
                                        <td>{petition.response || 'No response yet'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">No petitions available</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
