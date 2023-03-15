import { FunctionAction } from '../utils/Types';
import * as functions from "firebase-functions";
import UnsupportedResponse from "../responses/failures/UnsupportedResponse";

export async function unsupportedRequest(req: functions.Request, res: functions.Response) {
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
    auth: FunctionAction;
    /**
     * Special route for some API providers to redirect to if using OAuth.
     */
    authResponse: FunctionAction;

    /**
     * Route which returns the information of the user for the specific provider.
     */
    me: FunctionAction;

    /**
     * Route which is used for searching mapsets.
     */
    mapsets: FunctionAction;
    /**
     * Route which is used for downloading a specified mapset.
     */
    mapsetDownload: FunctionAction;
}
export default IApi;
