import express from 'express';

import { ExpressRoute } from '../utils/Types';
import UnsupportedResponse from '../responses/UnsupportedResponse';

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

    auth: ExpressRoute;
    authResponse: ExpressRoute;
}
export default IApi;
