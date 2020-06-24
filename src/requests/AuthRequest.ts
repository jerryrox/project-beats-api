import express from 'express';
import ApiRequest from './ApiRequest';

export default class AuthRequest extends ApiRequest {

    username: string | undefined;
    password: string | undefined;
    oauthState: string | undefined;
    oauthCode: string | undefined;


    constructor(req: express.Request) {
        super(req);

        this.username = req.body.username;
        this.password = req.body.password;
        this.oauthState = req.body.oauthState;
        this.oauthCode = req.body.oauthCode;
    }
}