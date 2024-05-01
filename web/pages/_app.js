import 'css/global.css';
import Cookies from 'js-cookie';
import { TokenManager } from 'util/token';

function MyApp({ Component, pageProps }) {

    const refreshToken = Cookies.get('refreshToken');
    const accessToken = Cookies.get('accessToken');

    TokenManager(refreshToken, accessToken);

    return (
        <>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
