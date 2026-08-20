import { describe, expect, it } from "vitest";
import { add, clamp, parsePositiveInt } from "./math";

// describe("add", () => {
//   it("adds two numbers", () => {
//     expect(add(2, 3)).toBe(5);
//   });

//   it("handles negative numbers", () => {
//     expect(add(-1, 1)).toBe(0);
//   });
// });

describe("clamp", () => {
  it("returns value when within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  // it("clamps to min", () => {
  //   expect(clamp(-1, 0, 10)).toBe(0);
  // });

  // it("clamps to max", () => {
  //   expect(clamp(99, 0, 10)).toBe(10);
  // });

  // it("throws when min is greater than max", () => {
  //   expect(() => clamp(5, 10, 0)).toThrow(RangeError);
  // });
});

describe("parsePositiveInt", () => {
  it("parses valid positive integer", () => {
    expect(parsePositiveInt("42")).toBe(42);
  });

  // it("returns null for empty string", () => {
  //   expect(parsePositiveInt("")).toBeNull();
  //   expect(parsePositiveInt("   ")).toBeNull();
  // });

  // it("returns null for zero and negative", () => {
  //   expect(parsePositiveInt("0")).toBeNull();
  //   expect(parsePositiveInt("-5")).toBeNull();
  // });

  // it("returns null for non-numeric input", () => {
  //   expect(parsePositiveInt("abc")).toBeNull();
  // });
});
