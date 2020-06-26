import ApiRequest from '../../requests/ApiRequest';
import OsuUtils from '../../api/osu/OsuUtils';
import MapsetsRequest from '../../requests/MapsetsRequest';
import { GameModeType, MapsetLanguageType, MapsetSortType } from '../../utils/Types';
import OsuApi from "../../api/osu/OsuApi";
import OsuMapsetsFormatter from '../../api/osu/formats/OsuMapsetsFormatter';

describe("OsuUtils", () => {
    test("getHeaderWithAuth", () => {
        const request = new ApiRequest({
            headers: {
                authorization: "Bearer heyeyeyeyey"
            }
        });
        let header = OsuUtils.getHeaderWithAuth(request, {
            anotherKey: "anotherValue"
        });
        expect(header).toMatchObject({
            Authorization: "Bearer heyeyeyeyey",
            anotherKey: "anotherValue"
        });

        header = OsuUtils.getHeaderWithAuth(request);
        expect(header).toMatchObject({
            Authorization: "Bearer heyeyeyeyey"
        });
    });

    test("getMapsetSearchUrl", () => {
        let request = new MapsetsRequest({
            query: {
                cursorId: "cid",
                cursorKey: "difficulty",
                "cursor[difficulty]": "5.5",
                mode: GameModeType.OsuStandard,
                language: MapsetLanguageType.Any,
                query: " chino",
                hasVideo: "true",
                hasStoryboard: true
            }
        });
        expect(
            OsuUtils.getMapsetSearchUrl(request)
        ).toBe(
            `${OsuApi.baseUrl}/beatmapsets/search?cursor%5B_id%5D=cid&cursor%5Bdifficulty%5D=5.5&q=chino&e=storyboard.video`
        );

        request = new MapsetsRequest({
            query: {
                sort: MapsetSortType.Ranked,
                isDescending: true
            }
        });
        expect(OsuUtils.getMapsetSearchUrl(request)).toBe(`${OsuApi.baseUrl}/beatmapsets/search`);

        request = new MapsetsRequest({
            query: {
                sort: MapsetSortType.Ranked,
                isDescending: false
            }
        });
        expect(OsuUtils.getMapsetSearchUrl(request)).toBe(`${OsuApi.baseUrl}/beatmapsets/search?sort=ranked_asc`);

        request = new MapsetsRequest({
            query: {
                sort: MapsetSortType.Title,
                isDescending: true
            }
        });
        expect(OsuUtils.getMapsetSearchUrl(request)).toBe(`${OsuApi.baseUrl}/beatmapsets/search?sort=title_desc`);

        request = new MapsetsRequest({
            query: {
                sort: MapsetSortType.Title,
                isDescending: false
            }
        });
        expect(OsuUtils.getMapsetSearchUrl(request)).toBe(`${OsuApi.baseUrl}/beatmapsets/search?sort=title_asc`);
    });
});