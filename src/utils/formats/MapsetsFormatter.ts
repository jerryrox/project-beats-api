import { IMapset, IMap } from '../Types';
import Table from '../Table';

/**
 * Formatter which standardizes maps/mapsets' format and converts query parameters to be compatible between API providers and pb-api.
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
     * Formats the specified data into a mapset.
     */
    abstract formatMapset(data: any): IMapset;

    /**
     * Formats the specified data into a map.
     */
    abstract formatMap(data: any): IMap;
}