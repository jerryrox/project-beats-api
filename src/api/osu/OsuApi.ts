import IApi from '../IApi';
import {
    auth,
    authResponse
} from "./OsuAuth";

const OsuApi: IApi = {
    
    baseUrl: "https://osu.ppy.sh/api/v2",

    auth,
    authResponse
};
export default OsuApi;
