import DateUtils from '../utils/DateUtils';

describe("DateUtils", () => {
    test("getTimeAfter", () => {
        const curDate = new Date();
        expect(DateUtils.getTimeAfter(1)).toBe(curDate.setSeconds(curDate.getSeconds() + 1));

        const customDate = new Date("1997-03-27");
        expect(DateUtils.getTimeAfter(2, customDate)).toBe(customDate.setSeconds(customDate.getSeconds() + 2));
    });

    test("isExpired", () => {
        const curDate = new Date();
        const pastDate = new Date();
        pastDate.setDate(curDate.getDate() - 1);
        const futureDate = new Date();
        futureDate.setDate(curDate.getDate() + 1);

        expect(DateUtils.isExpired(pastDate)).toBeTruthy();
        expect(DateUtils.isExpired(curDate)).toBeTruthy();
        expect(DateUtils.isExpired(futureDate)).toBeFalsy();

        expect(DateUtils.isExpired(curDate, pastDate)).toBeFalsy();
        expect(DateUtils.isExpired(curDate, futureDate)).toBeTruthy();
    });
    test("isExpired with time and date", () => {
        const curDate = new Date().getTime();
        let pastDate = new Date().getTime();
        pastDate -= 1000;
        const futureDate = new Date();
        futureDate.setTime(curDate + 86500);

        expect(DateUtils.isExpired(pastDate)).toBeTruthy();
        expect(DateUtils.isExpired(curDate)).toBeTruthy();
        expect(DateUtils.isExpired(futureDate)).toBeFalsy();

        expect(DateUtils.isExpired(curDate, pastDate)).toBeFalsy();
        expect(DateUtils.isExpired(curDate, futureDate)).toBeTruthy();
    });

    test("getUnixTime", () => {
        const curDate = new Date();
        expect(DateUtils.getUnixTime()).toBe(Math.floor(curDate.getTime() / 1000));
        expect(DateUtils.getUnixTime(new Date(Date.UTC(1970, 0)))).toBe(0);
    });
});