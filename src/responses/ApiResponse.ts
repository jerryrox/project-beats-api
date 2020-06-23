export interface IBaseResponseParam {
    success: boolean,
    data?: any,
    message?: string
}

export default class ApiResponse {

    success: boolean;
    data: any | undefined;
    message: string | undefined;


    constructor(param: IBaseResponseParam) {
        this.success = param.success;
        this.data = param.data;
        this.message = param.message;
    }
}