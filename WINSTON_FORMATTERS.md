# Winston Formatters and Schema Parameters

This guide provides an overview of common built-in Winston formatters and the parameters they add to the `info` object, which can then be used in your logging schema.

## Default Parameters

Every log entry starts with a base set of parameters on the `info` object:

-   `level` (string): The log level (e.g., `'info'`, `'error'`).
-   `message` (string): The primary log message.
-   `[Symbol.for('level')]` (string): The log level, used internally by Winston.
-   `[Symbol.for('message')]` (string): The formatted message, used internally.

---

## Common Built-in Formatters

Here are some of the most useful formatters available out-of-the-box. They are accessed via `winston.format`.

### 1. `timestamp()`

Adds a timestamp to the log entry.

-   **Parameter Added**: `timestamp` (string)
-   **Options**: You can pass a `format` string to specify the output format (e.g., `'YYYY-MM-DD HH:mm:ss'`).
-   **Implementation Example**:
    ```javascript
    const { createLogger, format } = require('winston');
    const { combine, timestamp, printf } = format;

    const logger = createLogger({
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
      // ...
    });
    ```

### 2. `colorize()`

Adds color to the output, which is extremely useful for readability in development.

-   **Parameter Added**: None directly. It modifies the `level` and `message` properties to include ANSI color codes.
-   **Options**: Pass `{ all: true }` to colorize the entire log message. By default, it only colorizes the level.
-   **Implementation Example**:
    ```javascript
    const { combine, colorize, printf } = format;

    const logger = createLogger({
      format: combine(
        colorize({ all: true }), // Colorizes the whole line
        printf(info => `${info.level}: ${info.message}`)
      ),
      // ...
    });
    ```

### 3. `json()`

Formats the entire log entry as a JSON string. This is very useful for production logging systems that ingest structured logs.

-   **Parameter Added**: None. It transforms the final output into JSON.
-   **Implementation Example**:
    ```javascript
    const { combine, timestamp, json } = format;

    const logger = createLogger({
      format: combine(
        timestamp(),
        json() // Formats the entire output as JSON
      ),
      // ...
    });
    // Output: {"level":"info","message":"Server started","timestamp":"2025-07-17T12:34:56.789Z"}
    ```

### 4. `label()`

Adds a label to your log entries, which is great for distinguishing logs from different parts of your application.

-   **Parameter Added**: `label` (string)
-   **Options**: Requires a `label` string (e.g., `{ label: 'API-Server' }`).
-   **Implementation Example**:
    ```javascript
    const { combine, label, timestamp, printf } = format;

    const logger = createLogger({
      format: combine(
        label({ label: 'API-Server' }),
        timestamp(),
        printf(info => `[${info.timestamp}] [${info.label}] ${info.level}: ${info.message}`)
      ),
      // ...
    });
    // Output: [2025-07-17 12:34:56.789] [API-Server] info: Server started
    ```

### 5. `splat()`

Enables string interpolation for your log messages. You can use placeholders like `%s` (string), `%d` (number), and `%j` (JSON).

-   **Parameter Added**: None directly. It formats the `message` property based on the placeholders.
-   **Implementation Example**:
    ```javascript
    const { combine, splat, printf } = format;

    const logger = createLogger({
      format: combine(
        splat(), // Must come before printf
        printf(info => info.message)
      ),
      // ...
    });

    // Usage:
    logger.info('Request from %s for resource %d', '127.0.0.1', 123);
    // Output: Request from 127.0.0.1 for resource 123
    ```

### 6. `errors()`

Automatically handles `Error` objects, ensuring the stack trace is included in the log output.

-   **Parameter Added**: `stack` (string) if an error object is logged.
-   **Options**: `{ stack: true }` will add the stack trace to the log.
-   **Implementation Example**:
    ```javascript
    const { combine, errors, json } = format;

    const logger = createLogger({
      format: combine(
        errors({ stack: true }), // Must be used to log the stack
        json()
      ),
      // ...
    });

    // Usage:
    try {
      throw new Error('Something went wrong!');
    } catch (e) {
      logger.error('Caught an error', e);
    }
    // Output will be a JSON object containing the error message and the full stack trace.
    ```

## Putting It All Together: A Complex Example

You can combine multiple formatters to create a rich, informative logging schema. The order matters, as they are applied sequentially.

```javascript
const { createLogger, format } = require('winston');
const { combine, timestamp, label, printf, colorize, splat } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    colorize(),
    label({ label: 'My-App' }),
    timestamp({ format: 'HH:mm:ss' }),
    splat(),
    myFormat
  ),
  // ...
});

logger.info('User %s logged in.', 'admin');
// Output: 14:30:15 [My-App] info: User admin logged in. (with colors)
``` 