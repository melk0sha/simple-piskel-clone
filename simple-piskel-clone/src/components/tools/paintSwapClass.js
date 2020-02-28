import Tool from "./toolClass";

export default class PaintSwap extends Tool {
    constructor(canvas, ctx, colors) {
        super("paint-swap", colors);
        this.canvas = canvas;
        this.ctx = ctx;
    }

    initPaintSwap() {
        const paintSwap = this.getElement();
        paintSwap.addEventListener(this.events.click, this._selectPaintSwap.bind(this));
    }

    paintSwapActive(event) {
        this._paintSwap(this.getCursorPosition(event));
    }

    _selectPaintSwap(event) {
        const currentButton = event.target;
        if (currentButton.classList.contains("tools__paint-swap")) {
            this.changeActiveElement(currentButton);
        }
    }

    _paintSwap(position) {
        const x = position[0];
        const y = position[1];

        const canvasStyleResolution = window.getComputedStyle(this.canvas).getPropertyValue("width").slice(0, -2);
        const targetColorData = this.ctx.getImageData(Math.floor(x
            / (canvasStyleResolution / this.canvas.height)),
        Math.floor(y / (canvasStyleResolution / this.canvas.width)), 1, 1).data;
        const targetColor = this.rgbToHex(targetColorData[0],
            targetColorData[1], targetColorData[2]);
        const imageData = this.ctx.getImageData(0, 0, this.canvas.height, this.canvas.width);

        this.ctx.fillStyle = this.colors.colors.primary;
        if (targetColor === this.colors.colors.primary) return;

        for (let i = 0; i < imageData.data.length; i += 4) {
            const arr = [];
            arr.push(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]);
            if (targetColorData[0] === arr[0]
                && targetColorData[1] === arr[1]
                && targetColorData[2] === arr[2]) {
                imageData.data[i] = this.hexToRgb(this.colors.colors.primary).r;
                imageData.data[i + 1] = this.hexToRgb(this.colors.colors.primary).g;
                imageData.data[i + 2] = this.hexToRgb(this.colors.colors.primary).b;
            }
        }

        this.ctx.putImageData(imageData, 0, 0);
    }
}
