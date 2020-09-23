import hexToRgb from "../../../../components/tools/utils/hexToRgb";

const hex = {
  example1: "#532546",
  example2: "#caf127",
  example3: "#000000",
  example4: "#ffffff",
};

describe("utils hexToRgb testing", () => {
  test("hexToRgb should be defined", () => {
    expect(hexToRgb(hex.example1)).toBeDefined();
  });

  test("hexToRgb should be typeof object", () => {
    expect(typeof hexToRgb(hex.example1)).toBe("object");
  });

  test("hexToRgb should return { 83, 37, 70 }", () => {
    expect(hexToRgb(hex.example1).r).toBe(83);
    expect(hexToRgb(hex.example1).g).toBe(37);
    expect(hexToRgb(hex.example1).b).toBe(70);
  });

  test("hexToRgb should return { 202, 241, 39 }", () => {
    expect(hexToRgb(hex.example2).r).toBe(202);
    expect(hexToRgb(hex.example2).g).toBe(241);
    expect(hexToRgb(hex.example2).b).toBe(39);
  });

  test("hexToRgb should return { 0, 0, 0 }", () => {
    expect(hexToRgb(hex.example3).r).toBe(0);
    expect(hexToRgb(hex.example3).g).toBe(0);
    expect(hexToRgb(hex.example3).b).toBe(0);
  });

  test("hexToRgb should return { 255, 255, 255 }", () => {
    expect(hexToRgb(hex.example4).r).toBe(255);
    expect(hexToRgb(hex.example4).g).toBe(255);
    expect(hexToRgb(hex.example4).b).toBe(255);
  });
});
