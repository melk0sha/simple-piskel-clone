export default class KeyModalWindow {
  init(keys, restoreDefaultKeys, updateKey) {
    this.events = {
      click: "click",
      keyup: "keyup",
    };

    this.keys = keys;
    this.restoreDefaultKeys = restoreDefaultKeys;
    this.updateKey = updateKey;

    this._toggleModalWindow();
    this._restoreDefaultShortcuts();
    this._exitButtonInit();
    this._addKeyUpdating();
  }

  _toggleModalWindow() {
    const modalButton = document.querySelector(".modal-keyboard");

    modalButton.addEventListener(
      this.events.click,
      this._toggleModalWindowEvent.bind(this)
    );
  }

  _toggleModalWindowEvent() {
    const modalContainer = document.querySelector(".modal");

    modalContainer.classList.toggle("modal_closed");
  }

  _exitButtonInit() {
    const exit = document.querySelector(".modal__exit");

    exit.addEventListener(this.events.click, this._toggleModalWindowEvent);
  }

  _restoreDefaultShortcuts() {
    const defaultButton = document.querySelector(".modal__default");

    defaultButton.addEventListener(
      this.events.click,
      this.restoreDefaultKeys.bind(this)
    );
  }

  _addKeyUpdating() {
    const modalMain = document.querySelector(".modal__main");
    const keyError = document.querySelector(".key-error__btn");

    modalMain.addEventListener(
      this.events.click,
      this._keyUpdatingEvent.bind(this)
    );
    document.addEventListener(
      this.events.keyup,
      this._keyUpdatingToNewKeyEvent.bind(this)
    );
    keyError.addEventListener(this.events.click, this._keyErrorExit.bind(this));
  }

  _keyUpdatingEvent(event) {
    this.currentButton = event.target;

    if (
      this.currentButton.tagName === "SPAN" ||
      this.currentButton.tagName === "P"
    ) {
      this.currentButton = this.currentButton.parentElement;
    }

    if (!this.currentButton.classList.contains("select-key")) {
      return;
    }

    this.currentButton.classList.add("key__active");
  }

  _keyUpdatingToNewKeyEvent(event) {
    if (!this.currentButton) {
      return;
    }

    if (this.currentButton.classList.contains("key__active")) {
      const currentKeyElement = document.querySelector(".key__active");
      const keyCheck = event.code.slice(0, 3);
      const toKey = event.code.slice(-1);
      const keyError = document.querySelector(".key-error");

      if (keyCheck !== "Key") {
        keyError.querySelector(".key-error__description").textContent =
          "Please use only english letters (ex. A)";

        keyError.classList.remove("key-error_closed");
        currentKeyElement.classList.remove("key__active");
        return;
      }

      if (
        toKey === this.keys.penKey ||
        toKey === this.keys.colorSelectKey ||
        toKey === this.keys.paintBucketKey ||
        toKey === this.keys.eraserKey ||
        toKey === this.keys.paintSwapKey ||
        toKey === this.keys.strokeKey ||
        toKey === this.keys.colorSwapKey ||
        toKey === this.keys.previewFullScreenKey ||
        toKey === this.keys.addNewFrame ||
        toKey === this.keys.deleteFrame ||
        toKey === this.keys.copyFrame ||
        toKey === this.keys.clearCanvas ||
        toKey === this.keys.exportGIF ||
        toKey === this.keys.exportAPNG
      ) {
        keyError.querySelector(".key-error__description").textContent =
          "Such a key already exists";

        keyError.classList.remove("key-error_closed");
        currentKeyElement.classList.remove("key__active");
        return;
      }

      this.updateKey.call(this, currentKeyElement, toKey);

      currentKeyElement.classList.remove("key__active");
    }
  }

  _keyErrorExit() {
    const keyError = document.querySelector(".key-error");

    keyError.classList.add("key-error_closed");
  }
}
