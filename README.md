# Rodmon API

A simple Node.js "Hello World" API with beautiful and informative terminal logging using Winston.

## TL;DR

- **Framework**: Node.js with Express
- **Logging**: Winston for beautiful, colorized console logs
- **Scripts**: `npm start` to run the server; `npm run start:debug` for verbose logs; `npm run demo` to exercise the logger without the server; `npm run json-demo` for structured JSON logging demo
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

4.  **Run the JSON logging demo**:
    ```bash
    npm run json-demo
    # or
    npm run json-demo:debug
    ```

## Logging Schema

The logging is configured in `logger.js` using the Winston library.

-   **`logger.js`**: This file sets up a custom Winston logger with dual output.
    -   **Console Transport**: Human-readable, colorized logs with `colorize()`, `timestamp()`, `align()`, and `printf()`.
    -   **File Transport**: Structured JSON logs saved to `logs/app.log` with full error stack traces and metadata.
    -   **Error Handling**: `errors({ stack: true })` captures full stack traces for error objects.
    -   **String Interpolation**: `splat()` enables sprintf-style formatting (e.g., `%s`, `%d`, `%j`).
-   **`index.js`**: This file uses the logger to log incoming requests and server status.
    -   A middleware logs every request with a generated request id and response time in ms.
    -   New demo routes: `/debug`, `/warn`, `/error`, `/work` to exercise different log levels and stacks.
    -   A log message is printed when the server starts successfully.

### Log Format Examples

#### Console Output (Human-readable)
```
[2025-07-17 12:33:57.622 PM] info: Server is running on http://localhost:3000
[2025-07-17 12:34:00.121 PM] info: [f9xk2a1p] Request received: GET /
[2025-07-17 12:34:00.246 PM] info: [f9xk2a1p] Response sent: GET / 200 (1.25 ms)
[2025-07-17 12:34:02.100 PM] warn: [q2w3e4r5] This is a warning about a deprecated endpoint
[2025-07-17 12:34:03.501 PM] error: [ab12cd34] Endpoint error occurred
Error: Simulated failure in /error endpoint
    at ...stack trace...
```

#### JSON Output (logs/app.log)
```json
{
  "level": "error",
  "message": "Endpoint error occurred",
  "requestId": "ab12cd34",
  "endpoint": "/error",
  "method": "GET",
  "error": "Simulated failure in /error endpoint",
  "stack": "Error: Simulated failure in /error endpoint\n    at ...",
  "timestamp": "2025-07-17T12:34:03.501Z"
}
``` 