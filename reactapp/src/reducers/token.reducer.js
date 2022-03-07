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
            console.log(localStorage.getItem('token'));
            if (localStorage.getItem('token') != 'null') {
                return localStorage.getItem('token')
            }
            return token;
        default :
            return token;
    }
}
