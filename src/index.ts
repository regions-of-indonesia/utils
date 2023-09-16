import type { Region } from "@regions-of-indonesia/types";

const REGION_CODE_REGEXP = new RegExp(/^\d+(\.\d+)*$/);

/**
 *
 * @param value string
 * @returns valid region code
 */
const isRegionCode = (value?: unknown): value is string => typeof value === "string" && REGION_CODE_REGEXP.test(value);

/**
 *
 * @param value string
 * @returns valid region name
 */
const isRegionName = (value?: unknown): value is string => typeof value === "string";

/**
 *
 * @param value region
 * @returns valid region
 */
const isRegion = (value?: unknown): value is Region =>
  typeof value === "object" && value != null && "code" in value && "name" in value && isRegionCode(value.code) && isRegionName(value.name);

/**
 *
 * @param value regions
 * @returns valid regions
 */
const isRegions = (value?: unknown): value is Region[] => Array.isArray(value) && value.every(isRegion);

/**
 *
 * @param values splitted code
 * @returns joined code
 *
 * @example
 * joinRegionCode(["11", "01", "01", "2001"]); // "11.01.01.2001"
 */
const joinRegionCode = (values: string[]) => values.join(".");

/**
 *
 * @param value joined code
 * @returns splitted code
 *
 * @example
 * splitRegionCode("11.01.01.2001"); // ["11", "01", "01", "2001"]
 */
const splitRegionCode = (value: string) => value.split(".");

export { REGION_CODE_REGEXP };
export { isRegionCode, isRegionName, isRegion, isRegions, joinRegionCode, splitRegionCode };
