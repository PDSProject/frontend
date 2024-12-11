import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GetDonor = () => {
    const [donorID, setDonorID] = useState("");
    const [donorInfo, setDonorInfo] = useState(null);
    const [message, setMessage] = useState("");
    const loggedInUser = localStorage.getItem("userName");
    const navigate = useNavigate();


    useEffect(() => {
        if (loggedInUser) {

            const checkStaffRole = async () => {
                try {
                    const response = await axios.get('http://localhost:8000/checkrole', { params: { loggedInUser } });
                    console.log(response.status)
                } catch (error) {
                    alert("You are not authorized to access this page.");
                    navigate('/home'); // Redirect to home if not staff
                }

            };


            checkStaffRole();
        }
    }, [navigate]);


    const handleFetchDonorInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/donate/donor-info/${donorID}`);
            setDonorInfo(response.data);
            setMessage("");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An unknown error occurred";
            setMessage(errorMessage);  // Set the error message in your state
            setDonorInfo(null);
        }
    };

    return (
        (loggedInUser ?
            <div>
                <h1>Fetch Donor Information by Donor Username</h1>
                <input
                    type="text"
                    placeholder="Enter Donor Username"
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
            : <div><a href="/"> You must login to view the content</a></div>)
    );
};

export default GetDonor;
