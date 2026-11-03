import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("combines conditional and nested classes", () => {
    expect(cn("flex", ["items-center"], { hidden: false, "gap-2": true })).toBe(
      "flex items-center gap-2",
    );
  });

  it("allows callers to override conflicting Tailwind utilities", () => {
    expect(cn("px-4 py-2", "px-6")).toBe("py-2 px-6");
  });

  it("preserves independent responsive and focus variants", () => {
    expect(cn("px-2 sm:px-4 focus:ring-2", "sm:px-6")).toBe(
      "px-2 focus:ring-2 sm:px-6",
    );
  });

  it("accepts empty and false inputs", () => {
    expect(cn(undefined, null, false, "")).toBe("");
  });
});
