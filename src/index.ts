import type { Region } from "@regions-of-indonesia/types";

const REGION_CODE_REGEXP = new RegExp(/^\d+(\.\d+)*$/);

const isTypeofObject = (value?: unknown): value is object | null => typeof value === "object";
const isTypeofString = (value?: unknown): value is string => typeof value === "string";

const isRegionCode = (value?: unknown): value is string => isTypeofString(value) && REGION_CODE_REGEXP.test(value);
const isRegionName = (value?: unknown): value is string => isTypeofString(value);

const isRegion = (value?: unknown): value is Region =>
  isTypeofObject(value) && value != null && "code" in value && "name" in value && isRegionCode(value.code) && isRegionName(value.name);

const joinRegionCode = (values: string[]) => values.join(".");
const splitRegionCode = (value: string) => value.split(".");

export { REGION_CODE_REGEXP };
export { isTypeofObject, isTypeofString };
export { isRegionCode, isRegionName, isRegion, joinRegionCode, splitRegionCode };
