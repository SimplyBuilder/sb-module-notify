// noinspection DuplicatedCode

'use strict';

import { test, describe } from 'node:test';
import {ok, strictEqual, deepEqual} from 'node:assert';

import { NotifyModule } from '#sb-module-notify';

describe('NotifyModule should initialize correctly', () => {
    const store = NotifyModule.instance('testEvent');
    const customEvent = new CustomEvent(store.event, {
        detail: {}
    });
    test("check object", () => {
        ok(typeof NotifyModule === "object");
        //
        deepEqual(Object.keys(NotifyModule), ['name', 'version', 'instance', 'destroy']);
        //
        ok(typeof NotifyModule.name === "string");
        ok(typeof NotifyModule.version === "string");
        ok(typeof NotifyModule.instance === "function");
        ok(typeof NotifyModule.destroy === "function");

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
    test('NotifyModule instance is created', () => {
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