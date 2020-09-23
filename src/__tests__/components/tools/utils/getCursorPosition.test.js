import getCursorPosition from "../../../../components/tools/utils/getCursorPosition";

const event = {
  offsetX: 1,
  offsetY: 1,
};

describe("utils getCursorPosition testing", () => {
  test("Cursor position should be defined", () => {
    expect(getCursorPosition(event)).toBeDefined();
  });

  test("Cursor position should be typeof object", () => {
    expect(typeof getCursorPosition(event)).toBe("object");
  });

  test("Cursor position should be array", () => {
    expect(getCursorPosition(event)).toEqual(expect.arrayContaining([]));
  });

  test("Cursor position should be [1, 1]", () => {
    expect(getCursorPosition(event)).toEqual(expect.arrayContaining([1, 1]));
  });

  test("Cursor position should be [34, 75]", () => {
    event.offsetX = 34;
    event.offsetY = 75;
    expect(getCursorPosition(event)).toEqual(expect.arrayContaining([34, 75]));
  });
});
