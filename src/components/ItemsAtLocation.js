import React, { useState } from 'react';
import axios from 'axios';

const ItemsAtLocation = () => {
    const [roomNum, setRoomNum] = useState('');
    const [shelfNum, setShelfNum] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:8000/find/find-by-loc', {
                params: { roomNum, shelfNum }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    return (
        <div>
            <h2>Find Items by Location</h2>
            <form onSubmit={handleSearch}>
                <div>
                    <label>Room Number:</label>
                    <input
                        type="text"
                        value={roomNum}
                        onChange={(e) => setRoomNum(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Shelf Number:</label>
                    <input
                        type="text"
                        value={shelfNum}
                        onChange={(e) => setShelfNum(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Search</button>
            </form>
            <div>
                <h3>Search Results:</h3>
                {results.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Item ID</th>
                                <th>Description</th>
                                <th>Color</th>
                                <th>Is New</th>
                                <th>Room Number</th>
                                <th>Shelf Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((item) => (
                                <tr key={item.ItemID}>
                                    <td>{item.ItemID}</td>
                                    <td>{item.iDescription}</td>
                                    <td>{item.color}</td>
                                    <td>{item.isNew ? 'Yes' : 'No'}</td>
                                    <td>{item.roomNum}</td>
                                    <td>{item.shelfNum}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No items found at the specified location.</p>
                )}
            </div>
        </div>
    );
};

export default ItemsAtLocation;
