import Tool from "./toolClass";

export default class ColorSelect extends Tool {
    constructor(canvas, ctx, colors) {
        super("color-select", colors);
        this.canvas = canvas;
        this.ctx = ctx;
    }

    initColorSelect() {
        const colorSelect = this.getElement();
        colorSelect.addEventListener(this.events.click, this._selectColorSelect.bind(this));
    }

    _selectColorSelect(event) {
        const currentButton = event.target;
        if (currentButton.classList.contains("tools__color-select")) {
            this.changeActiveElement(currentButton);
        }
    }

    colorSelectActive(event) {
        this._colorSelect(this.getCursorPosition(event));
    }

    _colorSelect(position) {
        const x = position[0];
        const y = position[1];

        const canvasStyleResolution = window.getComputedStyle(this.canvas).getPropertyValue("width").slice(0, -2);
        const color = this.ctx.getImageData(Math.floor(x
            / (canvasStyleResolution / this.canvas.height)),
        Math.floor(y / (canvasStyleResolution / this.canvas.width)), 1, 1).data;
        const newColor = this.rgbToHex(color[0], color[1], color[2]);

        if (newColor !== this.colors.primary) {
            this.colors.updatePrimaryColorElement(newColor);
        }
    }
}
