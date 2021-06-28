// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let datas = JSON.parse(localStorage.getItem('datas')) || [];
console.log(datas)
export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const { method, headers } = opts;
        const body = opts.body && JSON.parse(opts.body);

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/authenticate') && method === 'POST':
                        return authenticate();
                    case url.endsWith('/users/register') && method === 'POST':
                        return register();
                    case url.endsWith('/users') && method === 'GET':
                        return getUsers();
                        
                        case url.endsWith('/datas/newdata') && method === 'POST':
                        return newdata();
                    case url.endsWith('/datas') && method === 'GET':
                        return getDatas();
                        case url.match(/\/datas\/\d+$/) && method === 'DELETE':
                        return deleteData();
                    case url.match(/\/users\/\d+$/) && method === 'DELETE':
                        return deleteUser();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function authenticate() {
                const { username, password } = body;
                const user = users.find(x => x.username === username && x.password === password);
                if (!user) return error('Username or password is incorrect');
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: 'fake-jwt-token'
                });
            }

            function register() {
                const user = body;
    
                if (users.find(x => x.username === user.username)) {
                    return error(`Username  ${user.username} is already taken`);
                }
    
                // assign user id and a few other properties then save
                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                return ok();
            }

            function newdata() {
                const data = body;
    
                if (datas.find(x => x.name === data.name)) {
                    return error(`name  ${data.name} is already taken`);
                }
    
                // assign user id and a few other properties then save
                data.id = datas.length ? Math.max(...datas.map(x => x.id)) + 1 : 1;
                datas.push(data);
                localStorage.setItem('datas', JSON.stringify(datas));

                return ok();
            }
    
            function getUsers() {
                if (!isLoggedIn()) return unauthorized();

                return ok(users);
            }
    
            function getDatas() {
                if (!isLoggedIn()) return unauthorized();

                return ok(datas);
            }
            function deleteUser() {
                if (!isLoggedIn()) return unauthorized();
    
                users = users.filter(x => x.id !== idFromUrl());
                localStorage.setItem('users', JSON.stringify(users));
                return ok();
            }
            function deleteData() {
                datas = datas.filter(x => x.id !== idFromUrl());
                localStorage.setItem('datas', JSON.stringify(datas));
                return ok();
            }
            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

            function isLoggedIn() {
                return headers['Authorization'] === 'Bearer fake-jwt-token';
            }
    
            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }
        });
    }
}