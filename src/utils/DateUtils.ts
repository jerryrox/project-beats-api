const DateUtils = {

    /**
     * Returns the time in milliseconds after specified seconds from current or overridden date.
     */
    getTimeAfter(seconds: number, overrideDate?: Date): number {
        const date = overrideDate === undefined ? new Date() : new Date(overrideDate);
        return date.setSeconds(date.getSeconds() + seconds);
    },

    /**
     * Returns the Unix time for current or specified date.
     */
    getUnixTime(date?: Date) {
        if (date === undefined) {
            return Math.floor(new Date().getTime() / 1000);
        }
        return Math.floor(date.getTime() / 1000);
    },

    /**
     * Returns whether the specified target date is expired based on current date.
     */
    isExpired(targetDate: Date | number, curDate?: Date | number) {
        if (curDate === undefined) {
            return targetDate <= new Date();
        }
        return targetDate <= curDate;
    }
};
export default DateUtils;