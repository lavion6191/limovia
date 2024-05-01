import Cookies from 'js-cookie';
import api from 'util/api';

export async function TokenManager(refreshToken, accessToken) {
    if (refreshToken && !accessToken) {
        try {
            const response = await api.post('/v1/user/auth/accesstoken', { refreshToken: refreshToken });
            const newAccessToken = response.data.accessToken;
            const domain = process.env.NODE_ENV === 'development' ? 'localhost' : '.limovia.se';
            Cookies.set('accessToken', newAccessToken, { expires: (1 / 1440) * 15, domain });
        } catch (error) {
            console.error('Error renewing token:', error);
        }
    }
}
