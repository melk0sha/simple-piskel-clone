import Canvas from "./canvas/canvas";
import Export from "./export/export";
import Frames from "./frames/frames";
import Preview from "./preview/preview";
import ToolsApp from "./tools/toolsApp";
import KeyModalWindow from "./modalWindow/modalWindow";
import Shortcuts from "./shortcuts/shortcuts";
import LocalStorage from "./localStorage/localStorage";
import Authentication from "./authentication/authentication";

export default class App {
  init() {
    const toolsApp = new ToolsApp();
    const canvas = new Canvas();
    const preview = new Preview();
    const frames = new Frames();
    const modalWindow = new KeyModalWindow();
    const keys = new Shortcuts();
    const download = new Export();
    const localStorage = new LocalStorage();
    const authentication = new Authentication();

    authentication.init();
    canvas.init(keys.keys);
    frames.init(
      canvas.canvas,
      canvas.ctx,
      canvas.canvasClearInitEvent,
      keys.keys
    );
    toolsApp.init(canvas.canvas, canvas.ctx, keys.keys);
    preview.init(frames.frames, canvas.canvasClearInitEvent, keys.keys);
    modalWindow.init(keys.keys, keys.restoreDefaultShortcuts, keys.updateKey);
    download.init(canvas.canvas, frames.frames, preview);
    localStorage.init(canvas, keys, preview, toolsApp);
  }
}
