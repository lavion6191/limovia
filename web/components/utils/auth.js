// utils/auth.js

import Cookies from 'js-cookie';
import api from 'util/api';

export const getRole = async () => {
    const accessToken = Cookies.get('accessToken');
    try {
        const response = await api.post('/user/role', { accessToken });
        return response.data.role;
    } catch (error) {
        console.error('Error fetching user role:', error);
        throw error;
    }
};
