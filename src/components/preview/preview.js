import fullScreen from "./previewFullScreen";

export default class Preview {
  init(frames, canvasClear, keys) {
    this.events = {
      input: "input",
      mouseup: "mouseup",
      click: "click",
      keyup: "keyup",
    };

    this.frames = frames;
    this.canvasClear = canvasClear;
    this.fps = 12;
    this.keys = keys;

    this.preview = document.querySelector(".preview");
    this.previewCtx = this.preview.getContext("2d");

    this._previewFPSInit();
    this.animateInit();
    this._fullScreenInit();
  }

  _previewFPSInit() {
    const range = document.querySelector(".fps__range");
    const value = document.querySelector(".fps__value");

    const updateValue = () => {
      value.textContent = range.value;
      this.fps = range.value;
      this.animateInit();
    };

    value.textContent = range.value;

    range.addEventListener(this.events.input, updateValue);
  }

  animateInit() {
    let i = 0;
    const baseInterval = 1000;
    const intervalFPS = baseInterval / this.fps;
    clearInterval(this.interval);

    this.interval = setInterval(() => {
      if (i >= this.frames.length || this.frames.length === 1) {
        i = 0;
      }

      const img = new Image();
      const previewContent = this.frames[i].toDataURL();

      this._previewClear();
      img.src = previewContent;
      img.onload = () => {
        this.previewCtx.imageSmoothingEnabled = false;
        this.previewCtx.drawImage(
          img,
          0,
          0,
          this.preview.width,
          this.preview.height
        );
      };

      i += 1;
    }, intervalFPS);
  }

  _previewClear() {
    this.previewCtx.clearRect(0, 0, this.preview.width, this.preview.height);
  }

  _fullScreenInit() {
    const fullScreenElement = document.querySelector(".preview__full");

    const fullScreenEvent = () => {
      fullScreen(this.preview);
    };

    fullScreenElement.addEventListener(this.events.click, fullScreenEvent);
    document.addEventListener(this.events.keyup, this._checkByKey.bind(this));
  }

  _checkByKey(event) {
    const previewFullScreenKey = `Key${this.keys.previewFullScreenKey}`;

    if (event.code === previewFullScreenKey) {
      fullScreen(this.preview);
    }
  }
}
