import Utils from "./utils/utilsApp";

export default class Tool {
  constructor(tool, colors) {
    this.events = {
      click: "click",
      keydown: "keydown",
      mousedown: "mousedown",
      mouseup: "mouseup",
      mousemove: "mousemove",
      keyup: "keyup",
    };

    this.colors = colors;
    this.penSize = 1;

    this.utils = new Utils();

    this.tool = tool;
  }

  getElement() {
    return document.querySelector(`.tools__${this.tool}`);
  }

  changeActiveElement(currentButton) {
    [...currentButton.parentElement.children].forEach((tool) => {
      tool.classList.remove("tools__tool_active");
    });

    currentButton.classList.add("tools__tool_active");
  }

  getCursorPosition(event) {
    return this.utils.getCursorPosition(event);
  }

  rgbToHex(r, g, b) {
    return this.utils.rgbToHex(r, g, b);
  }

  hexToRgb(hex) {
    return this.utils.hexToRgb(hex);
  }

  changePenSize(currentButton) {
    if (currentButton.classList.contains("pen-size__size")) {
      currentButton = currentButton.parentElement;
    }

    [...currentButton.parentElement.children].forEach((size) => {
      size.classList.remove("pen-size__option_active");
    });

    currentButton.classList.add("pen-size__option_active");

    this.penSize = currentButton.dataset.value;
  }
}
