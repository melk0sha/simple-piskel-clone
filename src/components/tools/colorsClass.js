export default class Colors {
  constructor() {
    this.colors = {
      primary: "#aa7bc0",
      secondary: "#000000",
    };

    this.events = {
      click: "click",
      change: "change",
    };

    this.primaryColorElement = document.querySelector(".palette__primary");
    this.secondaryColorElement = document.querySelector(".palette__secondary");
    this.swapColorsElement = document.querySelector(".palette__swap");
  }

  initColors() {
    this._changeColorsEvent();
  }

  updatePrimaryColorElement(value) {
    this.primaryColorElement.value = value;
    this.colors.primary = value;
  }

  updateSecondaryColorElement(value) {
    this.secondaryColorElement.value = value;
    this.colors.secondary = value;
  }

  swapColors() {
    const buferPrimaryColor = this.colors.primary;
    const buferPrimaryColorElementValue = this.primaryColorElement.value;

    this.colors.primary = this.colors.secondary;
    this.colors.secondary = buferPrimaryColor;

    this.primaryColorElement.value = this.secondaryColorElement.value;
    this.secondaryColorElement.value = buferPrimaryColorElementValue;
  }

  _changeColorsEvent() {
    this.primaryColorElement.addEventListener(
      this.events.change,
      this._changePrimaryColorEvent.bind(this)
    );
    this.secondaryColorElement.addEventListener(
      this.events.change,
      this._changeSecondaryColorEvent.bind(this)
    );
    this.swapColorsElement.addEventListener(
      this.events.click,
      this.swapColors.bind(this)
    );
  }

  _changePrimaryColorEvent() {
    this.colors.primary = this.primaryColorElement.value;
  }

  _changeSecondaryColorEvent() {
    this.colors.secondary = this.secondaryColorElement.value;
  }
}
