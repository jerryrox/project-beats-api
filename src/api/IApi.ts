import express from 'express';

import { ExpressRoute } from '../utils/Types';
import UnsupportedResponse from '../responses/failures/UnsupportedResponse';

/**
 * A function for handling unsupported request.
 */
export function unsupportedRequest(req: express.Request, res: express.Response): void {
    res.json(new UnsupportedResponse());
}

/**
 * The interface which all API providers must implement.
 */
interface IApi {

    baseUrl: string;

    /**
     * Route which handles user login.
     */
    auth: ExpressRoute;
    /**
     * Special route for some API providers to redirect to if using OAuth.
     */
    authResponse: ExpressRoute;

    /**
     * Route which returns the information of the user for the specific provider.
     */
    me: ExpressRoute;

    /**
     * Route which is used for searching mapsets.
     */
    mapsets: ExpressRoute;
    /**
     * Route which is used for downloading a specified mapset.
     */
    mapsetDownload: ExpressRoute;
}
export default IApi;
