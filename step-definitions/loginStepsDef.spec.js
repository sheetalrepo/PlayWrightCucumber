const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const POBDDManager = require('../pages/POBDDManager.js');

//IMP: Change "()=>" to "function()"
Given('the user opens the website', async function () { 
  console.log("#Given Open Webpage");
  console.log(`>>> Thread ID: ${process.pid} - Running test scenario`);
  await this.homeBddPageObj.openBaseURL();
  await this.homeBddPageObj.verifyHomePage();
});


When('the user navigates to the login page', async function () { 
  console.log("#When Click Title");
  await this.homeBddPageObj.goToLoginPage();
});


When('the user enters credentials {string} and {string}', async function(uName, password){
  console.log("#When Enter Credentials ");
  //console.log(`Username: ${uName}, Password: ${password}`);
  this.loginBddPageObj = this.poBddManager.getLoginBDDPage();
  await this.loginBddPageObj.verifyLoginPage();
  await this.loginBddPageObj.loginWithUserPassword(uName, password);
});


Then('the user should be logged in successfully', async function () { 
  console.log("#Then Verify Login");
  let actualTextMessage = await this.loginBddPageObj.getLoginSuccessMessage();
  expect(actualTextMessage).toEqual("You logged into a secure area!");  //await not required
});