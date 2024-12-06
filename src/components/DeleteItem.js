import React, { useState } from "react";
import axios from "axios";

const DeleteItem = () => {
    const [itemID, setItemID] = useState("");
    const [message, setMessage] = useState("");

    const handleDeleteItem = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/find/delete-item/${itemID}`);
            setMessage(response.data.message);
            setItemID("");
        } catch (error) {
            console.error(error);
            setMessage("Error deleting the item. Please try again.");
        }
    };

    return (
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
    );
};

export default DeleteItem;
