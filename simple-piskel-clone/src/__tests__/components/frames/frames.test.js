import Frames from "../../../components/frames/frames";

const frames = new Frames();

describe("Frames testing", () => {
    test("Checking value of frames should be defined", () => {
        expect(typeof (frames.events)).toBeDefined();
    });

    test("Checking value of frames should be []", () => {
        expect(frames.frames).toEqual(expect.arrayContaining([]));
    });

    test("Checking value of frames should be typeof object", () => {
        expect(typeof (frames.frames)).toBe("object");
    });

    test("Checking value of events should be defined", () => {
        expect(typeof (frames.events)).toBeDefined();
    });

    test("Checking value of events should be typeof object", () => {
        expect(typeof (frames.events)).toBe("object");
    });

    test("Checking value of events should be click, mouseup and keyup", () => {
        expect(frames.events).toEqual({ click: "click", mouseup: "mouseup", keyup: "keyup" });
    });
});
