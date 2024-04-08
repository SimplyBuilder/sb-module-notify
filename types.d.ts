/**
 * Defines a class for creating event notification instances. These instances
 * are used to subscribe to events, emit events, and manage event listeners.
 *
 * @class SimplyBuilderNotifyStoreInterface
 */
declare class SimplyBuilderNotifyStoreInterface {
    constructor(name: any);
    event: string;
    /**
     * Subscribes a listener to this instance's event.
     *
     * @param {Object} data - The listener configuration.
     */
    subscribe(data?: any): void;
    /**
     * Unsubscribes a listener from this instance's event using its ID.
     *
     * @param {string} id - The ID of the listener to remove.
     * @returns {boolean} True if the listener is unsubscribed.
     */
    unsubscribe(id: string): boolean;
    /**
     * Emits an event with the provided data.
     *
     * @param {Object} data - The data to emit with the event.
     */
    emit(data?: any): void;
}
/**
 * Provides a public API for the NotifyModule, allowing users to create notification
 * instances, access module metadata, and clean up all notifications.
 *
 * @type {Readonly<{instance: function(string): SimplyBuilderNotifyStoreInterface, name: string, version: string, destroy: function(): void}>}
 */
export const NotifyModule: Readonly<{
    instance: (arg0: string) => SimplyBuilderNotifyStoreInterface;
    name: string;
    version: string;
    destroy: () => void;
}>;
