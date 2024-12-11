import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function StartOrder() {
    const [clientUsername, setClientUsername] = useState('');
    const [orderID, setOrderID] = useState(null);
    const [message, setMessage] = useState('');
    const [itemID, setItemID] = useState('');
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

    const startOrder = async () => {
        try {
            const response = await axios.post('http://localhost:8000/order/start-order', { clientUsername, loggedInUser, itemID });
            setOrderID(response.data.orderID);
            console.log(response)
            localStorage.setItem('orderID', response.data.orderID)
            setMessage('Order started successfully');
        } catch (error) {
            setMessage(error.response.data.message || 'Error starting order');
        }
    };

    return (

        (loggedInUser ?
            <>
                <div>
                    <h2>Start an Order</h2>
                    <input
                        type="text"
                        placeholder="Client Username"
                        value={clientUsername}
                        onChange={(e) => setClientUsername(e.target.value)}
                    />
                    <input type="text" placeholder="Item ID" onChange={e => setItemID(e.target.value)} />

                    <button onClick={startOrder}>Start Order</button>
                    {message && <p>{message}</p>}
                    {orderID && <p>Order ID: {orderID}</p>}
                </div>

            </>
            : <div><a href="/"> You must login to view the content</a></div>)
    );
}

export default StartOrder;
