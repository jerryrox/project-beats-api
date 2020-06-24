const DateUtils = {

    /**
     * Returns the time in milliseconds after specified seconds from current or overridden date.
     */
    getTimeAfter(seconds: number, overrideDate?: Date): number {
        const date = overrideDate === undefined ? new Date() : new Date(overrideDate);
        return date.setSeconds(date.getSeconds() + seconds);
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