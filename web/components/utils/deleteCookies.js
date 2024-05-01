import Cookies from 'js-cookie';

const deleteCookies = () => {
    const cookies = Cookies.get();
    for (const cookieName in cookies) {
        Cookies.remove(cookieName);
    }
}

export default deleteCookies;