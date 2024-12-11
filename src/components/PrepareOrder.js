import React, { useState } from "react";
import axios from "axios";

const PrepareOrder = () => {
    const [orderID, setOrderID] = useState(""); // For storing the order ID input
    const [message, setMessage] = useState(""); // For displaying response messages
    const [loading, setLoading] = useState(false); // For showing loading state
    const loggedInUser = localStorage.getItem("userName");

    // Handle form submission to prepare the order
    const handlePrepareOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(""); // Clear any previous message

        try {
            const response = await axios.post("http://localhost:8000/order/prepare-order", { orderID, loggedInUser });
            setMessage(response.data.message); // Display success message
        } catch (error) {
            console.error("Error preparing order:", error);
            setMessage(error.response ? error.response.data.message : "Error preparing order.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Prepare Order for Delivery</h2>

            {/* Form to input order ID */}
            <form onSubmit={handlePrepareOrder}>
                <div>
                    <label htmlFor="orderID">Order ID:</label>
                    <input
                        type="text"
                        id="orderID"
                        value={orderID}
                        onChange={(e) => setOrderID(e.target.value)}
                        required
                        placeholder="Enter Order ID"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Preparing..." : "Prepare Order"}
                </button>
            </form>

            {/* Message display */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default PrepareOrder;
