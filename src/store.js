'use strict';
/**
 * Provides a structured system for managing custom events within applications,
 * allowing components to subscribe to, emit, and manage events efficiently.
 *
 * @module NotifyStore
 */

/**
 * @private
 * @type {symbol}
 */
const notifyInitSymbol = Symbol('Init');
/**
 * @private
 * @type {symbol}
 */
const notifyInstanceSymbol = Symbol("Instance");

/**
 * Stores the initialized event targets for each registered event.
 *
 * @private
 * @type {Object.<string, EventTarget>}
 */
const EventTargetStore = {};
/**
 * Maintains a map of event listeners for each event type. Each map contains
 * listeners keyed by a unique identifier.
 *
 * @private
 * @type {Object.<string, Map<string, function>>}
 */
const EventListenerStore = {};
/**
 * Contains instances of notification handlers, allowing for event management
 * and listener notifications.
 *
 * @private
 * @type {Object.<symbol, Object>}
 */
const NotifyInstanceStore = {
    [notifyInstanceSymbol]: {}
}
/**
 * Validates whether a given string is not empty and trimmed.
 *
 * @private
 * @function isValidString
 * @param {string} str - The string to validate.
 * @returns {boolean} True if the string is valid, otherwise false.
 */
const isValidString = (str) => {
    return typeof str === "string" && str.trim().length >= 1;
};
/**
 * Registers a new custom event within the system. If the event already exists,
 * it throws an error to avoid duplicate registrations.
 *
 * @private
 * @function registerEvent
 * @param {string} name - The name of the event to register.
 * @returns {boolean} True if the event is registered successfully.
 */
const registerEvent = (name) => {
    if(isValidString(name)) {
        if (EventTargetStore[name]) {
            throw new Error("event already exists");
        }
        EventTargetStore[name] = new EventTarget();
        EventListenerStore[name] = new Map();

        return true;
    } else throw new Error("event name must be string");
};
/**
 * Checks if an event is already registered in the system.
 *
 * @private
 * @function checkIfExist
 * @param {string} name - The name of the event to check.
 * @returns {boolean} True if the event exists, otherwise false.
 */
const checkIfExist = (name) => {
    if(isValidString(name)) return (EventListenerStore[name] && EventTargetStore[name]);
    return false;
}
/**
 * Adds a listener function to a specific event. If the event does not exist,
 * it throws an error. It also checks for the uniqueness of the listener ID.
 *
 * @private
 * @function addListenerOnEvent
 * @param {Object} data - The data needed to add the listener.
 */
const addListenerOnEvent = (data = {}) => {
    const {instance, callback = {}} = data;
    if (instance?.instanceOf === "SimplyBuilderNotifyStoreInterface" && checkIfExist(instance.event)) {
        const {id, fn} = callback;
        if (isValidString(id) && typeof fn === "function") {
            if (EventListenerStore[instance.event].has(id)) {
                throw new Error("listener id already exists");
            }
            EventListenerStore[instance.event].set(id, (event) => {
                fn(event.detail);
            });
            EventTargetStore[instance.event].addEventListener(instance.event, EventListenerStore[instance.event].get(id));
        }
    }
};
/**
 * Removes a listener from an event. If the listener or event does not exist,
 * it provides a warning but does not throw an error.
 *
 * @private
 * @function removeListenerFromEvent
 * @param {Object} data - The data needed to remove the listener.
 * @returns {boolean} True if the listener is removed successfully.
 */
const removeListenerFromEvent = (data = {}) => {
    const {instance, id} = data;
    const {event} = instance;
    if (instance?.instanceOf === "SimplyBuilderNotifyStoreInterface" && checkIfExist(instance.event)) {
        if (isValidString(id) && (EventListenerStore[instance.event].has(id))) {
            EventTargetStore[instance.event].removeEventListener(instance.event, EventListenerStore[instance.event].get(id));
            EventListenerStore[instance.event].delete(id);
            return true;
        }
    } else {
        console.warn(`removeEventListener Warning: No listener found with id '${id}' for event '${event}'.`);
    }

    return false;
};
/**
 * Registers an instance of `SimplyBuilderNotifyStoreInterface` for managing
 * a specific event. This is used to maintain a singleton pattern for each event.
 *
 * @private
 * @function registerNotifyInstance
 * @param {SimplyBuilderNotifyStoreInterface} instance - The instance to register.
 */
const registerNotifyInstance = (instance) => {
    if(checkIfExist(instance.event)) {
        const {event} = instance;
        NotifyInstanceStore[notifyInstanceSymbol][event] = instance;
    }
}
/**
 * Defines a class for creating event notification instances. These instances
 * are used to subscribe to events, emit events, and manage event listeners.
 *
 * @class SimplyBuilderNotifyStoreInterface
 */
