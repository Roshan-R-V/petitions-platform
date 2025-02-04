import React, { useEffect, useState } from 'react';
import api from '../api';
import '../css/AdminDashboard.css'
import '../App.css'

function AdminDashboard() {
    const [petitions, setPetitions] = useState([]);
    const [threshold, setThreshold] = useState(0);
    const [filteredPetitions, setFilteredPetitions] = useState([]);
    const [response, setResponse] = useState("");
    const [selectedPetition, setSelectedPetition] = useState(null);

    useEffect(() => {
        fetchPetitions();
    }, []);

    const fetchPetitions = async () => {
        try {
            const res = await api.get('/petitions');
            setPetitions(res.data);

        } catch (error) {
            alert('Error fetching petitions');
        }
    };

    useEffect(() => {
        const result = petitions.filter(p => p.signatures > threshold);
        setFilteredPetitions(result);
    }, [threshold, petitions]);

    const submitResponse = (petitionId) => {
        api.post(`/petitions/${petitionId}/respond`, { response })
            .then(() => {
                // Update local state
                setPetitions(petitions.map(p =>
                    p.petitionId === petitionId
                        ? { ...p, status: "CLOSED", response }
                        : p
                ));
                setResponse("");
                setSelectedPetition(null);
            })
            .catch(err => console.error(err));
    };

    const scroll_up = () => {
        window.scrollTo(0, 0)
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Admin Dashboard</h1>
            <div className="card p-3 mb-4">
                <label htmlFor="threshold" className="form-label">
                    Set Signature Threshold:
                </label>
                <input
                    id="threshold"
                    className="form-control"
                    type="number"
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                />
            </div>
            <h2 className="mb-3">Petitions Exceeding Threshold</h2>
            <div className="row">
                {filteredPetitions.map((petition) => (
                    <div key={petition.petitionId} className="col-md-4 mb-4">
                        <div className="card p-3">
                            <h5>{petition.title}</h5>
                            <p>{petition.content}</p>
                            <p>
                                <strong>Signatures:</strong> {petition.signatures}
                            </p>
                            {petition.status === 'open' ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setSelectedPetition(petition)}
                                >
                                    Respond
                                </button>
                            ) : (
                                <span className="badge bg-secondary">
                                    {petition.status}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;
