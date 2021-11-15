// var assert = require('assert');


import * as assert from "assert";
import {AccountsService, main, secretKey, URL} from "../../src/accounts/AccountsService.js";
// import {sum} from "../../src/accounts/AccountsService.js";
import MockAdapter from 'axios-mock-adapter';
import {expect} from 'chai';

import request from '../../src/request/request.js';

describe('AccountsService', function() {
    describe('sum example', function() {
        it('Use AccountsService to calculate sum', function() {
            assert.equal(AccountsService.sum(1,2), 3);
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