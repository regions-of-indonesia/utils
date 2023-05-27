import { describe, expect, it } from "vitest";

import { REGION_CODE_REGEXP, isRegionCode, joinRegionCode, splitRegionCode } from "../src";

const JOINED_REGION_CODES = [
  "1",
  "1.2",
  "1.2.3",
  "1.2.3.4",
  "1.2.3.4.5",
  "1.2.3.4.5.6",
  //
  "0.0.0.0",
  "01.02.03.04",
];

const SPLITTED_REGION_CODES = [
  ["1"],
  ["1", "2"],
  ["1", "2", "3"],
  ["1", "2", "3", "4"],
  ["1", "2", "3", "4", "5"],
  ["1", "2", "3", "4", "5", "6"],
  //
  ["0", "0", "0", "0"],
  ["01", "02", "03", "04"],
];

const REGION_CODE_MATCHES = [
  "1",
  "1.2",
  "1.2.3",
  "1.2.3.4",
  "1.2.3.4.5",
  "1.2.3.4.5.6",
  //
  "0.0.0.0",
  "01.02.03.04",
];
const REGION_CODE_NOT_MATCHES = [
  "",
  ".",
  "1.",
  ".1",
  "1.2.",
  ".1.2",
  "1..2",
  //
  "a.",
  ".a",
  "a.b.",
  ".a.b",
  "a..b",
  //
  "1x",
  "x1",
  "1x2.",
  ".1x2",
  "1xx2",
  //
  "1!",
  "!1",
  "1!2.",
  ".1!2",
  "1!!2",
  //
  "!",
  "!.@",
  "!.@.#",
  "!.@.#.$",
];

describe("REGION_CODE_REGEXP", () => {
  it("type", () => {
    expect(REGION_CODE_REGEXP).toBeTypeOf("object");
    expect(REGION_CODE_REGEXP).toBeInstanceOf(RegExp);
  });

  it("test() matches", () => {
    REGION_CODE_MATCHES.forEach((code) => {
      expect(REGION_CODE_REGEXP.test(code)).toBeTruthy();
    });
  });

  it("test() not matches", () => {
    REGION_CODE_NOT_MATCHES.forEach((code) => {
      expect(REGION_CODE_REGEXP.test(code)).toBeFalsy();
    });
  });
});

describe("isRegionCode", () => {
  it("type", () => {
    expect(isRegionCode).toBeTypeOf("function");
    expect(isRegionCode).toBeInstanceOf(Function);
  });

  it("() matches", () => {
    REGION_CODE_MATCHES.forEach((code) => {
      expect(isRegionCode(code)).toBeTruthy();
    });
  });

  it("() not matches", () => {
    REGION_CODE_NOT_MATCHES.forEach((code) => {
      expect(isRegionCode(code)).toBeFalsy();
    });
  });
});

describe("joinRegionCode", () => {
  it("type", () => {
    expect(joinRegionCode).toBeTypeOf("function");
    expect(joinRegionCode).toBeInstanceOf(Function);
  });

  it("equal", () => {
    SPLITTED_REGION_CODES.forEach((element, index) => {
      expect(joinRegionCode(...element)).toEqual(JOINED_REGION_CODES[index]);
    });
  });
});

describe("splitRegionCode", () => {
  it("type", () => {
    expect(splitRegionCode).toBeTypeOf("function");
    expect(splitRegionCode).toBeInstanceOf(Function);
  });

  it("equal", () => {
    JOINED_REGION_CODES.forEach((element, index) => {
      expect(splitRegionCode(element)).toEqual(SPLITTED_REGION_CODES[index]);
    });
  });
});
