export default class ExportUPNG {
    export(canvas, frames, preview) {
        this.canvas = canvas;
        this.frames = frames;
        this.fps = preview.fps;

        this._download();
    }

    _download() {
        const UPNG = require("upng-js"); // eslint-disable-line global-require
        const download = require("downloadjs"); // eslint-disable-line global-require

        let arrayBuffer = [];
        const baseInterval = 1000;
        const intervalFPS = baseInterval / this.fps;
        const arrayFrameTime = new Array(this.frames.length).fill(intervalFPS);
        const canvasStyleResolution = +window.getComputedStyle(this.canvas).getPropertyValue("width").slice(0, -2);

        this.frames.forEach((frame) => arrayBuffer.push(frame));

        arrayBuffer = arrayBuffer.map((frame) => {
            const ctx = frame.getContext("2d");
            return ctx.getImageData(0, 0, canvasStyleResolution, canvasStyleResolution).data.buffer;
        });

        const result = UPNG.encode(arrayBuffer, canvasStyleResolution,
            canvasStyleResolution, 0, arrayFrameTime);

        download(result, "download.apng", "apng");
    }
}
