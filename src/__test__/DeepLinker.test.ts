import DeepLinker from '../utils/DeepLinker';
import ApiResponse from '../responses/ApiResponse';
import { ResponseType } from "../utils/Types";

describe("DeepLinker", () => {
    test("getLink", () => {
        const response = new ApiResponse({
            type: ResponseType.Success,
            data: {
                a: 1,
                b: 2
            },
            message: "Lol, successful![{|}]"
        });

        const link = DeepLinker.getLink(response);
        expect(link).toBe(`pbgame://api?response=${encodeURIComponent("eyJ0eXBlIjoiU3VjY2VzcyIsImRhdGEiOnsiYSI6MSwiYiI6Mn0sIm1lc3NhZ2UiOiJMb2wsIHN1Y2Nlc3NmdWwhW3t8fV0ifQ==")}`);
    });
});