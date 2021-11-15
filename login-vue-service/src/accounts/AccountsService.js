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

    return response;
}