import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeleteItem = () => {
    const [itemID, setItemID] = useState("");
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

    const handleDeleteItem = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/find/delete-item/${itemID}`, { data: { loggedInUser: loggedInUser } });
            setMessage(response.data);
            console.log(message)
            setItemID("");
        } catch (error) {
            setMessage("Error deleting the item");
        }
    };

    return (
        (loggedInUser ?
            <div>
                <h1>Delete Item by ID</h1>
                <input
                    type="text"
                    placeholder="Enter Item ID"
                    value={itemID}
                    onChange={(e) => setItemID(e.target.value)}
                />
                <button onClick={handleDeleteItem}>Delete Item</button>

                {message && <p>{message}</p>}
            </div>
            : <div><a href="/"> You must login to view the content</a></div>)
    );
};

export default DeleteItem;
