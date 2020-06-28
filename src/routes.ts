import express from "express";
import ApiGateway from './api/ApiGateway';
import SuccessResponse from './responses/SuccessResponse';
import ErrorResponse from './responses/failures/ErrorResponse';

const routes = express.Router();

routes.get("/test/success", (req, res) => {
    res.json(new SuccessResponse({
        data: req.query,
        message: "Test success"
    }));
});
routes.get("/test/fail", (req, res) => {
    res.json(new ErrorResponse(new Error("Test fail")));
});

routes.post("/:provider/auth", (req, res) => {
    ApiGateway.getApi(req.params.provider).auth(req, res);
});
routes.get("/:provider/auth/response", (req, res) => {
    ApiGateway.getApi(req.params.provider).authResponse(req, res);
});

routes.get("/:provider/me", (req, res) => {
    ApiGateway.getApi(req.params.provider).me(req, res);
});

routes.get("/:provider/mapsets", (req, res) => {
    ApiGateway.getApi(req.params.provider).mapsets(req, res);
});
routes.get("/:provider/mapsets/download", (req, res) => {
    ApiGateway.getApi(req.params.provider).mapsetDownload(req, res);
});

export default routes;