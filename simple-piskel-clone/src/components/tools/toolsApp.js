import Pen from "./penClass";
import PaintBucket from "./paintBucketClass";
import ColorSelect from "./colorSelectClass";
import Eraser from "./eraserClass";
import PaintSwap from "./paintSwapClass";
import Stroke from "./strokeClass";
import Colors from "./colorsClass";

export default class ToolsApp {
    init(canvas, ctx, keys) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.keys = keys;

        this._initTools();
    }

    _initTools() {
        this.penSizeElement = document.querySelector(".pen-size");
        this.tools = document.querySelector(".tools");

        this.colors = new Colors();
        this.colors.initColors();

        this.pen = new Pen(this.canvas, this.ctx, this.colors);
        this.paintBucket = new PaintBucket(this.canvas, this.ctx, this.colors);
        this.colorSelect = new ColorSelect(this.canvas, this.ctx, this.colors);
        this.paintSwap = new PaintSwap(this.canvas, this.ctx, this.colors);
        this.eraser = new Eraser(this.canvas, this.ctx, this.colors);
        this.stroke = new Stroke(this.canvas, this.ctx, this.colors);

        this.pen.initPen();
        this.paintBucket.initPaintBucket();
        this.colorSelect.initColorSelect();
        this.paintSwap.initPaintSwap();
        this.eraser.initEraser();
        this.stroke.initStroke();

        this._initHandlers();
        this.setActiveTool();

        this.penSizeElement.addEventListener(this.pen.events.click,
            this._changePenSizeElement.bind(this));
        this.tools.addEventListener(this.pen.events.click, this.setActiveTool.bind(this));
        document.addEventListener(this.pen.events.keyup, this.setActiveTool.bind(this));
    }

    _initHandlers() {
        this.drawMouseDown = this.pen.drawMouseDown.bind(this.pen);
        this.drawMouseMove = this.pen.drawMouseMove.bind(this.pen);
        this.drawMouseUp = this.pen.drawMouseUp.bind(this.pen);

        this.colorSelectActive = this.colorSelect.colorSelectActive.bind(this.colorSelect);

        this.paintBucketActive = this.paintBucket.paintBucketActive.bind(this.paintBucket);

        this.eraserMouseDown = this.eraser.eraserMouseDown.bind(this.eraser);
        this.eraserMouseMove = this.eraser.eraserMouseMove.bind(this.eraser);
        this.eraserMouseUp = this.eraser.eraserMouseUp.bind(this.eraser);

        this.paintSwapActive = this.paintSwap.paintSwapActive.bind(this.paintSwap);

        this.strokeMouseDown = this.stroke.strokeMouseDown.bind(this.stroke);
        this.strokeMouseMove = this.stroke.strokeMouseMove.bind(this.stroke);
        this.strokeMouseUp = this.stroke.strokeMouseUp.bind(this.stroke);
    }

    _changePenSizeElement(event) {
        this.pen.changePenSize(event.target);
        this.eraser.changePenSize(event.target);
    }

    setActiveTool(event) {
        if (event) {
            this._checkByKey.call(this, event);
        }

        const tool = [...this.tools.children].find(
            (toolElement) => toolElement.classList.contains("tools__tool_active") === true,
        );

        if (tool === this.pen.getElement()) {
            this._clearEventListeners();
            this.canvas.addEventListener(this.pen.events.mousedown, this.drawMouseDown);
            this.canvas.addEventListener(this.pen.events.mousemove, this.drawMouseMove);
            this.canvas.addEventListener(this.pen.events.mouseup, this.drawMouseUp);
        } else if (tool === this.colorSelect.getElement()) {
            this._clearEventListeners();
            this.canvas.addEventListener(this.colorSelect.events.mousedown, this.colorSelectActive);
        } else if (tool === this.paintBucket.getElement()) {
            this._clearEventListeners();
            this.canvas.addEventListener(this.paintBucket.events.mousedown, this.paintBucketActive);
        } else if (tool === this.eraser.getElement()) {
            this._clearEventListeners();
            this.canvas.addEventListener(this.eraser.events.mousedown, this.eraserMouseDown);
            this.canvas.addEventListener(this.eraser.events.mousemove, this.eraserMouseMove);
            this.canvas.addEventListener(this.eraser.events.mouseup, this.eraserMouseUp);
        } else if (tool === this.paintSwap.getElement()) {
            this._clearEventListeners();
            this.canvas.addEventListener(this.paintSwap.events.mousedown, this.paintSwapActive);
        } else if (tool === this.stroke.getElement()) {
            this._clearEventListeners();
            this.canvas.addEventListener(this.stroke.events.mousedown, this.strokeMouseDown);
            this.canvas.addEventListener(this.stroke.events.mousemove, this.strokeMouseMove);
            this.canvas.addEventListener(this.stroke.events.mouseup, this.strokeMouseUp);
        }
    }

    _checkByKey(event) {
        const penKey = `Key${this.keys.penKey}`;
        const colorSelectKey = `Key${this.keys.colorSelectKey}`;
        const paintBucketKey = `Key${this.keys.paintBucketKey}`;
        const eraserKey = `Key${this.keys.eraserKey}`;
        const paintSwapKey = `Key${this.keys.paintSwapKey}`;
        const strokeKey = `Key${this.keys.strokeKey}`;
        const colorSwap = `Key${this.keys.colorSwapKey}`;

        if (event.code === penKey) {
            this.pen.changeActiveElement(this.pen.getElement());
        } else if (event.code === colorSelectKey) {
            this.colorSelect.changeActiveElement(this.colorSelect.getElement());
        } else if (event.code === paintBucketKey) {
            this.paintBucket.changeActiveElement(this.paintBucket.getElement());
        } else if (event.code === eraserKey) {
            this.eraser.changeActiveElement(this.eraser.getElement());
        } else if (event.code === paintSwapKey) {
            this.paintSwap.changeActiveElement(this.paintSwap.getElement());
        } else if (event.code === strokeKey) {
            this.stroke.changeActiveElement(this.stroke.getElement());
        } else if (event.code === colorSwap) {
            this.colors.swapColors();
        }
    }

    _clearEventListeners() {
        this.canvas.removeEventListener(this.pen.events.mousedown, this.drawMouseDown);
        this.canvas.removeEventListener(this.pen.events.mousemove, this.drawMouseMove);
        this.canvas.removeEventListener(this.pen.events.mouseup, this.drawMouseUp);

        this.canvas.removeEventListener(this.colorSelect.events.mousedown, this.colorSelectActive);

        this.canvas.removeEventListener(this.paintBucket.events.mousedown, this.paintBucketActive);

        this.canvas.removeEventListener(this.eraser.events.mousedown, this.eraserMouseDown);
        this.canvas.removeEventListener(this.eraser.events.mousemove, this.eraserMouseMove);
        this.canvas.removeEventListener(this.eraser.events.mouseup, this.eraserMouseUp);

        this.canvas.removeEventListener(this.paintSwap.events.mousedown, this.paintSwapActive);

        this.canvas.removeEventListener(this.stroke.events.mousedown, this.strokeMouseDown);
        this.canvas.removeEventListener(this.stroke.events.mousemove, this.strokeMouseMove);
        this.canvas.removeEventListener(this.stroke.events.mouseup, this.strokeMouseUp);
    }
}
