/**
 * methods: async is mandatory with methods declaration
 * export: module.exports = HomeBDDPage;   //No curly braces
 */
class HomeBDDPage{

    constructor(page){
        console.log(">>> Home Page Constructor")
        this.page = page;
        this.h1TextHomePage = page.locator('text="Automation Testing Practice for QA and Developers"');
        this.loginPageLink = page.locator('text="Test Login Page"');  
        this.registerPageLink = page.locator('text="Test Register Page"');    
        this.searchInput = page.locator("input#search-input");   //tag#id
        this.searchButton = page.locator("button#search-button");   //tag#id
        
    }

    /**
     * TODO: From Config
     */
    async openBaseURL() {
        //console.log(">>> Open base url")
        await this.page.goto('https://practice.expandtesting.com/');
        await this.h1TextHomePage.waitFor();
    }

    async goToLoginPage() {
        await this.loginPageLink.click();
    }

    async goToRegisterPage() {
        await this.registerPageLink.click();
    }

    async getH1Text() {
        await this.h1TextHomePage.isVisible();
        const text = await this.h1TextHomePage.textContent(); 
        return text;
    }
    
    async searchForKeyword(keyword){
        await this.searchInput.fill(keyword); 
        await this.searchButton.click();
    }

    async verifyHomePage() {
        await this.h1TextHomePage.isVisible();  
    }
}

module.exports = HomeBDDPage;