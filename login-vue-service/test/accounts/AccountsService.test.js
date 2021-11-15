// var assert = require('assert');


import * as assert from "assert";
import {sum} from "../../src/accounts/AccountsService.js";

describe('Array', function() {
    describe('#indexOf()', function() {
        it('Use AccountsService to calculate sum', function() {
            assert.equal(sum(1,2), 3);
        });
    });
});