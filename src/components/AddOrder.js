import React, { useState, useEffect } from "react";
import axios from "axios";

const AddToOrder = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [selectedItem, setSelectedItem] = useState("");
    const [orderMessage, setOrderMessage] = useState("");
    const orderIDs = localStorage.getItem("orderID");

    useEffect(() => {
        // Fetch categories for dropdown
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8000/order/get-categories"); // Assume this endpoint returns all categories
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        // Fetch subcategories based on selected category
        if (selectedCategory) {
            const fetchSubcategories = async () => {
                try {
                    const response = await axios.get("http://localhost:8000/order/get-subcategories", {
                        params: { category: selectedCategory },
                    });
                    setSubcategories(response.data);
                } catch (error) {
                    console.error("Error fetching subcategories:", error);
                }
            };
            fetchSubcategories();
        }
    }, [selectedCategory]);

    useEffect(() => {
        // Fetch available items based on selected category and subcategory
        if (selectedCategory && selectedSubcategory) {
            const fetchItems = async () => {
                try {
                    const response = await axios.get("http://localhost:8000/order/get-items", {
                        params: { category: selectedCategory, subcategory: selectedSubcategory },
                    });
                    setItems(response.data);

                } catch (error) {
                    console.error("Error fetching items:", error);
                }
            };
            fetchItems();
        }
    }, [selectedCategory, selectedSubcategory]);

    const handleAddToOrder = async () => {
        if (!selectedItem) {
            alert("Please select an item to add to the order.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/order/add-to-order", {
                category: selectedCategory,
                subcategory: selectedSubcategory,
                itemID: selectedItem,
                orderID: orderIDs
            });
            setOrderMessage(response.data.message);
        } catch (error) {
            console.error("Error adding item to order:", error);
            setOrderMessage(error.response?.data?.message || "Error adding item to the order.");
        }
    };

    return (
        <div>
            <h2>Add Item to Current Order</h2>

            {/* Dropdown for category selection */}
            <div>
                <label>Category:</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Dropdown for subcategory selection */}
            <div>
                <label>Subcategory:</label>
                <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                >
                    <option value="">Select Subcategory</option>
                    {subcategories.map((subcategory) => (
                        <option key={subcategory} value={subcategory}>
                            {subcategory}
                        </option>
                    ))}
                </select>
            </div>

            {/* Dropdown for item selection */}
            <div>
                <label>Item:</label>
                <select
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                >
                    <option value="">Select Item</option>
                    {items.map((item) => (
                        <option key={item.ItemID} value={item.ItemID}>
                            {item.ItemID}
                        </option>
                    ))}
                </select>
            </div>

            {/* Button to add the selected item to the order */}
            <div>
                <button onClick={handleAddToOrder}>Add to Order</button>
            </div>

            {/* Message to display after the item is added */}
            {orderMessage && <p>{orderMessage}</p>}
        </div>
    );
};

export default AddToOrder;
