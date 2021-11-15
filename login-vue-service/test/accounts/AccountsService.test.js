// var assert = require('assert');
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import * as assert from "assert";
import {login, loginUrl, main, secretKey, sum, URL} from "../../src/accounts/AccountsService.js";
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
    let axiosMock = MockAdapter;
    const receivedData = { data: 'data' };

    before(() => {
        axiosMock = new MockAdapter(request);
        axiosMock.onGet(URL, {
            headers: {
                KEY: secretKey,
            },
        }).replyOnce(200, receivedData);
    });

    it('test', async () => {
        const response = await main();
        expect(response.status).to.be.equal(200);
        expect(response.data).to.be.deep.equal(receivedData);
    });

    after(() => {
        axiosMock.restore();
    });
});

describe('Login', () => {
    let axiosMock = MockAdapter;
    const receivedData = { username: "username",
        accessToken: "accessToken12345",
        refreshToken: "refreshToken67890",
        tokenExpires: "2021-11-10T17:00:01:123Z" };

    before(() => {
        axiosMock = new MockAdapter(axios);
        axiosMock.onPost(loginUrl).reply(200, receivedData);
    });

    it('Login ok', async () => {
        const UserTokens = await login("username", "password");
        expect(UserTokens).to.be.deep.equal(receivedData);
    });

    after(() => {
        axiosMock.restore();
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