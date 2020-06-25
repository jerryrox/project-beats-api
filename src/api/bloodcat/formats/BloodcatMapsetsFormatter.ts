import MapsetsFormatter from '../../../utils/formats/MapsetsFormatter';
import { IMapset, IMap } from '../../../utils/Types';
import DateUtils from "../../../utils/DateUtils";
import StringUtils from '../../../utils/StringUtils';


export default class BloodcatMapsetsFormatter extends MapsetsFormatter {

    /**
     * Parses the specified status value to a displayed string format.
     */
    parseStatus(status: string | number | undefined) {
        if (status === "1" || status === 1) {
            return "Ranked";
        }
        if (status === "2" || status === 2) {
            return "Approved";
        }
        if (status === "3" || status === 3) {
            return "Qualified";
        }
        if (status === "4" || status === 4) {
            return "Loved";
        }
        return "Unranked";
    }

    formatMapset(data: any): IMapset {
        const maps = data.beatmaps.map((b: any) => this.formatMap(b));

        const hasValidId = typeof (data.id) === "string" && data.id.length > 0;

        return {
            id: StringUtils.tryParseNumber(data.id),
            title: data.title,
            artist: data.artist,
            creator: data.creator,
            source: data.source,
            tags: data.tags,
            coverImage: hasValidId ? `https://assets.ppy.sh/beatmaps/${data.id}/covers/cover.jpg?${DateUtils.getUnixTime()}` : undefined,
            cardImage: hasValidId ? `https://assets.ppy.sh/beatmaps/${data.id}/covers/card.jpg?${DateUtils.getUnixTime()}` : undefined,
            previewAudio: hasValidId ? `https://b.ppy.sh/preview/${data.id}.mp3` : undefined,
            hasVideo: false,
            hasStoryboard: false,
            bpm: maps[0].bpm,
            playCount: 0,
            favoriteCount: 0,
            lastUpdate: new Date(data.synced),
            status: StringUtils.capitalize(this.parseStatus(data.status)),
            isDisabled: false,
            disabledInformation: null,
            maps
        };
    }

    formatMap(data: any): IMap {
        return {
            id: StringUtils.tryParseNumber(data.id),
            version: data.name,
            mode: StringUtils.tryParseNumber(data.mode),
            difficulty: StringUtils.tryParseNumber(data.star),
            totalDuration: StringUtils.tryParseNumber(data.length),
            hitDuration: StringUtils.tryParseNumber(data.length),
            bpm: StringUtils.tryParseNumber(data.bpm),
            cs: StringUtils.tryParseNumber(data.cs),
            drain: StringUtils.tryParseNumber(data.hp),
            accuracy: StringUtils.tryParseNumber(data.od),
            ar: StringUtils.tryParseNumber(data.ar),
            circleCount: 0,
            sliderCount: 0,
            spinnerCount: 0,
            totalCount: 0,
        };
    }
}