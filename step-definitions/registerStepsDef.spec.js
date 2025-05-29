const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const POBDDManager = require('../pages/POBDDManager.js');

When('the user navigates to the register page', async function () { 
  console.log("#When Click Register Page Title");
  await this.homeBddPageObj.goToRegisterPage();
});


When('the user enters new user credentials {string} and {string}', async function(newUserName, password) {
  console.log("#When Enter New Credentials for Registration ");
  //console.log(`Username: ${newUserName}, Password: ${password}`);
 
  this.registerBddPageObj = this.poBddManager.getRegisterBDDPage();
  await this.registerBddPageObj.verifyRegisterPage();
  await this.registerBddPageObj.registerNewUser(newUserName, password);
});


Then('the new user should have been created successfully', async function () { 
  console.log("#Then Verify New User");
  this.loginBddPageObj = this.poBddManager.getLoginBDDPage();
  await this.loginBddPageObj.verifyNewRegistrationMessage();
});