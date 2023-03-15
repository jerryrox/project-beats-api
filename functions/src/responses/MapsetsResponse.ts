import ApiResponse from './ApiResponse';
import { IMapset, ResponseType } from '../utils/Types';

interface IMapsetsResponseParam {
    mapsets: IMapset[],
    cursor: any | null,
    total?: number
}

/**
 * Response which returns the specified array of mapsets.
 */
export default class MapsetsResponse extends ApiResponse {

    constructor(param: IMapsetsResponseParam) {
        super({
            type: ResponseType.Mapsets,
            data: {
                mapsets: param.mapsets,
                cursor: param.cursor,
                total: param.total
            }
        });
    }
}