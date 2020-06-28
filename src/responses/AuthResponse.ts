import ApiResponse from './ApiResponse';
import { ResponseType } from "../utils/Types";

interface IAuthResponseParam {
    provider: string,
    accessToken: string
}

export default class AuthResponse extends ApiResponse {

    constructor(param: IAuthResponseParam) {
        super({
            type: ResponseType.Auth,
            data: param
        });
    }
}