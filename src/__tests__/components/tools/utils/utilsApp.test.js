import Utils from "../../../../components/tools/utils/UtilsApp"; // eslint-disable-line import/no-unresolved

const utils = new Utils();

describe("Utils testing", () => {
  test("Utils getCursorPosition should be defined", () => {
    expect(utils.getCursorPosition).toBeDefined();
  });

  test("Utils rgbToHex should be defined", () => {
    expect(utils.rgbToHex).toBeDefined();
  });

  test("Utils hexToRgb should be defined", () => {
    expect(utils.hexToRgb).toBeDefined();
  });

  test("Utils getCursorPosition should be typeof function", () => {
    expect(typeof utils.getCursorPosition).toBe("function");
  });

  test("Utils rgbToHex should be typeof function", () => {
    expect(typeof utils.rgbToHex).toBe("function");
  });

  test("Utils hexToRgb should be typeof function", () => {
    expect(typeof utils.hexToRgb).toBe("function");
  });
});
