import { ApiProviderType } from '../utils/Types';
import ApiGateway from '../api/ApiGateway';

describe("ApiGateway", () => {
    test("getApi", () => {
        expect(Object.values(ApiProviderType).length).toBeGreaterThan(0);
        Object.values(ApiProviderType).forEach(p => {
            expect(ApiGateway.getApi(p)).not.toBeNull();
        });
    });
});