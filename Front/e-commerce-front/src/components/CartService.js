import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const addItemToCart = async (userId, productId, quantity) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cart/add`, { userId, productId, quantity });
        return response.data;
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
};

const removeItemFromCart = async (userId, productId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/cart/remove/${userId}/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing item from cart:', error);
    }
};

const getCart = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cart/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
    }
};

export { addItemToCart, removeItemFromCart, getCart };
