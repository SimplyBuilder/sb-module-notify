# @jamilservices/sb-module-notify

The `@jamilservices/sb-module-notify` provides a robust solution for managing event-driven notifications. This module encapsulates the functionality required to create, manage, and destroy notifications, ensuring a clean and maintainable interface for event handling.

#    
[![SimplyBuilder](https://img.shields.io/badge/Author-Gerv%C3%A1sio_J%C3%BAnior-brightgreen?style=flat-square&color=%23fedcba)](https://github.com/jamilservicos)
[![SimplyBuilder](https://img.shields.io/badge/SimplyBuilder-Module-brightgreen?style=flat-square&label=SimplyBuilder&color=%23fedcba)](https://simplybuilder.github.io)
[![SimplyBuilder - sb-module-notify](https://img.shields.io/static/v1?label=SimplyBuilder&message=sb-module-notify&color=blue&logo=github)](https://github.com/SimplyBuilder/sb-module-notify/tree/main)
[![GitHub License](https://img.shields.io/github/license/SimplyBuilder/sb-module-notify)](https://github.com/SimplyBuilder/sb-module-notify/tree/main/LICENSE)    


## Features

- **Centralized Event Management**: Centralizes the creation and management of event listeners, allowing for systematic handling of cross-component communication.
- **Simplified API**: Offers a simple API to subscribe to events, emit events, and clean up listeners with minimal code.
- **Module Integrity**: The API is frozen to prevent modifications at runtime, ensuring the reliability and security of the module.

## Installation

Install this module using pnpm, npm or yarn:

### pnpm

```bash
pnpm add @jamilservices/sb-module-notify
```

### yarn


```bash
npm install @jamilservices/sb-module-notify
```

### yarn

```bash
yarn add @jamilservices/sb-module-notify
```            

> [!NOTE]
> This will add the `@jamilservices/sb-module-notify` as a development dependency in your project.

### ESM Import Module

#### CDN:
You can use the following CDN links to include the module:
~~~text
https://cdn.skypack.dev/@jamilservices/sb-module-notify@latest/lib/main.min.js

https://cdn.jsdelivr.net/npm/@jamilservices/sb-module-notify@latest/lib/main.min.js

https://unpkg.com/@jamilservices/sb-module-notify@latest/lib/main.min.js
~~~  


#

## Usage

### Importing the Module


- from install (pnpm/npm/yarn):
```javascript
import { NotifyModule } from '@jamilservices/sb-module-notify';
```
                

- from cdn:
```javascript
import { NotifyModule } from 'https://cdn.jsdelivr.net/npm/@jamilservices/sb-module-notify@latest/lib/main.min.js';
```

### Creating/Retrieving a notification instance

```javascript
const notify = NotifyModule.instance("myEventName");
```

### Subscribing to an Event

```javascript
notify.subscribe({
    id: "uniqueListenerId",
    fn: data => console.log("Event data:", data)
});
```

### UnSubscribing to an Event

```javascript
notify.unsubscribe("uniqueListenerId");
```

### Emitting an Event

```javascript
notify.emit({ key: "value" });
```

### Destroying All Notifications

```javascript
NotifyModule.destroy();
```

## API Documentation

### `instance(name: string): SimplyBuilderNotifyStoreInterface`

- **Description**: Creates/retrieves and returns a new/existing notification instance associated with the specified event name.
- **Parameters**:
    - `name`: The name of the event channel.

### `destroy(): void`

- **Description**: Cleans up and removes all event listeners created through any instance of the notification module.



### Contribution Guidelines

Interested in contributing? We welcome your contributions to enhance the backend capabilities of `@jamilservices/sb-module-notify`.      
Please check our [Contribution Guidelines](https://github.com/SimplyBuilder/sb-module-notify/tree/main/CONTRIBUTING.md) for more details.

### License

`@jamilservices/sb-module-notify` is available under the [MIT License](https://github.com/SimplyBuilder/sb-module-notify/tree/main/LICENSE) by [@jamilservicos](https://github.com/jamilservicos).

- You are free to modify and reuse the code.
- The original license must be included with copies of this software.
- We encourage linking back to this repository if you use a significant portion of the source code.