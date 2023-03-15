import * as functions from "firebase-functions";
import WebUtils from "./utils/WebUtils";
import SuccessResponse from "./responses/SuccessResponse";
import ErrorResponse from "./responses/failures/ErrorResponse";
import ApiGateway from "./api/ApiGateway";
import * as admin from "firebase-admin";

admin.initializeApp({
    projectId: "project-beats-6f707",
});

type HttpsFunction<T = any> = (req: functions.Request, res: functions.Response) => Promise<any>;
const buildFunction = <T = any>(action: HttpsFunction) => {
    return functions
        .region("asia-northeast3")
        .runWith({
            timeoutSeconds: 360,
        })
        .https
        .onRequest(async (req, res) => {
            if (WebUtils.handleCors(req, res)) {
                return;
            }

            await action(req, res);
        });
};

export const testSuccess = buildFunction(async (req, res) => {
    res.json(new SuccessResponse({
        data: req.query,
        message: "Test success",
    }));
});

export const testFail = buildFunction(async (req, res) => {
    res.json(new ErrorResponse(new Error("Test fail")));
});

export const bloodcatAuth = buildFunction(async (req, res) => {
    await ApiGateway.getApi("bloodcat").auth(req, res);
});
export const osuAuth = buildFunction(async (req, res) => {
    await ApiGateway.getApi("osu").auth(req, res);
});
export const osuAuthResponse = buildFunction(async (req, res) => {
    await ApiGateway.getApi("osu").authResponse(req, res);
});

export const bloodcatMe = buildFunction(async (req, res) => {
    await ApiGateway.getApi("bloodcat").me(req, res);
});
export const osuMe = buildFunction(async (req, res) => {
    await ApiGateway.getApi("osu").me(req, res);
});

export const bloodcatMapsets = buildFunction(async (req, res) => {
    await ApiGateway.getApi("bloodcat").mapsets(req, res);
});
export const osuMapsets = buildFunction(async (req, res) => {
    await ApiGateway.getApi("osu").mapsets(req, res);
});

export const bloodcatMapsetDownload = buildFunction(async (req, res) => {
    await ApiGateway.getApi("bloodcat").mapsetDownload(req, res);
});
export const osuMapsetDownload = buildFunction(async (req, res) => {
    await ApiGateway.getApi("osu").mapsetDownload(req, res);
});