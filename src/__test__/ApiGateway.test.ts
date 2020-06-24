import { ApiProvider } from '../utils/Types';
import ApiGateway from '../api/ApiGateway';

describe("ApiGateway", () => {
    test("getApi", () => {
        expect(Object.values(ApiProvider).length).toBeGreaterThan(0);
        Object.values(ApiProvider).forEach(p => {
            expect(ApiGateway.getApi(p)).not.toBeNull();
        });
    });
});