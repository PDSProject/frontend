import React, { useState } from 'react';
import axios from 'axios';

const SearchItems = () => {
    const [mainCategory, setMainCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:8000/find/search-items', {
                params: { mainCategory, subCategory }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    return (
        <div>
            <h2>Search Items by Category</h2>
            <form onSubmit={handleSearch}>
                <div>
                    <label>Main Category:</label>
                    <input
                        type="text"
                        value={mainCategory}
                        onChange={(e) => setMainCategory(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Sub Category:</label>
                    <input
                        type="text"
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Search</button>
            </form>
            <div>
                <h3>Search Results:</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Description</th>
                            <th>Color</th>
                            <th>Is New</th>
                            <th>Main Category</th>
                            <th>Sub Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((item) => (
                            <tr key={item.ItemID}>
                                <td>{item.ItemID}</td>
                                <td>{item.iDescription}</td>
                                <td>{item.color}</td>
                                <td>{item.isNew ? 'Yes' : 'No'}</td>
                                <td>{item.mainCategory}</td>
                                <td>{item.subCategory}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default SearchItems;
