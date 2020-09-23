import Tool from "./toolClass";

export default class Eraser extends Tool {
  constructor(canvas, ctx, colors) {
    super("eraser", colors);
    this.canvas = canvas;
    this.ctx = ctx;
  }

  initEraser() {
    const eraser = this.getElement();
    eraser.addEventListener(this.events.click, this._selectEraser.bind(this));
  }

  eraserMouseDown(event) {
    this.isErasing = true;
    this.previousPosition = this.getCursorPosition.call(this, event);
    this._erase(this.getCursorPosition(event));
  }

  eraserMouseMove(event) {
    if (this.isErasing) {
      this._line(this.previousPosition, this.getCursorPosition(event));
      this.previousPosition = this.getCursorPosition(event);
    }
  }

  eraserMouseUp() {
    this.isErasing = false;
  }

  _selectEraser(event) {
    const currentButton = event.target;
    if (currentButton.classList.contains("tools__eraser")) {
      this.changeActiveElement(currentButton);
    }
  }

  _line(position1, position2) {
    let x0 = position1[0];
    let y0 = position1[1];
    const x1 = position2[0];
    const y1 = position2[1];
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      // eslint-disable-line no-constant-condition
      this._erase([x0, y0]);
      if (x0 === x1 && y0 === y1) {
        break;
      }
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
  }

  _erase(position) {
    let x = position[0];
    let y = position[1];

    const canvasStyleResolution = window
      .getComputedStyle(this.canvas)
      .getPropertyValue("width")
      .slice(0, -2);

    x = Math.floor(x / (canvasStyleResolution / this.canvas.height));
    y = Math.floor(y / (canvasStyleResolution / this.canvas.width));

    this.ctx.clearRect(x, y, this.penSize, this.penSize);
  }
}
