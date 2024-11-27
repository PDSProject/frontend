import React, { useState } from "react";
import axios from "axios";

const AcceptDonation = () => {
    const [donorID, setDonorID] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [mainCategory, setMainCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [location, setLocation] = useState("");
    const [message, setMessage] = useState("");
    const loggedInUser = localStorage.getItem("userName");

    const handleDonationSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/donate/accept-donation`, {
            donorID,
            itemDescription,
            mainCategory,
            subCategory,
            location,
            loggedInUser
        })
            .then((response) => {
                setMessage("Donation accepted successfully!");
            })
            .catch((error) => {
                console.error("Error submitting donation:", error);
                setMessage(error.response.data.message);
            });
    };

    return (
        <div>
            <h2>Accept Donation</h2>
            <form onSubmit={handleDonationSubmit}>
                <div>
                    <label>Donor ID:</label>
                    <input
                        type="text"
                        value={donorID}
                        onChange={(e) => setDonorID(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Item Description:</label>
                    <textarea
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Main Category:</label>
                    <input
                        type="text"
                        value={mainCategory}
                        onChange={(e) => setMainCategory(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Sub Category:</label>
                    <input
                        type="text"
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Location (Room-Shelf):</label>
                    <input
                        type="text"
                        placeholder="e.g., 101-5"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Donation</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AcceptDonation;
