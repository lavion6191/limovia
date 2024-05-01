// ACT.js
import Cookies from 'js-cookie';
import api from 'util/api';

const ACT = async () => {
  try {
    // Get the REFT from cookies
    const REFT = Cookies.get('reft');

    // Check if REFT exists
    if (!REFT) {
      console.error('Access Denied. No refresh token provided.');
      return null;
    }

    // Send a POST request to refresh ACT
    const response = await api.post('/v1/user/auth/ACT', { REFT });

    // Check if the response contains a new ACT
    if (response.data && response.data.ACT) {
      // Return the new ACT
      return response.data.ACT;
    } else {
      console.error('Error refreshing ACT:', response.data.error);
      return null;
    }
  } catch (error) {
    console.error('Error refreshing ACT:', error);
    return null;
  }
};

export default ACT;
