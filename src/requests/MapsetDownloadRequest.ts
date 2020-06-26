import express from 'express';

import ApiRequest from './ApiRequest';

/**
 * A request which represents mapset download.
 */
export default class MapsetDownloadRequest extends ApiRequest {

    mapsetId: string | undefined;


    constructor(req: express.Request | any) {
        super(req);

        this.mapsetId = req.params?.id;
    }

    /**
     * Asserts mapsetId's existence.
     * Throws an error if undefined or empty string.
     */
    assertMapsetId() {
        if (this.mapsetId === undefined || this.mapsetId.length <= 0) {
            throw new Error("Parameter 'id' must be valid.");
        }
    }
}