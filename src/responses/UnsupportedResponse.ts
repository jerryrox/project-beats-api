import ApiResponse from './ApiResponse';
import { ResponseType } from "../utils/Types";

/**
 * A response returned when an unsupported route has been accessed.
 */
export default class UnsupportedResponse extends ApiResponse {

    constructor() {
        super({
            type: ResponseType.Unsupported,
            message: "This request is unsupported for the selected provider."
        });
    }
}