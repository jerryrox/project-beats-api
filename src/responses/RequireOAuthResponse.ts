import ApiResponse from './ApiResponse';
import { ResponseType } from "../utils/Types";

/**
 * A response requiring OAuth to continue login.
 */
export default class RequireOAuthResponse extends ApiResponse {

    constructor(oauthUrl: string) {
        super({
            type: ResponseType.RequireOAuth,
            message: "Log in using OAuth.",
            data: {
                oauthUrl
            }
        });
    }
}