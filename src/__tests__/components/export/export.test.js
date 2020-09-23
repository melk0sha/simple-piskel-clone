import Export from "../../../components/export/export";

const jsdom = require("jsdom");

const { JSDOM } = jsdom;
const { document } = new JSDOM(
  '<!DOCTYPE html><div class="export-gif export_closed"></div><div class="export-upng export_closed"></div>'
).window;

const download = new Export();

download.exportButtonGIF = document.querySelector(".export-gif");
download.exportButtonUPNG = document.querySelector(".export-upng");

describe("Export testing", () => {
  test("Buttons of export should toggle theirs classes to don't have closed class", () => {
    download._getExportInitEvent();

    expect(
      download.exportButtonGIF.classList.contains("export_closed")
    ).toBeFalsy();
    expect(
      download.exportButtonUPNG.classList.contains("export_closed")
    ).toBeFalsy();
  });

  test("Buttons of export should toggle theirs classes", () => {
    download._getExportInitEvent();

    expect(
      download.exportButtonGIF.classList.contains("export_closed")
    ).toBeTruthy();
    expect(
      download.exportButtonUPNG.classList.contains("export_closed")
    ).toBeTruthy();
  });
});
