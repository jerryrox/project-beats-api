const WebUtils = {

    /**
     * Adds a query parameter to the given url.
     */
    addQueryParam(url: string, key: any, value: any) {
        const param = `${encodeURIComponent(String(key))}=${encodeURIComponent(String(value))}`;
        if (url.indexOf("?") < 0) {
            return `${url}?${param}`;
        }
        if (url.endsWith("&")) {
            return `${url}${param}`;
        }
        return `${url}&${param}`;
    },
};
export default WebUtils;