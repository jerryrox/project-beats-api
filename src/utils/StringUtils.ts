
const StringUtils = {

    /**
     * Returns a string value with a capitalized first character.
     */
    capitalize(value: string) {
        return `${value.charAt(0).toUpperCase()}${value.substr(1)}`;
    }
};
export default StringUtils;