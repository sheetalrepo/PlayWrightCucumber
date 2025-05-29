const { setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld {
  constructor() {
    console.log(">>> Custom World Class Constructor")
    this.browser = null;
    this.page = null;
    this.poBddManager = null;
    this.homeBddPageObj = null;
    this.loginBddPageObj = null;
    this.registerBddPageObj = null;
  }
}

setWorldConstructor(CustomWorld);
