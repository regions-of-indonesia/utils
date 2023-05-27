const REGION_CODE_REGEXP = new RegExp(/^\d+(\.\d+)*$/);

const isRegionCode = (value?: unknown): value is string => typeof value === "string" && REGION_CODE_REGEXP.test(value);

const joinRegionCode = (...values: string[]) => values.join(".");
const splitRegionCode = (value: string) => value.split(".");

export { REGION_CODE_REGEXP };
export { isRegionCode, joinRegionCode, splitRegionCode };
