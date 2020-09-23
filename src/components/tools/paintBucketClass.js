import Tool from "./toolClass";

export default class PaintBucket extends Tool {
  constructor(canvas, ctx, colors) {
    super("paint-bucket", colors);
    this.canvas = canvas;
    this.ctx = ctx;
  }

  initPaintBucket() {
    const paintBucket = this.getElement();
    paintBucket.addEventListener(
      this.events.click,
      this._eventPaintBucket.bind(this)
    );
  }

  paintBucketActive(event) {
    const fillColor = this.colors.colors.primary;
    const colorRgb = this.hexToRgb(fillColor);
    const canvasStyleResolution = window
      .getComputedStyle(this.canvas)
      .getPropertyValue("width")
      .slice(0, -2);
    const color = [];
    color.push(colorRgb.r, colorRgb.g, colorRgb.b);

    const position = this.getCursorPosition(event);
    let x = position[0];
    let y = position[1];

    x = Math.floor(x / (canvasStyleResolution / this.canvas.width));
    y = Math.floor(y / (canvasStyleResolution / this.canvas.height));

    this._paintBucket(x, y, color);
  }

  _eventPaintBucket(event) {
    const currentButton = event.target;
    if (currentButton.classList.contains("tools__paint-bucket")) {
      this.changeActiveElement(currentButton);
    }
  }

  _getPixel(imageData, x, y) {
    if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
      return [-1, -1, -1, -1];
    }
    const offset = (y * imageData.width + x) * 4;
    return imageData.data.slice(offset, offset + 4);
  }

  _setPixel(imageData, x, y, color) {
    const offset = (y * imageData.width + x) * 4;
    const pixel = imageData.data;
    [
      pixel[offset + 0],
      pixel[offset + 1],
      pixel[offset + 2],
      pixel[offset + 3],
    ] = [color[0], color[1], color[2], 255];
  }

  _colorsMatch(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }

  _fillPixel(imageData, x, y, targetColor, fillColor) {
    const currentColor = this._getPixel(imageData, x, y);
    if (this._colorsMatch(currentColor, targetColor)) {
      this._setPixel(imageData, x, y, fillColor);
      this._fillPixel(imageData, x + 1, y, targetColor, fillColor);
      this._fillPixel(imageData, x - 1, y, targetColor, fillColor);
      this._fillPixel(imageData, x, y + 1, targetColor, fillColor);
      this._fillPixel(imageData, x, y - 1, targetColor, fillColor);
    }
  }

  _paintBucket(x, y, fillColor) {
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    const targetColor = this._getPixel(imageData, x, y);

    if (!this._colorsMatch(targetColor, fillColor)) {
      this._fillPixel(imageData, x, y, targetColor, fillColor);
      this.ctx.putImageData(imageData, 0, 0);
    }
  }
}
