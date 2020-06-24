import express from 'express';

export default class ApiRequest {

    req: express.Request;
    accessToken: string | undefined;


    constructor(req: express.Request) {
        this.req = req;

        this.accessToken = req.body.accessToken;
    }
}