//ES6
import axios from 'axios';
import request from '../request/request.js';

axios.create();

export const name = 'AccountService';
export const AccountsService = {
    login,
    logout
};
export function sum(a, b) {
    return a+b;
}

export const loginUrl = '/api/v2/login';

export async function loginGet() {
    const headers = {
        'Content-Type': 'application/json',
    }
    await axios.get(loginUrl,{headers:headers})
        .then(result => {
            console.log("Result: ", result);
            return {};
        })
        .catch(error => {
            console.error("Failed: ", error);
            throw new Error(`API ${error}`);
        });
}

export async function login(username, password) {
// function login(username, password) {
    /*
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    let credentials = JSON.stringify({ username, password });
   ll
     */
    const credentials =  {
        username,
        password
    }
    console.log("Login credentials: ", JSON.stringify(credentials));
    const headers = {
        'Content-Type': 'application/json',
    }
    return await axios.post(loginUrl, JSON.stringify(credentials), {
        headers: headers
    }).then(result => {
        let userTokens = result.data;
        let UserTokens = {
            username: credentials.username,
            accessToken: userTokens.accessToken,
            refreshToken: userTokens.refreshToken,
            tokenExpires: userTokens.tokenExpires
        }
        return UserTokens;
        // TODO move commit('CURRENT_USER', UserTokens);
        // TODO move commit('SAVE_ALARMS');
    }).catch(error => {
        console.error("Failed: ", error);
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