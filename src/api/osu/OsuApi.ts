import IApi from '../IApi';
import {
    auth,
    authResponse
} from "./OsuAuth";
import {
    me
} from "./OsuMe";
import {
    mapsets,
    mapsetDownload
} from "./OsuMapsets";

const OsuApi: IApi = {
    
    baseUrl: "https://osu.ppy.sh/api/v2",

    auth,
    authResponse,

    me,

    mapsets,
    mapsetDownload,
};
export default OsuApi;
