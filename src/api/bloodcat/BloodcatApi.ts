import IApi, { unsupportedRequest } from '../IApi';
import {
    mapsets,
    mapsetDownload
} from "./BloodcatMapsets";

const BloodcatApi: IApi = {
    baseUrl: "http://bloodcat.com/osu",

    auth: unsupportedRequest,
    authResponse: unsupportedRequest,

    mapsets,
    mapsetDownload,
};
export default BloodcatApi;
