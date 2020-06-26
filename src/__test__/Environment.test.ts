import { EnvironmentInfo } from '../utils/Environment';
import { NodeEnvType, ApiProviderType } from '../utils/Types';

describe("EnvironmentInfo", () => {
    test("Whether the correct default PORT is returned.", () => {
        let environment = new EnvironmentInfo({
            envType: NodeEnvType.Test
        });
        expect(environment.getPort()).toBe("5000");
    });
    test("Whether the correct overridden PORT is returned.", () => {
        let environment = new EnvironmentInfo({
            envType: NodeEnvType.Test,
            env: {
                PORT: "1234"
            }
        });
        expect(environment.getPort()).toBe("1234");
    });

    test("Whether the base key is correctly returned.", () => {
        const environment = new EnvironmentInfo({
            envType: NodeEnvType.Test
        });
        expect(environment.getBaseKey()).toBe(`${NodeEnvType.Test}`.toUpperCase());
        expect(environment.getBaseKey(ApiProviderType.Osu)).toBe(`${ApiProviderType.Osu}_${NodeEnvType.Test}`.toUpperCase());
        expect(environment.getBaseKey("lolz")).toBe(`${"lolz"}_${NodeEnvType.Test}`.toUpperCase());
    });

    test("Whether the correct app url is returned.", () => {
        const environment = new EnvironmentInfo({
            envType: NodeEnvType.Test,
            env: {
                [`${NodeEnvType.Test}_URL`.toUpperCase()]: "lol"
            }
        });
        expect(environment.getAppUrl()).toBe("lol");
        expect(environment.getAppUrl("/z")).toBe("lol/z");
    });

    test("Whether the correct secret is returned.", () => {
        const env: any = {};
        Object.values(ApiProviderType).forEach(provider => {
            env[`${provider}_${NodeEnvType.Test}_SECRET`.toUpperCase()] = provider;
        });
        let environment = new EnvironmentInfo({
            envType: NodeEnvType.Test,
            env
        });
        Object.values(ApiProviderType).forEach(provider => {
            expect(environment.getSecret(provider)).toBe(provider);
        });
        expect(() => environment.getSecret("troll")).toThrow();
    });

    test("Whether the correct client id is returned.", () => {
        const env: any = {};
        Object.values(ApiProviderType).forEach(provider => {
            env[`${provider}_${NodeEnvType.Test}_CLIENT_ID`.toUpperCase()] = provider;
        });
        let environment = new EnvironmentInfo({
            envType: NodeEnvType.Test,
            env
        });
        Object.values(ApiProviderType).forEach(provider => {
            expect(environment.getClientId(provider)).toBe(provider);
        });
        expect(() => environment.getClientId("troll")).toThrow();
    });
});