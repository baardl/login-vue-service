//ES6
import axios from 'axios';
import request from '../request/request.js';

export const name = 'AccountService';
export const AccountsService = {
    login,
    logout,
    sum
};
function sum(a, b) {
    return a+b;
}
function login({commit}, credentials) {
// function login(username, password) {
    /*
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    let credentials = JSON.stringify({ username, password });

     */

    console.log("Login using: ", JSON.stringify(credentials));
    const headers = {
        'Content-Type': 'application/json',
    }
    axios.post('/api/v2/login', JSON.stringify(credentials), {
        headers: headers
    }).then(result => {
        let userTokens = result.data;
        let User = {
            username: credentials.username,
            accessToken: userTokens.accessToken,
            refreshToken: userTokens.refreshToken,
            tokenExpires: userTokens.expires

        }
        commit('CURRENT_USER', User);
        commit('SAVE_ALARMS');
    }).catch(error => {
        throw new Error(`API ${error}`);
    });

    /*
    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });

     */
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

export const URL = 'https://httpbin.org/get';
export const secretKey = 'secret_key';

export async function main() {

    const response = await request.get(URL, {
        headers: {
            KEY: secretKey,
        },
    });

    // response logic

    return response;
}