# Rodmon API

A simple Node.js "Hello World" API with beautiful and informative terminal logging using Winston.

## TL;DR

- **Framework**: Node.js with Express
- **Logging**: Winston for beautiful, colorized console logs
- **Scripts**: `npm start` to run the server
- **Endpoint**: `GET /` returns "Hello World!"

## Setup and Usage

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the server**:
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3000`.

## Logging Schema

The logging is configured in `logger.js` using the Winston library.

-   **`logger.js`**: This file sets up a custom Winston logger.
    -   It uses `winston.format.combine` to chain together several formatting options.
    -   `colorize()`: Applies colors to the entire log message.
    -   `timestamp()`: Adds a timestamp in the format `YYYY-MM-DD hh:mm:ss.SSS A`.
    -   `align()`: Aligns the log messages.
    -   `printf()`: A custom print function to format the final log output as `[timestamp] level: message`.
-   **`index.js`**: This file uses the logger to log incoming requests and server status.
    -   A middleware is used to log every incoming request with its method and URL.
    -   A log message is printed when the server starts successfully.

### Log Format Example

```
[2025-07-17 12:33:57.622 PM] info:      Server is running on http://localhost:3000
[2025-07-17 12:34:00.121 PM] info:      Request received: GET /
``` 