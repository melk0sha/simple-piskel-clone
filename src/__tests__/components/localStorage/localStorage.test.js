import LocalStorage from "../../../components/localStorage/localStorage";

const localStorage = new LocalStorage();

localStorage.colors = {
  primary: 0,
  secondary: 0,
  updatePrimaryColorElement(color) {
    this.primary = color;
  },
  updateSecondaryColorElement(color) {
    this.secondary = color;
  },
};

localStorage.previousSessionColors = {
  primary: "#ffffff",
  secondary: "#000000",
};

describe("LocalStorage testing", () => {
  test("Colors should be defined", () => {
    localStorage._updateColors();
    localStorage._updateColors();

    expect(localStorage.colors.primary).toBeDefined();
    expect(localStorage.colors.secondary).toBeDefined();
  });

  test("Colors should be #ffffff and #000000", () => {
    localStorage._updateColors();
    localStorage._updateColors();

    expect(localStorage.colors.primary).toBe("#ffffff");
    expect(localStorage.colors.secondary).toBe("#000000");
  });

  test("Colors should be #3f23a6 and #af54g6", () => {
    localStorage.previousSessionColors.primary = "#3f23a6";
    localStorage.previousSessionColors.secondary = "#af54g6";

    localStorage._updateColors();
    localStorage._updateColors();

    expect(localStorage.colors.primary).toBe("#3f23a6");
    expect(localStorage.colors.secondary).toBe("#af54g6");
  });
});
