import Table from '../utils/Table';

describe("Table", () => {
    test("State", () => {
        const table = new Table({
            a: 1,
            b: 2,
            c: 3,
            ee: undefined
        });
        expect(table.containsKey("a")).toBeTruthy();
        expect(table.containsKey("b")).toBeTruthy();
        expect(table.containsKey("c")).toBeTruthy();
        expect(table.containsKey("d")).toBeFalsy();
        expect(table.containsKey(undefined)).toBeFalsy();

        expect(table.containsValue(1)).toBeTruthy();
        expect(table.containsValue(2)).toBeTruthy();
        expect(table.containsValue(3)).toBeTruthy();
        expect(table.containsValue(4)).toBeFalsy();
        expect(table.containsValue(undefined)).toBeTruthy();

        expect(table.getValue("a")).toBe(1);
        expect(table.getValue("b")).toBe(2);
        expect(table.getValue("c")).toBe(3);
        expect(table.getValue("d")).toBeUndefined();
        expect(table.getValue(undefined)).toBeUndefined();

        expect(table.getKey(1)).toBe("a");
        expect(table.getKey(2)).toBe("b");
        expect(table.getKey(3)).toBe("c");
        expect(table.getKey(4)).toBeUndefined();
        expect(table.getKey(undefined)).toBe("ee");
    });
});