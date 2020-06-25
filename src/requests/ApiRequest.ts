import express from 'express';

export default class ApiRequest {

    req: express.Request;
    accessToken: string | undefined;


    constructor(req: express.Request | any) {
        this.req = req;

        this.accessToken = req.body?.accessToken;
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