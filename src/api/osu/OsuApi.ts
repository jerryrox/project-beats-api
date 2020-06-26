import IApi from '../IApi';
import {
    auth,
    authResponse
} from "./OsuAuth";
import {
    mapsets,
    mapsetDownload
} from "./OsuMapsets";

const OsuApi: IApi = {
    
    baseUrl: "https://osu.ppy.sh/api/v2",

    auth,
    authResponse,

    mapsets,
    mapsetDownload,
};
export default OsuApi;
