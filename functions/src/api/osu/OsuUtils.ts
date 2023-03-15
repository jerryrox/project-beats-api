import ApiRequest from '../../requests/ApiRequest';

const OsuUtils = {

    /**
     * Returns a header object for axios request which includes authorization key/value pair.
     */
    getHeaderWithAuth(request: ApiRequest, content?: any) {
        return {
            ...content,
            Authorization: `Bearer ${request.accessToken}`
        };
    }
};
export default OsuUtils;