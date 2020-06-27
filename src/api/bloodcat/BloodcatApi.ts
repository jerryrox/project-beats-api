import IApi, { unsupportedRequest } from '../IApi';
import {
    mapsets,
    mapsetDownload
} from "./BloodcatMapsets";

const BloodcatApi: IApi = {
    baseUrl: "https://bloodcat.com/osu",

    auth: unsupportedRequest,
    authResponse: unsupportedRequest,

    me: unsupportedRequest,

    mapsets,
    mapsetDownload,
};
export default BloodcatApi;
