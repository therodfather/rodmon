# Rodmon API

A simple Node.js "Hello World" API with beautiful and informative terminal logging using Winston.

## TL;DR

- **Framework**: Node.js with Express
- **Logging**: Winston for beautiful, colorized console logs
- **Scripts**: `npm start` to run the server; `npm run start:debug` for verbose logs; `npm run demo` to exercise the logger without the server
- **Endpoint**: `GET /` returns "Hello World!"

## Setup and Usage

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the server**:
    ```bash
    npm start
    # or with debug logs
    npm run start:debug
    ```
    The server will start on `http://localhost:3000`.

3.  **Run the demo script (no server)**:
    ```bash
    npm run demo
    # or
    npm run demo:debug
    ```

## Logging Schema

The logging is configured in `logger.js` using the Winston library.

-   **`logger.js`**: This file sets up a custom Winston logger.
    -   It uses `winston.format.combine` to chain together several formatting options.
    -   `colorize()`: Applies colors to the entire log message.
    -   `timestamp()`: Adds a timestamp in the format `YYYY-MM-DD hh:mm:ss.SSS A`.
    -   `align()`: Aligns the log messages.
    -   `printf()`: A custom print function to format the final log output as `[timestamp] level: message`.
-   **`index.js`**: This file uses the logger to log incoming requests and server status.
    -   A middleware logs every request with a generated request id and response time in ms.
    -   New demo routes: `/debug`, `/warn`, `/error`, `/work` to exercise different log levels and stacks.
    -   A log message is printed when the server starts successfully.

### Log Format Example

```
[2025-07-17 12:33:57.622 PM] info: Server is running on http://localhost:3000
[2025-07-17 12:34:00.121 PM] info: [f9xk2a1p] Request received: GET /
[2025-07-17 12:34:00.246 PM] info: [f9xk2a1p] Response sent: GET / 200 (1.25 ms)
[2025-07-17 12:34:02.100 PM] warn: [q2w3e4r5] This is a warning about a deprecated endpoint
[2025-07-17 12:34:03.501 PM] error: [ab12cd34] Endpoint error occurred
Error: Simulated failure in /error endpoint
    at ...stack trace...
``` 