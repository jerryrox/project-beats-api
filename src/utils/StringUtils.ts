
const StringUtils = {

    /**
     * Returns a string value with a capitalized first character.
     */
    capitalize(value: string) {
        return `${value.charAt(0).toUpperCase()}${value.substr(1)}`;
    },

    /**
     * Tries parsing the specified number and returns it if successful.
     * Otherwise, a default value or 0 will be returned.
     */
    tryParseNumber(value: string | undefined, defaultValue?: number): number {
        if (value === undefined) {
            return defaultValue || 0;
        }
        
        const num = parseFloat(value);
        if (Number.isNaN(num)) {
            return defaultValue || 0;
        }
        return num;
    }
};
export default StringUtils;