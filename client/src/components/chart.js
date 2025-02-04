import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    plugins,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Plugin to display total in the center of the Doughnut chart
const doughnutCenterText = {
    id: "doughnutCenterText",
    beforeDraw(chart) {
        const { width } = chart;
        const { ctx } = chart;
        const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);

        ctx.save();
        ctx.font = "bold 18px Arial";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`Total: ${total}`, width / 2, chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2);
        ctx.restore();
    },
};

function PetitionVisualization() {
    const [petitions, setPetitions] = useState([]);
    const [statusData, setStatusData] = useState({});
    const [signaturesData, setSignaturesData] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch petitions data
    const fetchPetitions = async () => {
        try {
            const response = await axios.get("/petitions"); // Replace with your actual API endpoint
            setPetitions(response.data);
        } catch (error) {
            alert("Error: Data is not fetched", error);
        } finally {
            setLoading(false);
        }
    };

    // Process data for visualization
    useEffect(() => {
        fetchPetitions();
    }, []);

    useEffect(() => {
        if (petitions.length > 0) {
            // Transform data for status distribution
            const statusCount = petitions.reduce((acc, petition) => {
                acc[petition.status] = (acc[petition.status] || 0) + 1;
                return acc;
            }, {});

            // Transform data for signatures distribution
            const petitionLabels = petitions.map((petition) => petition.title);
            const petitionSignatures = petitions.map((petition) => petition.signatures);

            setStatusData({
                labels: Object.keys(statusCount),
                datasets: [
                    {
                        data: Object.values(statusCount),
                        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                        borderWidth: 1,
                    },
                ],
            });

            setSignaturesData({
                labels: petitionLabels,
                datasets: [
                    {
                        label: "Signatures",
                        data: petitionSignatures,
                        backgroundColor: "#36A2EB",
                    },
                ],
            });
        }
    }, [petitions]);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Petition Data Visualization</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Petition Status Distribution</h5>
                                {statusData.labels ? (
                                    <Doughnut
                                        data={statusData}
                                        plugins={[doughnutCenterText]} // Add center text plugin
                                        options={{
                                            plugins: {
                                                tooltip: {
                                                    callbacks: {
                                                        label: function (tooltipItem) {
                                                            const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                                                            const value = tooltipItem.raw;
                                                            const percentage = ((value / total) * 100).toFixed(2);
                                                            return `${tooltipItem.label}: ${value} (${percentage}%)`;
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                ) : (
                                    <p>No data available</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Signatures Per Petition</h5>
                                {signaturesData.labels ? <Bar data={signaturesData} /> : <p>No data available</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PetitionVisualization;
