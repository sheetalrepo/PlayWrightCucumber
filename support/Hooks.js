const { Before } = require('@cucumber/cucumber');
const { webkit, chromium, firefox } = require('playwright');
const POBDDManager = require('../pages/POBDDManager.js');

/**
 * TODO: 
 *  - browser name: config
 *  - headless: config
 */
Before(async function () {
  console.log("#Before Hook: Initializing Browser and Page Objects");
  this.browser = await webkit.launch({ headless: false });
  const context = await this.browser.newContext();
  this.page = await context.newPage();

  this.poBddManager = new POBDDManager(this.page);
  this.homeBddPageObj = this.poBddManager.getHomeBDDPage();
  this.loginBddPageObj = this.poBddManager.getLoginBDDPage();
  this.registerBddPageObj = this.poBddManager.getRegisterBDDPage();
});