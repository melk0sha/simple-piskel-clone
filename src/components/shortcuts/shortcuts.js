export default class Shortcuts {
  constructor() {
    this.keys = {
      penKey: "P",
      colorSelectKey: "O",
      paintBucketKey: "B",
      eraserKey: "E",
      paintSwapKey: "A",
      strokeKey: "L",
      colorSwapKey: "X",
      previewFullScreenKey: "F",
      addNewFrame: "N",
      deleteFrame: "D",
      copyFrame: "C",
      clearCanvas: "W",
      exportGIF: "T",
      exportAPNG: "G",
    };
  }

  restoreDefaultShortcuts() {
    this.keys.penKey = "P";
    this.keys.colorSelectKey = "O";
    this.keys.paintBucketKey = "B";
    this.keys.eraserKey = "E";
    this.keys.paintSwapKey = "A";
    this.keys.strokeKey = "L";
    this.keys.colorSwapKey = "X";
    this.keys.previewFullScreenKey = "F";
    this.keys.addNewFrame = "N";
    this.keys.deleteFrame = "D";
    this.keys.copyFrame = "C";
    this.keys.clearCanvas = "W";
    this.keys.exportGIF = "T";
    this.keys.exportAPNG = "G";

    document.querySelector(".pen-key__key").textContent = this.keys.penKey;
    document.querySelector(
      ".color-select-key__key"
    ).textContent = this.keys.colorSelectKey;
    document.querySelector(
      ".paint-bucket-key__key"
    ).textContent = this.keys.paintBucketKey;
    document.querySelector(
      ".eraser-key__key"
    ).textContent = this.keys.eraserKey;
    document.querySelector(
      ".paint-swap-key__key"
    ).textContent = this.keys.paintSwapKey;
    document.querySelector(
      ".stroke-key__key"
    ).textContent = this.keys.strokeKey;
    document.querySelector(
      ".swap-colors-key__key"
    ).textContent = this.keys.colorSwapKey;
    document.querySelector(
      ".full-screen-key__key"
    ).textContent = this.keys.previewFullScreenKey;
    document.querySelector(
      ".add-new-frame-key__key"
    ).textContent = this.keys.addNewFrame;
    document.querySelector(
      ".delete-frame-key__key"
    ).textContent = this.keys.deleteFrame;
    document.querySelector(
      ".copy-frame-key__key"
    ).textContent = this.keys.copyFrame;
    document.querySelector(
      ".export-gif-key__key"
    ).textContent = this.keys.exportGIF;
    document.querySelector(
      ".export-apng-key__key"
    ).textContent = this.keys.exportAPNG;
  }

  updateKey(currentKeyElement, toKey) {
    currentKeyElement.querySelector(".btn-key").textContent = toKey;

    if (currentKeyElement.classList.contains("pen-key")) {
      this.keys.penKey = toKey;
    } else if (currentKeyElement.classList.contains("color-select-key")) {
      this.keys.colorSelectKey = toKey;
    } else if (currentKeyElement.classList.contains("paint-bucket-key")) {
      this.keys.paintBucketKey = toKey;
    } else if (currentKeyElement.classList.contains("eraser-key")) {
      this.keys.eraserKey = toKey;
    } else if (currentKeyElement.classList.contains("paint-swap-key")) {
      this.keys.paintSwapKey = toKey;
    } else if (currentKeyElement.classList.contains("stroke-key")) {
      this.keys.strokeKey = toKey;
    } else if (currentKeyElement.classList.contains("swap-colors-key")) {
      this.keys.colorSwapKey = toKey;
    } else if (currentKeyElement.classList.contains("full-screen-key")) {
      this.keys.previewFullScreenKey = toKey;
    } else if (currentKeyElement.classList.contains("add-new-frame-key")) {
      this.keys.addNewFrame = toKey;
    } else if (currentKeyElement.classList.contains("delete-frame-key")) {
      this.keys.deleteFrame = toKey;
    } else if (currentKeyElement.classList.contains("copy-frame-key")) {
      this.keys.copyFrame = toKey;
    } else if (currentKeyElement.classList.contains("clear-canvas-key")) {
      this.keys.clearCanvas = toKey;
    } else if (currentKeyElement.classList.contains("export-gif-key")) {
      this.keys.exportGIF = toKey;
    } else if (currentKeyElement.classList.contains("export-apng-key")) {
      this.keys.exportAPNG = toKey;
    }
  }
}
