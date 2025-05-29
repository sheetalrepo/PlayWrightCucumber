const HomeBDDPage = require('./HomeBDDPage.js');
const LoginBDDPage = require('./LoginBDDPage.js');
const RegisterBDDPage = require('./RegisterBDDPage.js');
/**
 * Page Object Manager
 *  - Initialize all the pages
 *  - getter methods for all the pages
 * 
 */
class POBDDManager{

    constructor(page){
        console.log(">>> POM Manager Page Constructor")
        this.page = page;
        this.homeBddPageObj = new HomeBDDPage(this.page)
        this.loginBDDPage = new LoginBDDPage(this.page)
        this.registerBDDPage = new RegisterBDDPage(this.page)
    }

    getHomeBDDPage(){
        return this.homeBddPageObj;
    }

    getLoginBDDPage(){
        return this.loginBDDPage;
    }

    getRegisterBDDPage(){
        return this.registerBDDPage;
    }
}

module.exports = POBDDManager;