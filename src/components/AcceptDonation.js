import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AcceptDonation = () => {
    const [donorID, setDonorID] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [mainCategory, setMainCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [location, setLocation] = useState("");
    const [message, setMessage] = useState("");
    const loggedInUser = localStorage.getItem("userName");
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (loggedInUser) {
    //         const checkStaffRole = async () => {
    //             try {
    //                 const response = await axios.get('http://localhost:8000/checkrole', { params: { loggedInUser } });
    //                 console.log(response.status)
    //             } catch (error) {
    //                 alert("You are not authorized to access this page.");
    //                 navigate('/home'); // Redirect to home if not staff
    //             }

    //         };

    //         checkStaffRole();
    //     }
    // }, [navigate]);

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
        (loggedInUser ?
            <div>
                <h2>Accept Donation</h2>
                <form onSubmit={handleDonationSubmit}>
                    <div>
                        <label>Donor Username:</label>
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
            : <div><a href="/"> You must login to view the content</a></div>)
    );
};

export default AcceptDonation;
