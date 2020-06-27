import express from 'express';
import ApiResponse from '../responses/ApiResponse';
import WebUtils from './WebUtils';

/**
 * Utility for deeplinking between the game and this server.
 */
const DeepLinker = {

    /**
     * The scheme which the game should be listening to.
     */
    scheme: "pbgame://",

    /**
     * Returns the link url for redirection.
     */
    getLink(responseData: ApiResponse) {
        const baseLink = `${DeepLinker.scheme}api`;
        const response = Buffer.from(JSON.stringify(responseData)).toString("base64");
        return WebUtils.addQueryParam(baseLink, "response", response);
    },

    /**
     * Performs the link by simply redirecting the user to url with the deeplink scheme.
     */
    link(res: express.Response, responseData: ApiResponse) {
        res.redirect(DeepLinker.getLink(responseData));
    },
};
export default DeepLinker;