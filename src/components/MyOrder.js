import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const loggedInUser = localStorage.getItem("userName");

    useEffect(() => {
        // Fetch orders for the logged-in user
        axios.get('http://localhost:8000/order/my-order', { params: { loggedInUser } }) // Adjust this URL to match your backend route
            .then((response) => {
                setOrders(response.data);
            })
            .catch((err) => {
                console.error("Error fetching orders:", err);
                setError(err.response?.data?.message || "Error fetching orders");
            });
    }, []);

    return (
        <div>
            <h1>Your Orders</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {orders.length > 0 ? (
                <table>
                    <thead>
                        <tr>

                            <th>Order ID</th>
                            <th>Item ID</th>
                            <th>Description</th>
                            <th>Color</th>
                            <th>Is New</th>
                            <th>Material</th>
                            <th>Supervisor</th>
                            <th>Client</th>
                            <th>Relationship</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.orderID}</td>
                                <td>{order.ItemID}</td>
                                <td>{order.iDescription || "N/A"}</td>
                                <td>{order.color || "N/A"}</td>
                                <td>{order.isNew ? "Yes" : "No"}</td>
                                <td>{order.material || "N/A"}</td>
                                <td>{order.supervisorFirstName || "N/A"}</td>
                                <td>{order.clientFirstName || "N/A"}</td>
                                <td>{order.userRole || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders found</p>
            )}
        </div>
    );
};

export default Orders;
