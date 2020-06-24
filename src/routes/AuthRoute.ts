import express from "express";
import ApiGateway from '../api/ApiGateway';

const AuthRoute = express.Router();

AuthRoute.get("/", (req, res) => {
    ApiGateway.getApi(req.params.provider).auth(req, res);
});

AuthRoute.get("/response", (req, res) => {
    ApiGateway.getApi(req.params.provider).authResponse(req, res);
});

export default AuthRoute;