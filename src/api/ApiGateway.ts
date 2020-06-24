import { ApiProvider } from '../utils/Types';
import OsuApi from './osu/OsuApi';
import IApi from './IApi';
import BloodcatApi from './bloodcat/BloodcatApi';

export const apis: any = {
    [ApiProvider.Osu]: OsuApi,
    [ApiProvider.Bloodcat]: BloodcatApi,
};

const ApiGateway = {
    getApi(provider: string): IApi {
        const api = apis[provider] as IApi;
        if (api === undefined) {
            throw new Error(`API not found for specifield provider: ${provider}`);
        }
        return api;
    }
};
export default ApiGateway;
