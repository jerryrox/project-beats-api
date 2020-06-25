import IApi from '../IApi';
import ApiRequest from '../../requests/ApiRequest';
import {
    auth,
    authResponse
} from "./OsuAuth";
import {
    mapsets,
    mapsetDownload
} from "./OsuMapsets";

interface IOsuApi extends IApi {
    getHeaderWithAuth(request: ApiRequest, content?: any): any
}

const OsuApi: IOsuApi = {
    
    baseUrl: "https://osu.ppy.sh/api/v2",

    getHeaderWithAuth(request: ApiRequest, content?: any) {
        return {
            ...content,
            Authorization: `Bearer ${request.accessToken}`
        };
    },

    auth,
    authResponse,

    mapsets,
    mapsetDownload,
};
export default OsuApi;
