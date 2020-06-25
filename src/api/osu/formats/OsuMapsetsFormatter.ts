import MapsetsFormatter from '../../../utils/formats/MapsetsFormatter';
import { IMapset, IMap } from '../../../utils/Types';
import StringUtils from '../../../utils/StringUtils';

export default class OsuMapsetsFormatter extends MapsetsFormatter {

    formatMapset(data: any): IMapset {
        const maps = data.beatmaps.map((b: any) => this.formatMap(b));

        return {
            id: data.id,
            title: data.title,
            artist: data.artist,
            creator: data.creator,
            source: data.source,
            tags: data.tags,
            coverImage: data.covers?.cover,
            cardImage: data.covers?.card,
            previewAudio: `https:${data.preview_url}`,
            hasVideo: data.video,
            hasStoryboard: data.storyboard,
            bpm: data.bpm,
            playCount: data.play_count,
            favoriteCount: data.favourite_count,
            lastUpdate: new Date(data.last_updated),
            status: StringUtils.capitalize(data.status),
            isDisabled: data.availability?.download_disabled, // eslint-disable-line
            disabledInformation: data.availability?.more_information, // eslint-disable-line
            maps
        };
    }

    formatMap(data: any): IMap {
        return {
            id: data.id,
            version: data.version,
            mode: data.mode_int,
            difficulty: data.difficulty_rating,
            totalDuration: data.total_length,
            hitDuration: data.hit_length,
            bpm: data.bpm,
            cs: data.cs,
            drain: data.drain,
            accuracy: data.accuracy,
            ar: data.ar,
            circleCount: data.count_circles,
            sliderCount: data.count_sliders,
            spinnerCount: data.count_spinners,
            totalCount: data.count_total
        };
    }
}