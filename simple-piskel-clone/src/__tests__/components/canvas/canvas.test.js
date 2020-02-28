import Canvas from "../../../components/canvas/canvas";

const jsdom = require("jsdom");

const { JSDOM } = jsdom;
const { document } = (new JSDOM("<!DOCTYPE html><canvas class=\"main-canvas\" width=\"32\" height=\"32\"></canvas><div class=\"canvas-size\"></div><div class=\"canvas-clear__btn\"></div>")).window;

const canvas = new Canvas();

canvas.canvas = document.querySelector(".main-canvas");

describe("Canvas testing", () => {
    test("Canvas resolution should updating correct with value 32", () => {
        canvas.updateCanvasResolution(32);

        expect(canvas.canvas.width).toBe(32);
        expect(canvas.canvas.height).toBe(32);
    });

    test("Canvas resolution should updating correct with value 64", () => {
        canvas.updateCanvasResolution(64);

        expect(canvas.canvas.width).toBe(64);
        expect(canvas.canvas.height).toBe(64);
    });

    test("Canvas resolution should updating correct with value 128", () => {
        canvas.updateCanvasResolution(128);

        expect(canvas.canvas.width).toBe(128);
        expect(canvas.canvas.height).toBe(128);
    });

    test("Canvas resolution should updating with no undefined", () => {
        canvas.updateCanvasResolution(0);

        expect(canvas.canvas.width).not.toBeUndefined();
        expect(canvas.canvas.height).not.toBeUndefined();
    });
});
