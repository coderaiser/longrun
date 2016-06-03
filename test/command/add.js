'use strict';

const add = require('../../lib/command/add');
const test = require('tape');
const tildify = require('tildify');
const squad = require('squad');

const cwd = squad(tildify, process.cwd);
const DIR = cwd();

test('longrun: add directory to runner', (t) => {
    const runners = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: ['~']
    }];
    
    const expect = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: ['~', DIR]
    }];
    
    const runItem = {
        name: 'patch',
        cwd: DIR
    };
    
    add(runners, (error, result) => {
        t.notOk(error, 'should not be error');
        t.deepEqual(result, expect, 'should add directory to runner');
        t.end();
    }, runItem);
});

test('longrun: add directory to runner: no name', (t) => {
    add([], (error) => {
        t.equal(error.message, 'name could not be empty', 'should throw when no name');
        t.end();
    }, {});
});
