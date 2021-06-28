export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    let data = JSON.parse(localStorage.getItem('data'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } 
    else if (data && data.token) {
        return { 'Authorization': 'Bearer ' + data.token };
    } 
    else {
        return {};
    }
}