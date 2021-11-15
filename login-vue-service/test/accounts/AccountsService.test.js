// var assert = require('assert');
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import * as assert from "assert";
import {login, loginUrl, main, secretKey, sum, URL} from "../../src/accounts/AccountsService.js";
// import {sum} from "../../src/accounts/AccountsService.js";
import {expect} from 'chai';

import request from '../../src/request/request.js';

describe('AccountsService', function() {
    describe('sum example', function() {
        it('Use AccountsService to calculate sum', function() {
            assert.equal(sum(1,2), 3);
        });
    });
});
describe('Request test', () => {
    // let stub: MockAdapter;
    let stub = MockAdapter;
    const receivedData = { data: 'data' };

    before(() => {
        stub = new MockAdapter(request);
        stub.onGet(URL, {
            headers: {
                KEY: secretKey,
            },
        }).replyOnce(200, receivedData);
        // replyOnce if you assume that your code sends a single request
    });

    it('test', async () => {
        const response = await main();

        expect(response.status).to.be.equal(200);
        expect(response.data).to.be.deep.equal(receivedData);
    });

    after(() => {
        stub.restore();
    });
});

describe('Login', () => {
    let stub = MockAdapter;
    const receivedData = { username: "username",
        accessToken: "accessToken12345",
        refreshToken: "refreshToken67890",
        tokenExpires: "2021-11-10T17:00:01:123Z" };
    // const mockAxios = axios.create();

    before(() => {
        stub = new MockAdapter(axios);
        stub.onPost(loginUrl).reply(200, receivedData);
        /*
        stub.onPost(loginUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                username: "username",
                password: "password"
            }
        }).reply(200, receivedData);

         */
        /*
        stub.onGet( loginUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).replyOnce(200, receivedData);
        // replyOnce if you assume that your code sends a single request

         */
    });
    /*
    it("axios in test", async () => {
        await axios.get(loginUrl).then(response => {
            expect(response.status).to.be.equal(500);
            console.log("Status: " + response.status);
        });
    });

     */

    it('Login ok', async () => {
        const credentials =  {
            username: "username",
            password: "password"
        }
        const headers = {
            'Content-Type': 'application/json',
        }
        // const UserTokens = await axios.post(loginUrl, JSON.stringify(credentials), {
        //     headers: headers
        // });
        const UserTokens = await login("username", "password");
         // const UserTokens = await loginGet();
        // expect(response.status).to.be.equal(200);
        expect(UserTokens).to.be.deep.equal(receivedData);
    });


    after(() => {
        stub.restore();
    });
});

describe('Login-host unreachable', () => {
    let axiosMock = MockAdapter;
    const receivedData = { username: "username",
        accessToken: "accessToken12345",
        refreshToken: "refreshToken67890",
        tokenExpires: "2021-11-10T17:00:01:123Z" };

    before(() => {
        axiosMock = new MockAdapter(request);
        axiosMock.onGet(loginUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).replyOnce(200, receivedData);
    });

    it('Login fails', async () => {
        try {
            const UserTokens = await login("username", "password");
            expect.fail("Error should have been thrown. Got UserTokens: " + JSON.stringify(UserTokens));

        } catch (error) {
            console.log("Error: ", error);
            expect(error.message).to.contain("ECONNREFUSED");
        }
    });
    after(() => {
        axiosMock.restore();
    });
});