import { IMapset, IMap } from '../Types';
/**
 * Formatter which standardizes maps and mapsets' format.
 */
export default abstract class MapsetsFormatter {

    /**
     * Formats the specified data into a mapset.
     */
    abstract formatMapset(data: any): IMapset;

    /**
     * Formats the specified data into a map.
     */
    abstract formatMap(data: any): IMap;
}