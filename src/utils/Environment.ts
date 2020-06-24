import {
    config
} from "dotenv";
import { NodeEnv, ApiProvider } from './Types';

config();

interface IEnvironmentInfoParam {
    envType: NodeEnv | string,
    env?: NodeJS.ProcessEnv
}

export class EnvironmentInfo {

    envType: NodeEnv | string;
    env: NodeJS.ProcessEnv;


    constructor(param: IEnvironmentInfoParam) {
        this.envType = param.envType;
        this.env = param.env || process.env;
    }

    /**
     * Returns the server's port number.
     */
    getPort(): string { return this.env.PORT || "5000"; }

    /**
     * Returns the base string of key which has provider and environment type variant.
     */
    getBaseKey(provider?: ApiProvider | string): string {
        if (provider === undefined) {
            return `${this.envType}`.toUpperCase();
        }
        return `${provider}_${this.envType}`.toUpperCase();
    }

    /**
     * Returns the environment variable value for the specified key.
     * Throws an error if the value is not found.
     */
    getEnvValue(key: string): string {
        const value = this.env[key.toUpperCase()];
        if (value === undefined) {
            throw new Error(`No environment value found for key: ${key}`);
        }
        return value;
    }

    /**
     * Returns the url of this app.
     */
    getAppUrl(path?: string): string {
        const key = `${this.getBaseKey()}_URL`;
        return `${this.getEnvValue(key)}/${path || ""}`;
    }

    /**
     * Returns the secret key for the specified API provider.
     */
    getSecret(provider: ApiProvider | string): string {
        const key = `${this.getBaseKey(provider)}_SECRET`;
        return this.getEnvValue(key);
    }

    /**
     * Returns the client id for the specified API provider.
     */
    getClientId(provider: ApiProvider | string): string {
        const key = `${this.getBaseKey(provider)}_CLIENT_ID`;
        return this.getEnvValue(key);
    }
}

const Environment = new EnvironmentInfo({
    envType: (process.env.NODE_ENV || "development") as NodeEnv,
    env: process.env
});
export default Environment;
