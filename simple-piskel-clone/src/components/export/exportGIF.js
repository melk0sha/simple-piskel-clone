export default class ExportGIF {
    export(canvas, frames, preview) {
        this.canvas = canvas;
        this.frames = frames;
        this.fps = preview.fps;

        this._download();
    }

    _download() {
        const encoder = new GIFEncoder();
        const baseInterval = 1000;
        const intervalFPS = baseInterval / this.fps;

        encoder.setRepeat(0);
        encoder.setDelay(intervalFPS);
        encoder.start();

        this.frames.forEach((frame) => {
            const ctx = frame.getContext("2d");
            encoder.addFrame(ctx);
        });

        encoder.finish();
        encoder.download("download.gif");
    }
}
