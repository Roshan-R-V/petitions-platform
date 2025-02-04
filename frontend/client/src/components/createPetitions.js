import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function CreatePetition() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const bioId = localStorage.getItem("bioId")
    const navigate = useNavigate();

    const handleCreatePetition = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/petitions/create/${bioId}`, { title, content});
            alert('Petition created successfully!');
            navigate('/petitionDashboard'); // Redirect back to dashboard
        } catch (error) {
            console.error(error);
            alert('Error creating petition');
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4">
                <h2 className=" mb-4" id={'heading'}>Create New Petition</h2>
                <form onSubmit={handleCreatePetition}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            <strong>Title</strong>
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">
                            <strong>Content</strong>
                        </label>
                        <textarea
                            id="content"
                            className="form-control"
                            rows="5"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" id="button" className="btn w-100">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreatePetition;
