export default class LocalStorage {
    init(canvas, keys, preview, toolsApp) {
        this.events = {
            beforeunload: "beforeunload",
        };

        this.items = {
            keys: "keys",
            fps: "fps",
            colors: "colors",
            tool: "tool",
            penSize: "penSize",
            canvasResolution: "canvasResolution",
        };

        this.canvas = canvas;
        this.keys = keys.keys;
        this.keyUpdate = keys.updateKey;
        this.preview = preview;
        this.toolsApp = toolsApp;
        this.colors = toolsApp.colors;

        this._saveBeforeExit();
        this._initializeUserSettings();
    }

    _initializeUserSettings() {
        this.previousSessionKeys = JSON.parse(localStorage.getItem(this.items.keys));
        this.previousSessionFPS = localStorage.getItem(this.items.fps);
        this.previousSessionColors = JSON.parse(localStorage.getItem(this.items.colors));
        this.previousSessionTool = localStorage.getItem(this.items.tool);
        this.previousSessionPenSize = localStorage.getItem(this.items.penSize);
        this.previousSessionCanvasResolution = localStorage.getItem(this.items.canvasResolution);

        if (this.previousSessionKeys) {
            this._updateKeys();
        }

        if (this.previousSessionFPS) {
            this._updateFPS();
        }

        if (this.previousSessionColors) {
            this._updateColors();
        }

        if (this.previousSessionTool) {
            this._updateTool();
        }

        if (this.previousSessionPenSize) {
            this._updatePenSize();
        }

        if (this.previousSessionCanvasResolution) {
            this._updateCanvasResolution();
        }
    }

    _updateKeys() {
        this.keyUpdate(document.querySelector(".pen-key"), this.previousSessionKeys.penKey);
        this.keyUpdate(document.querySelector(".color-select-key"), this.previousSessionKeys.colorSelectKey);
        this.keyUpdate(document.querySelector(".paint-bucket-key"), this.previousSessionKeys.paintBucketKey);
        this.keyUpdate(document.querySelector(".eraser-key"), this.previousSessionKeys.eraserKey);
        this.keyUpdate(document.querySelector(".paint-swap-key"), this.previousSessionKeys.paintSwapKey);
        this.keyUpdate(document.querySelector(".stroke-key"), this.previousSessionKeys.strokeKey);
        this.keyUpdate(document.querySelector(".swap-colors-key"), this.previousSessionKeys.colorSwapKey);
        this.keyUpdate(document.querySelector(".full-screen-key"), this.previousSessionKeys.previewFullScreenKey);
        this.keyUpdate(document.querySelector(".add-new-frame-key"), this.previousSessionKeys.addNewFrame);
        this.keyUpdate(document.querySelector(".delete-frame-key"), this.previousSessionKeys.deleteFrame);
        this.keyUpdate(document.querySelector(".copy-frame-key"), this.previousSessionKeys.copyFrame);
        this.keyUpdate(document.querySelector(".clear-canvas-key"), this.previousSessionKeys.clearCanvas);
        this.keyUpdate(document.querySelector(".export-gif-key"), this.previousSessionKeys.exportGIF);
        this.keyUpdate(document.querySelector(".export-apng-key"), this.previousSessionKeys.exportAPNG);
    }

    _updateFPS() {
        const range = document.querySelector(".fps__range");
        const value = document.querySelector(".fps__value");

        this.preview.fps = this.previousSessionFPS;
        value.textContent = this.previousSessionFPS;
        range.value = this.previousSessionFPS;

        this.preview.animateInit();
    }

    _updateColors() {
        this.colors.updatePrimaryColorElement(this.previousSessionColors.primary);
        this.colors.updateSecondaryColorElement(this.previousSessionColors.secondary);
    }

    _updateTool() {
        const updateToolElement = document.querySelector(`.tools__${this.previousSessionTool}`);

        [...updateToolElement.parentElement.children].forEach((tool) => {
            tool.classList.remove("tools__tool_active");
        });

        updateToolElement.classList.add("tools__tool_active");

        this.toolsApp.setActiveTool();
    }

    _updatePenSize() {
        const updatePenSizeElement = document.querySelector(`.pen-size__${this.previousSessionPenSize}pixel`);

        [...updatePenSizeElement.parentElement.children].forEach((size) => {
            size.classList.remove("pen-size__option_active");
        });

        updatePenSizeElement.classList.add("pen-size__option_active");

        this.toolsApp.pen.changePenSize(updatePenSizeElement);
        this.toolsApp.eraser.changePenSize(updatePenSizeElement);
    }

    _updateCanvasResolution() {
        const updateResolutionElement = document.querySelector(`.canvas-size__btn__${
            this.previousSessionCanvasResolution}x${this.previousSessionCanvasResolution}`);
        const resolution = this.previousSessionCanvasResolution;

        [...updateResolutionElement.parentElement.children].forEach((res) => {
            res.classList.remove("canvas-size__btn_active");
        });

        updateResolutionElement.classList.add("canvas-size__btn_active");

        this.canvas.updateCanvasResolution(resolution);
    }

    _saveBeforeExit() {
        window.addEventListener(this.events.beforeunload, () => {
            const { tool } = document.querySelector(".tools__tool_active").dataset;
            const penSize = document.querySelector(".pen-size__option_active").dataset.value;
            const canvasResolution = document.querySelector(".canvas-size__btn_active").dataset.resolution;

            localStorage.setItem(this.items.keys, JSON.stringify(this.keys));
            localStorage.setItem(this.items.fps, this.preview.fps);
            localStorage.setItem(this.items.colors, JSON.stringify(this.colors.colors));
            localStorage.setItem(this.items.tool, tool);
            localStorage.setItem(this.items.penSize, penSize);
            localStorage.setItem(this.items.canvasResolution, canvasResolution);
        });
    }
}
