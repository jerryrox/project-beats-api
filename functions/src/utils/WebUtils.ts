import * as functions from "firebase-functions";

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

    handleCors(req: functions.Request, res: functions.Response): boolean {
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
        res.set("Access-Control-Allow-Headers", "*");

        if (req.method === "OPTIONS") {
            res.end();
            return true;
        }
        return false;
    },

    getHostname(req: functions.Request) {
        return req.header("host");
    },

    getRedirectionUrl(req: functions.Request, funcName: string) {
        return `https://${WebUtils.getHostname(req)}/${funcName}`;
    }
};
export default WebUtils;