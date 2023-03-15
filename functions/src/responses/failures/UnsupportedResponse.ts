import ErrorResponse from './ErrorResponse';

/**
 * A response returned when an unsupported route has been accessed.
 */
export default class UnsupportedResponse extends ErrorResponse {

    constructor() {
        super(new Error("This request is unsupported for the selected provider."));
    }
}