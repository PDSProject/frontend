import React, { useState } from 'react';
import axios from 'axios';

function FindItem() {
    const [itemID, setItemID] = useState('');
    const [results, setResults] = useState([]);

    const handleFindItem = () => {
        axios.get(`http://localhost:8000/find/find-item/${itemID}`)
            .then(res => setResults(res.data))
            .catch(err => alert('Error fetching item data'));
    };

    return (
        <div>
            <h2>Find Item</h2>
            <input type="text" placeholder="Item ID" onChange={e => setItemID(e.target.value)} />
            <button onClick={handleFindItem}>Find</button>
            <ul>
                {results.map((res, index) => (
                    <li key={index}>Room: {res.roomNum}, Shelf: {res.shelfNum}, Description: {res.pDescription}</li>
                ))}
            </ul>
        </div>
    );
}

export default FindItem;
