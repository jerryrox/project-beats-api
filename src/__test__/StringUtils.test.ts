import StringUtils from '../utils/StringUtils';

describe("StringUtils", () => {
    test("capitalize", () => {
        expect(StringUtils.capitalize("asdf")).toBe("Asdf");
        expect(StringUtils.capitalize("1asdf")).toBe("1asdf");
    });
});