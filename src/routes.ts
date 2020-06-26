import express from "express";
import ApiGateway from './api/ApiGateway';

const routes = express.Router();

routes.post("/:provider/auth", (req, res) => {
    ApiGateway.getApi(req.params.provider).auth(req, res);
});
routes.get("/:provider/auth/response", (req, res) => {
    ApiGateway.getApi(req.params.provider).authResponse(req, res);
});

routes.get("/:provider/mapsets", (req, res) => {
    ApiGateway.getApi(req.params.provider).mapsets(req, res);
});
routes.get("/:provider/mapsets/:id/download", (req, res) => {
    ApiGateway.getApi(req.params.provider).mapsetDownload(req, res);
});

export default routes;