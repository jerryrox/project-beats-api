import StringUtils from '../utils/StringUtils';

describe("StringUtils", () => {
    test("capitalize", () => {
        expect(StringUtils.capitalize("asdf")).toBe("Asdf");
        expect(StringUtils.capitalize("1asdf")).toBe("1asdf");
    });

    test("tryParseNumber", () => {
        expect(StringUtils.tryParseNumber(undefined)).toBe(0);
        expect(StringUtils.tryParseNumber("asdf")).toBe(0);
        expect(StringUtils.tryParseNumber("asdf", 1)).toBe(1);
        expect(StringUtils.tryParseNumber("5.123")).toBe(5.123);
        expect(StringUtils.tryParseNumber(".36")).toBe(0.36);
        expect(StringUtils.tryParseNumber("1", 2)).toBe(1);
    });
});