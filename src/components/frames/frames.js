import Sortable from "sortablejs";

export default class Frames {
  constructor() {
    this.frames = [];

    this.events = {
      click: "click",
      mouseup: "mouseup",
      keyup: "keyup",
    };
  }

  init(canvas, ctx, canvasClear, keys) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.frameContainer = document.querySelector(".frames");
    this.canvasClear = canvasClear;
    this.keys = keys;

    this._setDefaultFrame();
    this._drawMiniFrame();
    this._addNewFrame();
    this._addSelectingFrame();
  }

  _setDefaultFrame() {
    const defaultFrame = document.querySelector(".frames__frame_selected");
    const defaultFrameCanvas = defaultFrame.querySelector(".frames__canvas");

    this._dragAndDropInit();

    this.frames.push(defaultFrameCanvas);
  }

  _drawMiniFrame() {
    this.canvas.addEventListener(
      this.events.mouseup,
      this._drawMiniFrameEvent.bind(this)
    );
  }

  _drawMiniFrameEvent() {
    let selectedFrameCanvas = document.querySelector(".frames__frame_selected");

    const selectedFrameCanvasNumber = selectedFrameCanvas.dataset.number;
    selectedFrameCanvas = selectedFrameCanvas.querySelector(".frames__canvas");

    const selectedFrameCanvasCtx = selectedFrameCanvas.getContext("2d");
    const img = new Image();
    const currentCanvas = this.canvas.toDataURL();

    selectedFrameCanvasCtx.clearRect(
      0,
      0,
      selectedFrameCanvas.width,
      selectedFrameCanvas.height
    );
    img.src = currentCanvas;
    img.onload = () => {
      selectedFrameCanvasCtx.imageSmoothingEnabled = false;
      selectedFrameCanvasCtx.drawImage(
        img,
        0,
        0,
        selectedFrameCanvas.width,
        selectedFrameCanvas.height
      );
    };

    this.frames[selectedFrameCanvasNumber] = selectedFrameCanvas;
  }

  _dragAndDropInit() {
    Sortable.create(this.frameContainer, {
      draggable: ".frames__frame",
      animation: 150,
      onEnd: (evt) => {
        const temp = this.frames[evt.oldIndex];
        let i = 0;

        this.frames[evt.oldIndex] = this.frames[evt.newIndex];
        this.frames[evt.newIndex] = temp;

        [...this.frameContainer.children].forEach((frame) => {
          frame.querySelector(".frame__number").textContent = i + 1;
          frame.dataset.number = i;
          i += 1;
        });
      },
    });
  }

  _addNewFrame() {
    const addFrameButton = document.querySelector(".add-frame__icon");

    addFrameButton.addEventListener(
      this.events.click,
      this._addNewFrameEvent.bind(this)
    );
    document.addEventListener(this.events.keyup, this._checkByKey.bind(this));
  }

  _addNewFrameEvent() {
    this.canvasClear();
    const frame = document.querySelector(".frames__frame_selected");

    frame.querySelector(".frame__delete").classList.add("frame__visible");
    frame.querySelector(".frame__move").classList.add("frame__visible");

    const newFrame = frame.cloneNode(true);
    const newFrameNumber = newFrame.querySelector(".frame__number");
    const newCanvas = newFrame.querySelector(".frames__canvas");

    newFrame.dataset.number = this.frames.length;
    newFrameNumber.textContent = this.frames.length + 1;

    frame.classList.remove("frames__frame_selected");
    newFrame.classList.add("frames__frame_selected");

    this.frames.push(newCanvas);
    this.frameContainer.appendChild(newFrame);
  }

  _checkByKey(event) {
    const addNewFrame = `Key${this.keys.addNewFrame}`;
    const deleteFrame = `Key${this.keys.deleteFrame}`;
    const copyFrame = `Key${this.keys.copyFrame}`;

    const deleteFrameElement = document
      .querySelector(".frames__frame_selected")
      .querySelector(".frame__delete");
    const copyFrameElement = document
      .querySelector(".frames__frame_selected")
      .querySelector(".frame__copy");

    if (event.code === addNewFrame) {
      this._addNewFrameEvent.call(this);
    } else if (event.code === deleteFrame) {
      this._deleteFrame.call(this, deleteFrameElement);
    } else if (event.code === copyFrame) {
      this._copyFrame.call(this, copyFrameElement);
    }
  }

  _addSelectingFrame() {
    this.frameContainer.addEventListener(
      this.events.click,
      this._addSelectingFrameEvent.bind(this)
    );
  }

  _addSelectingFrameEvent(event) {
    let currentButton = event.target;

    if (currentButton.tagName === "UL") return;

    if (currentButton.tagName === "CANVAS") {
      currentButton = currentButton.parentElement;
    }

    if (currentButton.tagName === "DIV") {
      if (currentButton.classList.contains("frame__number")) {
        currentButton = currentButton.parentElement;
      } else if (currentButton.classList.contains("frame__delete")) {
        this._deleteFrame(currentButton);
        return;
      } else if (currentButton.classList.contains("frame__copy")) {
        this._copyFrame(currentButton);
        return;
      } else if (currentButton.classList.contains("frame__move")) {
        currentButton = currentButton.parentElement;
      }
    }

    [...currentButton.parentElement.children].forEach((frame) => {
      frame.classList.remove("frames__frame_selected");
    });

    currentButton.classList.add("frames__frame_selected");

    const frame = this.frames[currentButton.dataset.number];
    const img = new Image();
    const frameContent = frame.toDataURL();

    this.canvasClear();
    img.src = frameContent;
    img.onload = () => {
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    };
  }

  _deleteFrame(currentButton) {
    let i = 0;
    const { number } = currentButton.parentElement.dataset;
    let frame = [...this.frameContainer.children]
      .find(
        (frameEl) =>
          frameEl.classList.contains("frames__frame_selected") === true
      )
      .querySelector(".frames__canvas");
    this.frames.splice(number, 1);

    if (
      currentButton.parentElement.classList.contains("frames__frame_selected")
    ) {
      if (currentButton.parentElement.previousElementSibling) {
        currentButton.parentElement.previousElementSibling.classList.add(
          "frames__frame_selected"
        );
        frame = this.frames[
          currentButton.parentElement.previousElementSibling.dataset.number
        ];
      } else {
        currentButton.parentElement.nextElementSibling.classList.add(
          "frames__frame_selected"
        );
        frame = this.frames[currentButton.parentElement.dataset.number];
      }
    }

    const img = new Image();
    const frameContent = frame.toDataURL();

    this.canvasClear();
    img.src = frameContent;
    img.onload = () => {
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    };

    currentButton.parentElement.remove();

    [...this.frameContainer.children].forEach((frameNumber) => {
      frameNumber.querySelector(".frame__number").textContent = i + 1;
      frameNumber.dataset.number = i;
      i += 1;
    });

    if (this.frames.length === 1) {
      const frameAlone = document.querySelector(".frames__frame_selected");

      frameAlone
        .querySelector(".frame__delete")
        .classList.remove("frame__visible");
      frameAlone
        .querySelector(".frame__move")
        .classList.remove("frame__visible");
    }
  }

  _copyFrame(currentButton) {
    if (this.frames.length === 1) {
      const frameAlone = document.querySelector(".frames__frame_selected");

      frameAlone
        .querySelector(".frame__delete")
        .classList.add("frame__visible");
      frameAlone.querySelector(".frame__move").classList.add("frame__visible");
    }

    let i = 0;
    this.canvasClear();

    const { number } = currentButton.parentElement.dataset;
    let frame = currentButton.parentElement;
    const newFrame = frame.cloneNode(true);

    const newCanvas = this._cloneCanvas(newFrame);
    const newCanvasCtx = newCanvas.getContext("2d");

    this.frames.splice(+number, 0, newCanvas);
    this.frameContainer.insertBefore(newFrame, frame);

    frame = this.frames[+number + 1];
    const img = new Image();
    const frameContent = frame.toDataURL();

    img.src = frameContent;
    img.onload = () => {
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      newCanvasCtx.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
    };

    [...this.frameContainer.children].forEach((frameEl) => {
      frameEl.querySelector(".frame__number").textContent = i + 1;
      frameEl.dataset.number = i;
      i += 1;
      frameEl.classList.remove("frames__frame_selected");
    });

    currentButton.parentElement.classList.add("frames__frame_selected");
  }

  _cloneCanvas(newFrame) {
    const frameResolution = 512;
    let newCanvas = newFrame.querySelector(".frames__canvas");
    newCanvas.remove();
    newCanvas = document.createElement("canvas");
    newCanvas.classList.add("canvas", "frames__canvas");
    newCanvas.width = frameResolution;
    newCanvas.height = frameResolution;

    const beforeElement = newFrame.querySelector(".frame__number");
    newFrame.insertBefore(newCanvas, beforeElement);

    return newCanvas;
  }
}
