import ApiResponse from './ApiResponse';
import { ResponseType } from "../utils/Types";

interface IOAuthSuccessResponseParam {
    accessToken: string,
    refreshToken?: string,
    expiresIn?: number,
}

export default class OAuthSuccessResponse extends ApiResponse {

    constructor(param: IOAuthSuccessResponseParam) {
        super({
            type: ResponseType.OAuthSuccess,
            data: param
        });
    }
}