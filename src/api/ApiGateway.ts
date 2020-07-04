import { ApiProviderType } from '../utils/Types';
import OsuApi from './osu/OsuApi';
import IApi from './IApi';
import BloodcatApi from './bloodcat/BloodcatApi';
import StringUtils from '../utils/StringUtils';

export const apis: any = {
    [ApiProviderType.Osu]: OsuApi,
    [ApiProviderType.Bloodcat]: BloodcatApi,
};

const ApiGateway = {
    getApi(provider: string): IApi {
        // Ensure the provider is always capitalized.
        const capitalizedProvider = StringUtils.capitalize(provider);
        const api = apis[capitalizedProvider] as IApi;
        if (api === undefined) {
            throw new Error(`API not found for specifield provider: ${capitalizedProvider}`);
        }
        return api;
    }
};
export default ApiGateway;
