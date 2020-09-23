import getCursorPosition from "./getCursorPosition";
import rgbToHex from "./rgbToHex";
import hexToRgb from "./hexToRgb";

export default class Utils {
  constructor() {
    this.getCursorPosition = getCursorPosition;
    this.rgbToHex = rgbToHex;
    this.hexToRgb = hexToRgb;
  }
}
