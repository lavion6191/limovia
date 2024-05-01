// redirect.js
import Cookies from 'js-cookie';

const redirect = {
  refreshToken: {

    login: () => {
      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken) {window.location.href = "/login";}
    },

    home: () => {
      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken) {window.location.href = "/";}
    },
  },
};

export default redirect;