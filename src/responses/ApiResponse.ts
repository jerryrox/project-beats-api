import { ResponseType } from '../utils/Types';

export interface IBaseResponseParam {
    type: ResponseType,
    data?: any,
    message?: string,
}

/**
 * Defines the base format of all API responses sent to the client.
 */
export default class ApiResponse {

    type: ResponseType;
    data: any | undefined;
    message: string | undefined;


    constructor(param: IBaseResponseParam) {
        this.type = param.type;
        this.data = param.data;
        this.message = param.message;
    }
}