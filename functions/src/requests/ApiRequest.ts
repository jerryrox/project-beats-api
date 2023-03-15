import * as functions from "firebase-functions";
export default class ApiRequest {

    req: functions.Request;
    accessToken: string | undefined;


    constructor(req: functions.Request | any) {
        this.req = req;

        this.accessToken = this.parseAccessToken(req.headers?.authorization);
    }

    /**
     * Parses access token from specified string.
     */
    parseAccessToken(value: string | undefined) {
        if (value === undefined) {
            return undefined;
        }
        if (!(/^Bearer [a-zA-Z0-9-_.]+$/.test(value))) {
            return undefined;
        }
        return value.substr(7);
    }

    /**
     * Throws an error if the access token is invalid.
     */
    assertAccessToken() {
        if (this.accessToken === undefined || this.accessToken.length === 0) {
            throw new Error("This API request requires an access token.");
        }
    }
}