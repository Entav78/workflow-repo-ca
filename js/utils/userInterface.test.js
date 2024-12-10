import { describe, it, expect, beforeEach, vi } from "vitest";
import { isActivePath } from "./userInterface.js";
import { getUsername } from "./storage.js";

describe("isActivePath", () => {
  it("returns true when current path matches href exactly", () => {
    expect(isActivePath("/login", "/login")).toBe(true);
  });

  it("returns true for root path ('/') when path is '/' or '/index.html'", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/", "/index.html")).toBe(true);
  });

  it("returns true when current path includes the href", () => {
    expect(isActivePath("/venue", "/venue")).toBe(true);
  });

  it("returns false when paths don’t match", () => {
    expect(isActivePath("/register", "/login")).toBe(false);
  });
});

describe("getUsername", () => {
  const mockUser = { name: "John Doe" };

  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key) => {
        return key === "user" ? JSON.stringify(mockUser) : null;
      }),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  it("returns the name from the user object in storage", () => {
    localStorage.setItem("user", JSON.stringify(mockUser));
    const username = getUsername();
    expect(username).toBe("John Doe");
  });

  it("returns null when no user exists in storage", () => {
    localStorage.getItem.mockReturnValue(null);
    const username = getUsername();
    expect(username).toBe(null);
  });
});
