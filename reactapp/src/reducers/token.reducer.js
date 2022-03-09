export default function (token = '', action) {
    switch (action.type) {
        case 'addToken' :
            localStorage.removeItem('token');
            localStorage.setItem('token', action.token);
            return action.token;
        case 'removeToken' :
            localStorage.removeItem('token');
            return '';
        case 'refreshToken' :
            return localStorage.getItem('token') != null ? localStorage.getItem('token') : token;
        default :
            return token;
    }
}
