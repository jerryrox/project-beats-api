import ApiResponse from './ApiResponse';
import { ResponseType } from "../utils/Types";

/**
 * A response requiring login to perform the API call.
 */
export default class RequireLoginResponse extends ApiResponse {

    constructor() {
        super({
            type: ResponseType.RequireLogin,
            message: "You must be logged in first."
        });
    }
}