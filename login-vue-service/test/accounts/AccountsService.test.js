// var assert = require('assert');


import * as assert from "assert";
import {login, main, secretKey, sum, URL} from "../../src/accounts/AccountsService.js";
// import {sum} from "../../src/accounts/AccountsService.js";
import MockAdapter from 'axios-mock-adapter';
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

    before(() => {
        stub = new MockAdapter(request);
        stub.onGet(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).replyOnce(200, receivedData);
        // replyOnce if you assume that your code sends a single request
    });

    it('Login ok', async () => {
        const UserTokens = await login("username", "password");

        // expect(response.status).to.be.equal(200);
        expect(UserTokens).to.be.deep.equal(receivedData);
    });
    after(() => {
        stub.restore();
    });
});

describe('Login-host unreachable', () => {
    let stub = MockAdapter;
    const receivedData = { username: "username",
        accessToken: "accessToken12345",
        refreshToken: "refreshToken67890",
        tokenExpires: "2021-11-10T17:00:01:123Z" };

    before(() => {
        stub = new MockAdapter(request);
        stub.onGet(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).replyOnce(200, receivedData);
        // replyOnce if you assume that your code sends a single request
    });

    it('Login fails', async () => {
        try {
            const UserTokens = await login("username", "password");
            expect.fail("Error should have been thrown. Got UserTokens: " + JSON.stringify(UserTokens));

        } catch (error) {
            console.log("Error: ", error);
            expect(error.message).to.contain("ECONNREFUSED");
        }

        // expect(response.status).to.be.equal(200);

    });
    after(() => {
        stub.restore();
    });
});