import ApiResponse from './ApiResponse';
import { ResponseType } from "../utils/Types";

/**
 * An interval server error response.
 */
export default class ErrorResponse extends ApiResponse {

    constructor(error: Error) {
        super({
            type: ResponseType.Error,
            message: error.message
        });
    }
}