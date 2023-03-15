import { IMapset, IMap } from '../Types';
import Table from '../Table';
import MapsetsRequest from '../../requests/MapsetsRequest';

/**
 * Formatter which standardizes maps/mapsets' format and converts query parameters to be compatible
 * between API providers and pb-api.
 */
export default abstract class MapsetsFormatter {

    /**
     * Game mode converter between pb-api and osu.
     */
    abstract readonly modeConverter: Table;

    /**
     * Mapset category converter between pb-api and osu.
     */
    abstract readonly categoryConverter: Table;

    /**
     * Mapset genre converter between pb-api and osu.
     */
    abstract readonly genreConverter: Table;

    /**
     * Mapset sort converter between pb-api and osu.
     */
    abstract readonly sortConverter: Table;

    /**
     * Mapset language converter between pb-api and osu.
     */
    abstract readonly languageConverter: Table;

    
    /**
     * Returns the url for searching mapset list optimized for the current API provider.
     */
    abstract getMapsetSearchUrl(request: MapsetsRequest): string;

    /**
     * Formats the specified cursor suitable for mapset search response.
     */
    formatCursorResponse(rawCursor: any): any {
        if (rawCursor === null || rawCursor === undefined) {
            return {};
        }

        const cursor: any = {};
        Object.keys(rawCursor).forEach((k) => {
            if (k.startsWith("cursor[")) {
                cursor[k] = String(rawCursor[k]);
            }
            else {
                cursor[`cursor[${k}]`] = String(rawCursor[k]);
            }
        });
        return cursor;
    }

    /**
     * Formats the specified data into a mapset.
     */
    abstract formatMapset(data: any): IMapset;

    /**
     * Formats the specified data into a map.
     */
    abstract formatMap(data: any): IMap;
}