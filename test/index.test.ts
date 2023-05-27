import { describe, expect, it } from "vitest";

import {
  REGION_CODE_REGEXP,
  isTypeofObject,
  isTypeofString,
  isRegionCode,
  isRegionName,
  isRegion,
  joinRegionCode,
  splitRegionCode,
} from "../src";

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

  it("truthy", () => {
    REGION_CODE_MATCHES.forEach((code) => {
      expect(REGION_CODE_REGEXP.test(code)).toBeTruthy();
    });
  });

  it("falsy", () => {
    REGION_CODE_NOT_MATCHES.forEach((code) => {
      expect(REGION_CODE_REGEXP.test(code)).toBeFalsy();
    });
  });
});

describe("isTypeofObject", () => {
  it("type", () => {
    expect(isTypeofObject).toBeTypeOf("function");
    expect(isTypeofObject).toBeInstanceOf(Function);
  });

  it("truthy", () => {
    expect(isTypeofObject({})).toBeTruthy();
    expect(isTypeofObject(Object())).toBeTruthy();
    expect(isTypeofObject(null)).toBeTruthy();
  });

  it("falsy", () => {
    expect(isTypeofObject("")).toBeFalsy();
    expect(isTypeofObject(0)).toBeFalsy();
    expect(isTypeofObject(false)).toBeFalsy();
  });
});

describe("isTypeofString", () => {
  it("type", () => {
    expect(isTypeofString).toBeTypeOf("function");
    expect(isTypeofString).toBeInstanceOf(Function);
  });

  it("truthy", () => {
    expect(isTypeofString("")).toBeTruthy();
    expect(isTypeofString(String(""))).toBeTruthy();
  });

  it("falsy", () => {
    expect(isTypeofString({})).toBeFalsy();
    expect(isTypeofString(0)).toBeFalsy();
    expect(isTypeofString(false)).toBeFalsy();
  });
});

describe("isRegionCode", () => {
  it("type", () => {
    expect(isRegionCode).toBeTypeOf("function");
    expect(isRegionCode).toBeInstanceOf(Function);
  });

  it("truthy", () => {
    REGION_CODE_MATCHES.forEach((code) => {
      expect(isRegionCode(code)).toBeTruthy();
    });
  });

  it("falsy", () => {
    REGION_CODE_NOT_MATCHES.forEach((code) => {
      expect(isRegionCode(code)).toBeFalsy();
    });
  });
});

describe("isRegionName", () => {
  it("type", () => {
    expect(isRegionName).toBeTypeOf("function");
    expect(isRegionName).toBeInstanceOf(Function);
  });

  it("truthy", () => {
    expect(isRegionName("Region")).toBeTruthy();
    expect(isRegionName(String("Region"))).toBeTruthy();
  });

  it("falsy", () => {
    expect(isRegionName({})).toBeFalsy();
    expect(isRegionName(0)).toBeFalsy();
    expect(isRegionName(false)).toBeFalsy();
  });
});

describe("isRegion", () => {
  it("type", () => {
    expect(isRegion).toBeTypeOf("function");
    expect(isRegion).toBeInstanceOf(Function);
  });

  it("truthy", () => {
    expect(isRegion({ code: "1", name: "Region" })).toBeTruthy();
  });

  it("falsy", () => {
    expect(isRegion({})).toBeFalsy();
    expect(isRegion({ code: "1" })).toBeFalsy();
    expect(isRegion({ name: "Region" })).toBeFalsy();
    expect(isRegion({ code: "Region", name: "1" })).toBeFalsy();
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
