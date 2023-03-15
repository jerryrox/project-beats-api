import ApiResponse from './ApiResponse';
import { ResponseType } from "../utils/Types";

interface ISuccessResponseParam {
    data?: any;
    message?: any;
}

/**
 * A general success response to the client.
 */
export default class SuccessResponse extends ApiResponse {

    constructor(param?: ISuccessResponseParam) {
        super({
            type: ResponseType.Success,
            data: param?.data,
            message: param?.message
        });
    }
}