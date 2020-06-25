import OsuApi from '../../api/osu/OsuApi';
import ApiRequest from '../../requests/ApiRequest';
import express from 'express';

describe("OsuApi", () => {
    test("getHeaderWithAuth", () => {
        const request = new ApiRequest({
            body: {
                accessToken: "heyeyeyeyey"
            }
        });
        let header = OsuApi.getHeaderWithAuth(request, {
            anotherKey: "anotherValue"
        });
        expect(header).toMatchObject({
            Authorization: "Bearer heyeyeyeyey",
            anotherKey: "anotherValue"
        });

        header = OsuApi.getHeaderWithAuth(request);
        expect(header).toMatchObject({
            Authorization: "Bearer heyeyeyeyey"
        });
    });
});