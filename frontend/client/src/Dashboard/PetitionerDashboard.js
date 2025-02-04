import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import api from '../api';
import '../App.css'

function PetitionerDashboard() {
    const [petitions, setPetitions] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate for routing
    const bioId = localStorage.getItem('bioId')

    useEffect(() => {
        fetchPetitions();
    }, []);

    const fetchPetitions = async () => {
        try {
            const response = await api.get('/petitions' );
            setPetitions(response.data);
            console.log(response.data);
        } catch (error) {
            alert('Error fetching petitions');
        }
    };

    const signPetition = async (petitionId) => {
        if (!petitionId) {
            console.log(petitionId);
            alert('Petition ID is undefined');
            return;
        }
        try {
            console.log(bioId);
            await api.post(`/petitions/${petitionId}/sign`, bioId);
            alert('Petition signed successfully!');
            fetchPetitions();
        } catch (error) {
            console.log(error);
            alert('Error signing petition or already signed.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text" id ='heading'>Petitioner Dashboard</h2>
                <button
                    className="btn btn-primary" id ='button'
                    onClick={() => navigate('/createPetition')}
                >
                    Create New Petition
                </button>
            </div>
            <ul className="list-group">
                {petitions.map((petition) => (
                    <li key={petition.petitionId} className="list-group-item mb-3 shadow-sm">
                        <h5 className="text-dark">{petition.title}</h5>
                        <p className="text-secondary">{petition.content}</p>
                        <p><strong>Status:</strong> {petition.status}</p>
                        <p><strong>Signatures:</strong> {petition.signatures}</p>
                        <p><strong>Response:</strong> {petition.response}</p>
                        {petition.status === 'open' && (
                            <button
                                className="btn btn-success"
                                onClick={() => signPetition(petition.petitionId)}
                            >
                                Sign Petition
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PetitionerDashboard;
