import { OsuAuthUsersInfo } from '../../api/osu/OsuAuthUsers';
import DateUtils from '../../utils/DateUtils';

describe("OsuAuthUsers", () => {
    test("add", () => {
        const info = new OsuAuthUsersInfo();
        expect(info.users.length).toBe(0);

        info.add({
            accessToken: "asdf",
            code: "code",
            expiry: DateUtils.getTimeAfter(1),
            oauthState: "uniqueuuid"
        });
        expect(info.users.length).toBe(1);
    });

    test("getFromCode", () => {
        const info = new OsuAuthUsersInfo();
        const user = {
            accessToken: "asdf",
            code: "code",
            expiry: DateUtils.getTimeAfter(1),
            oauthState: "uniqueuuid"
        };
        info.add(user);

        expect(info.getFromCode("code")).toMatchObject(user);
        expect(info.getFromCode("lol")).toBeNull();
    });

    test("Expired user", () => {
        const info = new OsuAuthUsersInfo();
        info.add({
            accessToken: "asdf",
            code: "code",
            expiry: DateUtils.getTimeAfter(1),
            oauthState: "uniqueuuid"
        });
        expect(info.users.length).toBe(1);

        info.add({
            accessToken: "asdf2",
            code: "code2",
            expiry: DateUtils.getTimeAfter(-1),
            oauthState: "uniqueuuid2"
        });
        expect(info.users.length).toBe(1);

        expect(info.getFromCode("code")).not.toBeNull();
        expect(info.getFromCode("code2")).toBeNull();
    });
});