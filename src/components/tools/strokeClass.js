import Tool from "./toolClass";

export default class Stroke extends Tool {
  constructor(canvas, ctx, colors) {
    super("stroke", colors);
    this.canvas = canvas;
    this.ctx = ctx;
  }

  initStroke() {
    const stroke = this.getElement();
    stroke.addEventListener(this.events.click, this._selectStroke.bind(this));
  }

  strokeMouseDown() {}

  strokeMouseMove() {}

  strokeMouseUp() {}

  _selectStroke(event) {
    const currentButton = event.target;
    if (currentButton.classList.contains("tools__stroke")) {
      this.changeActiveElement(currentButton);
    }
  }
}
