import ExportUPNG from "./exportUPNG";
import ExportGIF from "./exportGIF";

export default class Export {
  init(canvas, frames, preview) {
    this.events = {
      click: "click",
    };

    this.canvas = canvas;
    this.frames = frames;
    this.preview = preview;

    this.exportUPNG = new ExportUPNG();
    this.exportGIF = new ExportGIF();

    this._getExportInit();
  }

  _getExportInit() {
    const exportButton = document.querySelector(".export-btn");
    this.exportButtonGIF = document.querySelector(".export-gif");
    this.exportButtonUPNG = document.querySelector(".export-upng");

    exportButton.addEventListener(
      this.events.click,
      this._getExportInitEvent.bind(this)
    );
    this.exportButtonGIF.addEventListener(
      this.events.click,
      this._getExportGIFEvent.bind(this)
    );
    this.exportButtonUPNG.addEventListener(
      this.events.click,
      this._getExportUPNGEvent.bind(this)
    );
  }

  _getExportInitEvent() {
    this.exportButtonGIF.classList.toggle("export_closed");
    this.exportButtonUPNG.classList.toggle("export_closed");
  }

  _getExportGIFEvent() {
    this.exportGIF.export(this.canvas, this.frames, this.preview);
  }

  _getExportUPNGEvent() {
    this.exportUPNG.export(this.canvas, this.frames, this.preview);
  }
}
