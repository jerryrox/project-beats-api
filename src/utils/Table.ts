
type TableRecordType = string | number;

export default class Table {

    private obj: Record<TableRecordType, any>;


    constructor(obj: Record<TableRecordType, any>) {
        this.obj = obj;
    }

    /**
     * Returns whether the specified key exists in the table.
     */
    containsKey(key: TableRecordType) {
        return Object.keys(this.obj).indexOf(String(key)) >= 0;
    }

    /**
     * Returns whether the specified value exists in the table.
     */
    containsValue(value: any) {
        return Object.values(this.obj).indexOf(value) >= 0;
    }

    /**
     * Returns the value for specified key.
     */
    getValue(key: TableRecordType): any | undefined {
        return this.obj[key];
    }

    /**
     * Returns the first encountered key for specified value.
     */
    getKey(value: any) {
        const keys = Object.keys(this.obj);
        for (let i = 0; i < keys.length; i++) {
            if (this.obj[keys[i]] === value) {
                return keys[i];
            }
        }
        return undefined;
    }
}