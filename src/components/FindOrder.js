import React, { useState } from 'react';
import axios from 'axios';

const FindOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setError('');
        setItems([]);

        try {
            const response = await axios.get(`http://localhost:8000/find/find-order-items/${orderId}`);
            setItems(response.data.items);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('No items found for this order.');
            } else {
                setError('An error occurred while fetching the order items.');
            }
        }
    };

    return (
        <div>
            <h1>Find Order Items</h1>
            <div>
                <label htmlFor="orderId">Order ID:</label>
                <input
                    type="text"
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {items.length > 0 && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Description</th>
                            <th>Room</th>
                            <th>Shelf</th>
                            <th>Shelf Description</th>
                            <th>Piece Num</th>
                            <th>Piece Description</th>
                            <th>Length</th>
                            <th>Width</th>
                            <th>Height</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.ItemID}</td>
                                <td>{item.iDescription}</td>
                                <td>{item.roomNum || 'N/A'}</td>
                                <td>{item.shelfNum || 'N/A'}</td>
                                <td>{item.shelfDescription || 'N/A'}</td>
                                <td>{item.pieceNum || 'N/A'}</td>
                                <td>{item.pDescription || 'N/A'}</td>
                                <td>{item.length || 'N/A'}</td>
                                <td>{item.width || 'N/A'}</td>
                                <td>{item.height || 'N/A'}</td>
                                <td>{item.pNotes || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default FindOrder;
