import { afterEach, describe, expect, it, vi } from "vitest";

describe("logger", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs errors with timestamp prefix", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { logger } = await import("@/lib/logger");
    logger.error("something failed", { id: 1 });
    expect(spy).toHaveBeenCalledWith(
      expect.stringMatching(/\[\d{4}-\d{2}-\d{2}T.*\] \[ERROR\]/),
      "something failed",
      { id: 1 },
    );
  });

  it("respects NODE_ENV for info level", async () => {
    const originalEnv = process.env.NODE_ENV;
    try {
      process.env.NODE_ENV = "development";
      vi.resetModules();
      const { logger: devLogger } = await import("@/lib/logger");
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});
      devLogger.info("dev message");
      expect(spy).toHaveBeenCalled();

      spy.mockRestore();

      process.env.NODE_ENV = "production";
      vi.resetModules();
      const { logger: prodLogger } = await import("@/lib/logger");
      const spy2 = vi.spyOn(console, "log").mockImplementation(() => {});
      prodLogger.info("prod message");
      expect(spy2).not.toHaveBeenCalled();
    } finally {
      process.env.NODE_ENV = originalEnv;
      vi.resetModules();
    }
  });

  it("respects NODE_ENV for warn level", async () => {
    const originalEnv = process.env.NODE_ENV;
    try {
      process.env.NODE_ENV = "development";
      vi.resetModules();
      const { logger: devLogger } = await import("@/lib/logger");
      const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
      devLogger.warn("dev warning");
      expect(spy).toHaveBeenCalled();

      spy.mockRestore();

      process.env.NODE_ENV = "production";
      vi.resetModules();
      const { logger: prodLogger } = await import("@/lib/logger");
      const spy2 = vi.spyOn(console, "warn").mockImplementation(() => {});
      prodLogger.warn("prod warning");
      expect(spy2).not.toHaveBeenCalled();
    } finally {
      process.env.NODE_ENV = originalEnv;
      vi.resetModules();
    }
  });
});
