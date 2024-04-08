// noinspection DuplicatedCode

'use strict';

import { test, describe } from 'node:test';
import {ok, strictEqual, deepEqual} from 'node:assert';
import { NotifyStore } from './store.js';

describe('NotifyStore should initialize correctly', () => {
    const store = NotifyStore.instance('testEvent');
    const customEvent = new CustomEvent(store.event, {
        detail: {}
    });
    test("check object", () => {
        ok(typeof NotifyStore === "object");
        //
        deepEqual(Object.keys(NotifyStore), ['instance', 'destroy']);
        //
        ok(typeof NotifyStore.instance === "function");
        ok(typeof NotifyStore.destroy === "function");

        ok(typeof store === "object");
        deepEqual(Object.keys(store), ['event']);
        ok(typeof store.event === "string");
        ok(typeof store.immutable === "function");
        ok(typeof store.toString === "function");
        ok(typeof store.toObject === "function");
        ok(typeof store.instanceOf === "string");

        ok(typeof store.subscribe === "function");
        ok(typeof store.unsubscribe === "function");
        ok(typeof store.emit === "function");
        ok(store.instanceOf === "SimplyBuilderNotifyStoreInterface");
    });
    test('NotifyStore instance is created', () => {
        ok(typeof store === "object");
        ok(typeof store.event === "string");
    });
    test('Add and trigger listeners', async () => {
        const mockCallback = () => called = true;
        let called = false;
        store.subscribe({id: 'test1', fn: mockCallback});
        store.emit(customEvent);
        strictEqual(called, true, 'Listener should be called');
        store.unsubscribe('test1');
    });
    test('Remove listeners and test invocation', async () => {
        const mockCallback = () => called = true;
        let called = false;
        store.subscribe({id: 'test2', fn: mockCallback});
        store.unsubscribe('test2');
        store.emit(customEvent);
        strictEqual(called, false, 'Listener should not be called after removal');
    });
});

export default Object.freeze({})