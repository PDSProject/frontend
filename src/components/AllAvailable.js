import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllAvailable() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch available items
        axios.get('http://localhost:8000/find/all-available')
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
                setError('Failed to fetch items.');
            });
    }, []);


    return (
        <div>
            <h1>Available Items</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table border="1">
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Description</th>
                        <th>Main Category</th>
                        <th>Sub Category</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.ItemID}>
                            <td>{item.ItemID}</td>
                            <td>{item.iDescription}</td>
                            <td>{item.mainCategory}</td>
                            <td>{item.subCategory}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllAvailable;