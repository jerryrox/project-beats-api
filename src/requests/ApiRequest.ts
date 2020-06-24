import express from 'express';

export default class ApiRequest {

    req: express.Request;


    constructor(req: express.Request) {
        this.req = req;
    }
}