import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function StartOrder() {
    const [clientUsername, setClientUsername] = useState('');
    const [orderID, setOrderID] = useState(null);
    const [message, setMessage] = useState('');
    const loggedInUser = localStorage.getItem("userName");

    const startOrder = async () => {
        try {
            const response = await axios.post('http://localhost:8000/order/start-order', { clientUsername, loggedInUser });
            setOrderID(response.data.orderID);
            console.log(response)
            setMessage('Order started successfully');
        } catch (error) {
            setMessage(error.response.data.message || 'Error starting order');
        }
    };

    return (
        <>
            <div>
                <h2>Start an Order</h2>
                <input
                    type="text"
                    placeholder="Client Username"
                    value={clientUsername}
                    onChange={(e) => setClientUsername(e.target.value)}
                />
                <button onClick={startOrder}>Start Order</button>
                {message && <p>{message}</p>}
                {orderID && <p>Order ID: {orderID}</p>}
            </div>

        </>

    );
}

export default StartOrder;
