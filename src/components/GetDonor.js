import React, { useState } from "react";
import axios from "axios";

const GetDonor = () => {
    const [donorID, setDonorID] = useState("");
    const [donorInfo, setDonorInfo] = useState(null);
    const [message, setMessage] = useState("");

    const handleFetchDonorInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/donate/donor-info/${donorID}`);
            setDonorInfo(response.data);
            setMessage("");
        } catch (error) {
            console.error(error);
            setMessage("Error fetching donor information");
            setDonorInfo(null);
        }
    };

    return (
        <div>
            <h1>Fetch Donor Information by Donor ID</h1>
            <input
                type="text"
                placeholder="Enter Donor ID"
                value={donorID}
                onChange={(e) => setDonorID(e.target.value)}
            />
            <button onClick={handleFetchDonorInfo}>Fetch Donor Info</button>

            {message && <p>{message}</p>}

            {donorInfo && (
                <div>
                    <h2>Donor Information</h2>
                    <p><strong>First Name:</strong> {donorInfo.fname}</p>
                    <p><strong>Last Name:</strong> {donorInfo.lname}</p>
                    <p><strong>Email:</strong> {donorInfo.email}</p>
                    <p><strong>Phone:</strong> {donorInfo.phone}</p>
                </div>
            )}
        </div>
    );
};

export default GetDonor;
