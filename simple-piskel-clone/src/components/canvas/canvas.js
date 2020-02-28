export default class Canvas {
    init(keys) {
        this.events = {
            click: "click",
            keyup: "keyup",
        };

        this.canvas = document.querySelector(".main-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.keys = keys;

        this.updateCanvasResolution(32);
        this._canvasResolutionInit();
        this._canvasClearInit();
    }

    canvasClearInitEvent() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateCanvasResolution(resolution) {
        this.canvas.width = resolution;
        this.canvas.height = resolution;
    }

    _canvasResolutionInit() {
        const sizeElement = document.querySelector(".canvas-size");
        sizeElement.addEventListener(this.events.click, this._canvasResolutionInitEvent.bind(this));
    }

    _canvasResolutionInitEvent(event) {
        const currentButton = event.target;
        const { resolution } = currentButton.dataset;
        const prevCanvas = this.canvas.toDataURL();
        const img = new Image();

        [...currentButton.parentElement.children].forEach((res) => {
            res.classList.remove("canvas-size__btn_active");
        });

        currentButton.classList.add("canvas-size__btn_active");

        img.src = prevCanvas;
        img.onload = () => {
            this.ctx.imageSmoothingEnabled = false;
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        };

        this.updateCanvasResolution(resolution);
    }

    _canvasClearInit() {
        const clearButton = document.querySelector(".canvas-clear__btn");

        clearButton.addEventListener(this.events.click,
            this._canvasAndCurrentFrameClearEvent.bind(this));
        document.addEventListener(this.events.keyup, this._checkByKey.bind(this));
    }

    _checkByKey(event) {
        const clear = `Key${this.keys.clearCanvas}`;

        if (event.code === clear) {
            this._canvasAndCurrentFrameClearEvent.call(this);
        }
    }

    _canvasAndCurrentFrameClearEvent() {
        const currentFrame = document.querySelector(".frames__frame_selected");
        const currentFrameCanvas = currentFrame.querySelector(".frames__canvas");

        currentFrameCanvas.getContext("2d").clearRect(0, 0, currentFrameCanvas.width, currentFrameCanvas.height);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
