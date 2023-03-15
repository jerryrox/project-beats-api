import ApiRequest from './ApiRequest';
import * as functions from "firebase-functions";

export default class AuthRequest extends ApiRequest {

    username: string | undefined;
    password: string | undefined;


    constructor(req: functions.Request) {
        super(req);

        this.username = req.body.username;
        this.password = req.body.password;
    }
}