type LogLevel = "info" | "warn" | "error";

const isDev = process.env.NODE_ENV === "development";

function log(level: LogLevel, message: string, ...args: unknown[]) {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  if (level === "error") {
    console.error(prefix, message, ...args);
  } else if (level === "warn") {
    if (isDev) console.warn(prefix, message, ...args);
  } else {
    if (isDev) console.log(prefix, message, ...args);
  }
}

export const logger = {
  info: (message: string, ...args: unknown[]) => log("info", message, ...args),
  warn: (message: string, ...args: unknown[]) => log("warn", message, ...args),
  error: (message: string, ...args: unknown[]) => log("error", message, ...args),
};
