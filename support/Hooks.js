const {BeforeAll, AfterAll} = require('@cucumber/cucumber');
const {Before, After } = require('@cucumber/cucumber');
const {BeforeStep, AfterStep} = require('@cucumber/cucumber');
const {Status} = require('@cucumber/cucumber');
const { webkit, chromium, firefox } = require('playwright');
const POBDDManager = require('../pages/POBDDManager.js');

//Default Browser = WEBKIT & Default Mode = UI 
const browserType = process.env.BROWSER || 'webkit';
const isHeadless = process.env.HEADLESS ? process.env.HEADLESS.toLowerCase() === 'true' : false;


BeforeAll(async function () {
  await console.log("----------------------------------------------------->>> Before All");
});

AfterAll(async function () {
  await console.log("----------------------------------------------------->>> After All");
});



/**
 * Before Every Scenario
 */
Before(async function () {
  await console.log("----------------------------------------->>> Before: Initializing Browser and Page Objects");
  await console.log(`----------------------------------------->>> SELECTED BROWSER: ${browserType}`);
  await console.log(`----------------------------------------->>> HEADLESS MODE: ${isHeadless}`);

  //this.browser = await webkit.launch({ headless: false });
  this.browser = await {
    'chromium': chromium,
    'firefox': firefox,
    'webkit': webkit
  }[browserType].launch({ headless: isHeadless });

  const context = await this.browser.newContext();
  this.page = await context.newPage();

  this.poBddManager = new POBDDManager(this.page);
  this.homeBddPageObj = this.poBddManager.getHomeBDDPage();
  this.loginBddPageObj = this.poBddManager.getLoginBDDPage();
  this.registerBddPageObj = this.poBddManager.getRegisterBDDPage();
});

After(async function () {
  await console.log("----------------------------------------->>> After");
});




BeforeStep(async function () {
  await console.log("------------------>>> Before Step");
});

AfterStep( async function ({result}) {
  await console.log("------------------>>> After Step");
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
      await this.page.screenshot({path: 'abc.png'});
  }
});


