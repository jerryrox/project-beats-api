import ApiResponse from './ApiResponse';
import { ResponseType } from "../utils/Types";

interface IMeResponseParam {
    id: string,
    username: string,
    avatarImage?: string,
    coverImage?: string,
    status?: string,
    profilePage?: string
}

export default class MeResponse extends ApiResponse {

    constructor(param: IMeResponseParam) {
        super({
            type: ResponseType.Me,
            data: param
        });
    }
}