import ApiRequest from '../../requests/ApiRequest';
import OsuApi from "./OsuApi";
import MapsetsRequest from '../../requests/MapsetsRequest';
import WebUtils from '../../utils/WebUtils';
import OsuMapsetsFormatter from './formats/OsuMapsetsFormatter';
import {
    MapsetCategoryType, MapsetGenreType, MapsetLanguageType, MapsetSortType,
    GameModeType
} from '../../utils/Types';

const OsuUtils = {

    /**
     * Returns a header object for axios request which includes authorization key/value pair.
     */
    getHeaderWithAuth(request: ApiRequest, content?: any) {
        return {
            ...content,
            Authorization: `Bearer ${request.accessToken}`
        };
    },

    /**
     * Returns the url to osu mapset search endpoint including query parameters.
     */
    getMapsetSearchUrl(request: MapsetsRequest) {
        const formatter = new OsuMapsetsFormatter();
        let url = `${OsuApi.baseUrl}/beatmapsets/search`;
        if (request.cursorId !== undefined) {
            url = WebUtils.addQueryParam(url, "cursor[_id]", request.cursorId);
        }
        if (request.cursorKey !== undefined && request.cursorValue !== undefined) {
            url = WebUtils.addQueryParam(url, `cursor[${request.cursorKey}]`, request.cursorValue);
        }
        if (request.mode !== undefined && request.mode !== GameModeType.OsuStandard) {
            url = WebUtils.addQueryParam(url, "m", formatter.modeConverter.getValue(request.mode));
        }
        if (request.category !== undefined && request.category !== MapsetCategoryType.Any) {
            url = WebUtils.addQueryParam(url, "s", formatter.categoryConverter.getValue(request.category));
        }
        if (request.genre !== undefined && request.genre !== MapsetGenreType.Any) {
            url = WebUtils.addQueryParam(url, "g", formatter.genreConverter.getValue(request.genre));
        }
        if (request.language !== undefined && request.language !== MapsetLanguageType.Any) {
            url = WebUtils.addQueryParam(url, "l", formatter.languageConverter.getValue(request.language));
        }
        if (request.query !== undefined && request.query.length > 0) {
            url = WebUtils.addQueryParam(url, "q", request.query);
        }
        if (request.sort !== undefined && (request.sort !== MapsetSortType.Ranked || !request.isDescending)) {
            url = WebUtils.addQueryParam(url, "sort", `${formatter.sortConverter.getValue(request.sort)}_${request.isDescending ? "desc" : "asc"}`);
        }
        if (request.hasVideo === true && request.hasStoryboard === true) {
            url = WebUtils.addQueryParam(url, "e", "storyboard.video");
        }
        else if (request.hasVideo === true) {
            url = WebUtils.addQueryParam(url, "e", "video");
        }
        else if (request.hasStoryboard === true) {
            url = WebUtils.addQueryParam(url, "e", "storyboard");
        }
        return url;
    }
};
export default OsuUtils;