class SimplyBuilderNotifyStoreInterface {
    /**
     * Initializes a new event registration.
     *
     * @private
     * @param {string} name - The name of the event to initialize.
     */
    [notifyInitSymbol](name) {
        if (registerEvent(name)) {
            this.event = name;
        }
    }
    /**
     * Subscribes a listener to this instance's event.
     *
     * @param {Object} data - The listener configuration.
     */
    subscribe(data = {}) {
        const instance = this;
        addListenerOnEvent({instance, callback: data});
    }
    /**
     * Unsubscribes a listener from this instance's event using its ID.
     *
     * @param {string} id - The ID of the listener to remove.
     * @returns {boolean} True if the listener is unsubscribed.
     */
    unsubscribe(id) {
        const instance = this;
        return removeListenerFromEvent({instance, id});
    }
    /**
     * Emits an event with the provided data.
     *
     * @param {Object} data - The data to emit with the event.
     */
    emit(data = {}) {
        const instance = this;
        const customEvent = new CustomEvent(instance.event, {
            detail: data
        });
        EventTargetStore[instance.event].dispatchEvent(customEvent);
    }
    constructor(name) {
        Object.defineProperty(this, 'instanceOf', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: new.target.name
        });
        Object.defineProperty(this, 'toObject', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: () => {
                return {...this};
            }
        });
        Object.defineProperty(this, 'toString', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: () => {
                return JSON.stringify(this.toObject());
            }
        });
        Object.defineProperty(this, 'immutable', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: () => {
                if (!Object.isFrozen(this)) {
                    Object.freeze(this);
                }
                return true;
            }
        });
        if(isValidString(name)) {
            this[notifyInitSymbol]("ev-" + name.toString().trim());
        }
    }
}

/**
 * @private
 * @ignore
 */
Object.defineProperty(SimplyBuilderNotifyStoreInterface, Symbol.hasInstance, {
    get: () => (instance) => instance.constructor.name === instance.instanceOf
});

/**
 * Retrieves an existing notification instance for a given event. If no instance
 * exists, it returns undefined.
 *
 * @private
 * @function getNotifyInstance
 * @param {string} name - The name of the event.
 * @returns {SimplyBuilderNotifyStoreInterface|undefined} The retrieved instance or undefined.
 */
const getNotifyInstance = (name) => {
    const event = "ev-"+ name;
    if(isValidString(name) && checkIfExist(event) &&  NotifyInstanceStore[notifyInstanceSymbol][event]) {
        return NotifyInstanceStore[notifyInstanceSymbol][event];
    }
    return undefined;
}
/**
 * Creates a new notification instance for a given event. If an instance already
 * exists, it returns the existing instance.
 *
 * @function createInstance
 * @param {string} name - The name of the event.
 * @returns {SimplyBuilderNotifyStoreInterface} The notification instance.
 */
const createInstance = (name) => {
    let instance = getNotifyInstance(name);
    if(typeof instance === "undefined") instance = new SimplyBuilderNotifyStoreInterface(name);
    instance.immutable();
    registerNotifyInstance(instance);
    return instance;
};
/**
 * Destroys an existing notification instance and cleans up its resources.
 *
 * @private
 * @function destroyInstance
 * @param {string} name - The name of the instance to destroy.
 */
const destroyInstance = (name) => {
    if(checkIfExist(name) && NotifyInstanceStore[notifyInstanceSymbol][name]) {
        const listeners = Array.from(EventListenerStore[name].keys());
        if(listeners.length >= 1) {
            for (let i = (listeners.length - 1); i >= 0; i--) {
                const item = listeners[i];
                if (item) NotifyInstanceStore[notifyInstanceSymbol][name].unsubscribe(item);
            }
        }
        EventListenerStore[name].clear();
        delete EventListenerStore[name];
        delete EventTargetStore[name];
        delete NotifyInstanceStore[notifyInstanceSymbol][name];
    }
};
/**
 * Completely destroys the notification store, removing all instances and
 * their associated listeners.
 *
 * @function destroyStore
 * @returns {boolean} True if the store is destroyed successfully.
 */
const destroyStore = () => {
    const instances = Object.keys(NotifyInstanceStore[notifyInstanceSymbol]);
    if(instances.length >= 1) {
        for (let i = (instances.length - 1); i >= 0; i--) {
            const item = instances[i];
            if (item) destroyInstance(item);
        }
    }
    return true;
};
/**
 * Exposes the public API for creating notification instances and destroying
 * the notification store.
 *
 * @type {Readonly<{instance: function(string): SimplyBuilderNotifyStoreInterface, destroy: function(): boolean}>}
 */
export const NotifyStore = Object.freeze({
    instance: createInstance,
    destroy: destroyStore
});