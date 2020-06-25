import OsuMapsetsFormatter from '../../api/osu/formats/OsuMapsetsFormatter';

const testMapset = {
    "artist": "Chino (CV:Minase Inori)",
    "covers": {
        "cover": "https://assets.ppy.sh/beatmaps/458983/covers/cover.jpg?1521109474",
        "cover@2x": "https://assets.ppy.sh/beatmaps/458983/covers/cover@2x.jpg?1521109474",
        "card": "https://assets.ppy.sh/beatmaps/458983/covers/card.jpg?1521109474",
        "card@2x": "https://assets.ppy.sh/beatmaps/458983/covers/card@2x.jpg?1521109474",
        "list": "https://assets.ppy.sh/beatmaps/458983/covers/list.jpg?1521109474",
        "list@2x": "https://assets.ppy.sh/beatmaps/458983/covers/list@2x.jpg?1521109474",
        "slimcover": "https://assets.ppy.sh/beatmaps/458983/covers/slimcover.jpg?1521109474",
        "slimcover@2x": "https://assets.ppy.sh/beatmaps/458983/covers/slimcover@2x.jpg?1521109474"
    },
    "creator": "Asahina Momoko",
    "favourite_count": 285,
    "id": 458983,
    "play_count": 258997,
    "preview_url": "//b.ppy.sh/preview/458983.mp3",
    "source": "ご注文はうさぎですか？？",
    "status": "ranked",
    "title": "Mahou Shoujo Chino (nenpulse bootleg remix)",
    "user_id": 3650145,
    "video": false,
    "availability": {
        "download_disabled": false,
        "more_information": null
    },
    "bpm": 176,
    "can_be_hyped": false,
    "discussion_enabled": false,
    "discussion_locked": false,
    "hype": {
        "current": 0,
        "required": 5
    },
    "is_scoreable": true,
    "last_updated": "2017-06-08T19:19:30+00:00",
    "legacy_thread_url": "https://osu.ppy.sh/community/forums/topics/457424",
    "nominations": {
        "current": 0,
        "required": 2
    },
    "ranked": 1,
    "ranked_date": "2017-06-17T21:00:17+00:00",
    "storyboard": false,
    "submitted_date": "2016-05-22T03:05:34+00:00",
    "tags": "gochuumon wa usagi desuka?? gochiusa is the order a rabbit?? cup of chino clsw mokori m_o_k_o_r_i",
    "beatmaps": [
        {
            "difficulty_rating": 5.69,
            "id": 1043170,
            "mode": "osu",
            "version": "cappuChino!!",
            "accuracy": 8.8,
            "ar": 9.3,
            "beatmapset_id": 458983,
            "bpm": 176,
            "convert": false,
            "count_circles": 1008,
            "count_sliders": 585,
            "count_spinners": 3,
            "count_total": 2187,
            "cs": 4,
            "deleted_at": null,
            "drain": 6.6,
            "hit_length": 315,
            "is_scoreable": true,
            "last_updated": "2017-06-08T19:19:31+00:00",
            "mode_int": 0,
            "passcount": 18748,
            "playcount": 231463,
            "ranked": 1,
            "status": "ranked",
            "total_length": 324,
            "url": "https://osu.ppy.sh/beatmaps/1043170",
            "max_combo": 2234
        }
    ]
};

const testMap = {
    "difficulty_rating": 5.69,
    "id": 1043170,
    "mode": "osu",
    "version": "cappuChino!!",
    "accuracy": 8.8,
    "ar": 9.3,
    "beatmapset_id": 458983,
    "bpm": 176,
    "convert": false,
    "count_circles": 1008,
    "count_sliders": 585,
    "count_spinners": 3,
    "count_total": 2187,
    "cs": 4,
    "deleted_at": null,
    "drain": 6.6,
    "hit_length": 315,
    "is_scoreable": true,
    "last_updated": "2017-06-08T19:19:31+00:00",
    "mode_int": 0,
    "passcount": 18748,
    "playcount": 231463,
    "ranked": 1,
    "status": "ranked",
    "total_length": 324,
    "url": "https://osu.ppy.sh/beatmaps/1043170",
    "max_combo": 2234
};

describe("OsuMapsetsFormatter", () => {
    test("formatMap", () => {
        const formatter = new OsuMapsetsFormatter();
        const map = formatter.formatMap(testMap);
        expect(map.id).toBe(1043170);
        expect(map.version).toBe("cappuChino!!");
        expect(map.mode).toBe(0);
        expect(map.difficulty).toBe(5.69);
        expect(map.totalDuration).toBe(324);
        expect(map.hitDuration).toBe(315);
        expect(map.bpm).toBe(176);
        expect(map.cs).toBe(4);
        expect(map.drain).toBe(6.6);
        expect(map.accuracy).toBe(8.8);
        expect(map.ar).toBe(9.3);
        expect(map.circleCount).toBe(1008);
        expect(map.sliderCount).toBe(585);
        expect(map.spinnerCount).toBe(3);
        expect(map.totalCount).toBe(2187);
    });
    test("formatMapset", () => {
        const formatter = new OsuMapsetsFormatter();
        const mapset = formatter.formatMapset(testMapset);
        expect(mapset.id).toBe(458983);
        expect(mapset.title).toBe("Mahou Shoujo Chino (nenpulse bootleg remix)");
        expect(mapset.artist).toBe("Chino (CV:Minase Inori)");
        expect(mapset.creator).toBe("Asahina Momoko");
        expect(mapset.source).toBe("ご注文はうさぎですか？？");
        expect(mapset.tags).toBe("gochuumon wa usagi desuka?? gochiusa is the order a rabbit?? cup of chino clsw mokori m_o_k_o_r_i");
        expect(mapset.coverImage).toBe("https://assets.ppy.sh/beatmaps/458983/covers/cover.jpg?1521109474");
        expect(mapset.cardImage).toBe("https://assets.ppy.sh/beatmaps/458983/covers/card.jpg?1521109474");
        expect(mapset.previewAudio).toBe("https://b.ppy.sh/preview/458983.mp3");
        expect(mapset.hasVideo).toBe(false);
        expect(mapset.hasStoryboard).toBe(false);
        expect(mapset.bpm).toBe(176);
        expect(mapset.playCount).toBe(258997);
        expect(mapset.favoriteCount).toBe(285);
        expect(mapset.lastUpdate).toMatchObject(new Date("2017-06-08T19:19:30+00:00"));
        expect(mapset.status).toBe("Ranked");
        expect(mapset.isDisabled).toBe(false);
        expect(mapset.disabledInformation).toBeNull();
        expect(mapset.maps.length).toBe(1);

        const map = mapset.maps[0];
        expect(map.id).toBe(1043170);
        expect(map.version).toBe("cappuChino!!");
        expect(map.mode).toBe(0);
        expect(map.difficulty).toBe(5.69);
        expect(map.totalDuration).toBe(324);
        expect(map.hitDuration).toBe(315);
        expect(map.bpm).toBe(176);
        expect(map.cs).toBe(4);
        expect(map.drain).toBe(6.6);
        expect(map.accuracy).toBe(8.8);
        expect(map.ar).toBe(9.3);
        expect(map.circleCount).toBe(1008);
        expect(map.sliderCount).toBe(585);
        expect(map.spinnerCount).toBe(3);
        expect(map.totalCount).toBe(2187);
    });
});