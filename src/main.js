'use strict';
/**
 * This module serves as a wrapper for the NotifyStore, providing a streamlined
 * interface to interact with notification systems within applications. It simplifies
 * the creation and management of notification instances.
 *
 * @module NotifyModule
 */

/**
 * @ignore
 */
import {NotifyStore} from "./store.js";

/**
 * Contains metadata about the NotifyModule, including its name and version,
 * which are used internally and possibly displayed in diagnostics or logging.
 *
 * @private
 * @memberof module:NotifyModule
 * @type {{app: {name: string, version: string}}}
 */
const internalStore = {
    app: {
        name: 'NotifyModuleLibName',
        version: 'NotifyModuleLibVersion'
    }
};
/**
 * Extracts the name and version of the module from the internal store,
 * making them available for other functions or export within the module.
 *
 * @private
 * @ignore
 */
const {name, version} = internalStore.app;
/**
 * Creates a notification instance using the specified name. This instance
 * allows for subscribing to and emitting events identified by the given name.
 *
 * @function createNotifyInstance
 * @memberof module:NotifyModule
 * @param {string} name - The name of the event or notification channel to instantiate.
 * @returns {SimplyBuilderNotifyStoreInterface} - An interface to interact with the named event channel.
 */
const createNotifyInstance = (name) => {
    return NotifyStore.instance(name);
};
/**
 * Destroys all notification instances managed by this module, effectively cleaning up
 * all resources and listeners associated with them.
 *
 * @function destroyAll
 * @memberof module:NotifyModule
 */
const destroyAll = () => {
    NotifyStore.destroy();
};
/**
 * Provides a public API for the NotifyModule, allowing users to create notification
 * instances, access module metadata, and clean up all notifications.
 *
 * @type {Readonly<{instance: function(string): SimplyBuilderNotifyStoreInterface, name: string, version: string, destroy: function(): void}>}
 */
export const NotifyModule = Object.freeze({
    name, version,
    instance: createNotifyInstance,
    destroy: destroyAll
});