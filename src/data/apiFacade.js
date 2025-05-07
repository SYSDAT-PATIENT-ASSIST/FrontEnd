const URL = 'http://localhost:7070/api'; 

function handleHttpErrors(res) {
    if (!res.ok) {
        return res.json().then(error => {
            return Promise.reject({ status: res.status, fullError: error });
        });
    }
    return res.json();
}

function apiFacade() {
    const setToken = (token) => localStorage.setItem('jwtToken', token);
    const getToken = () => localStorage.getItem('jwtToken');
    const loggedIn = () => getToken() != null;
    const logout = () => localStorage.removeItem('jwtToken');

    const login = (username, password) => {
        const options = makeOptions('POST', false, { username, password });
        return fetch(URL + '/auth/login', options)
            .then(handleHttpErrors)
            .then(res => {
                setToken(res.token);
                return res;
            });
    };

    const makeOptions = (method, addToken, body) => {
        const opts = {
            method,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };
        if (addToken && loggedIn()) {
            opts.headers['Authorization'] = `Bearer ${getToken()}`;
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    };

    return {
        login,
        setToken,
        getToken,
        loggedIn,
        logout,
    };
}

const facade = apiFacade();
export default facade;