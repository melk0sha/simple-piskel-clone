import rgbToHex from "../../../../components/tools/utils/rgbToHex";

const rgb = {
    example1: {
        r: 83,
        g: 37,
        b: 70,
    },
    example2: {
        r: 202,
        g: 241,
        b: 39,
    },
    example3: {
        r: 0,
        g: 0,
        b: 0,
    },
    example4: {
        r: 255,
        g: 255,
        b: 255,
    },
};

describe("utils rgbToHex testing", () => {
    test("rgbToHex should be defined", () => {
        expect(rgbToHex(rgb.example1.r, rgb.example1.g, rgb.example1.b)).toBeDefined();
    });

    test("rgbToHex should be typeof string", () => {
        expect(typeof (rgbToHex(rgb.example1.r, rgb.example1.g, rgb.example1.b))).toBe("string");
    });

    test("rgbToHex should return #532546", () => {
        expect(rgbToHex(rgb.example1.r, rgb.example1.g, rgb.example1.b)).toBe("#532546");
    });

    test("rgbToHex should return #caf127", () => {
        expect(rgbToHex(rgb.example2.r, rgb.example2.g, rgb.example2.b)).toBe("#caf127");
    });

    test("rgbToHex should return #000000", () => {
        expect(rgbToHex(rgb.example3.r, rgb.example3.g, rgb.example3.b)).toBe("#000000");
    });

    test("rgbToHex should return #ffffff", () => {
        expect(rgbToHex(rgb.example4.r, rgb.example4.g, rgb.example4.b)).toBe("#ffffff");
    });
});
