import IApi, { unsupportedRequest } from '../IApi';

const BloodcatApi: IApi = {
    baseUrl: "http://bloodcat.com/osu",

    auth: unsupportedRequest,
    authResponse: unsupportedRequest,

    mapsets: unsupportedRequest,
    mapsetDownload: unsupportedRequest,
};
export default BloodcatApi;
