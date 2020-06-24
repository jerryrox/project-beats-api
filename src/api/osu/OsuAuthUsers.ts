import DateUtils from '../../utils/DateUtils';
interface IAuthUser {
    oauthState: string,
    accessToken: string,
    code: string,
    expiry: number,
}

export class OsuAuthUsersInfo {

    users: IAuthUser[];


    constructor() {
        this.users = [];
    }

    /**
     * Adds the specified auth user to management.
     */
    add(user: IAuthUser) {
        this.users.push(user);
        this.clean();
    }

    /**
     * Returns the auth user info from specified code.
     */
    getFromCode(code: string): IAuthUser | null {
        this.clean();
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].code === code) {
                return this.users[i];
            }
        }
        return null;
    }

    /**
     * Removes all auth users whose expiry date has been past.
     */
    private clean() {
        const curDate = new Date();
        for (let i = this.users.length - 1; i >= 0; i--) {
            if (DateUtils.isExpired(this.users[i].expiry, curDate)) {
                this.users.splice(i, 1);
            }
        }
    }
}

const OsuAuthUsers = new OsuAuthUsersInfo();
export default OsuAuthUsers;