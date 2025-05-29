/**
 * methods: async is mandatory with methods declaration
 * export: module.exports = LoginBDDPage;   //No curly braces
 */
class LoginBDDPage{

    constructor(page){
        console.log(">>> Login Page Constructor")
        this.page = page;
        this.h1TextLoginPage = page.locator('text="Test Login page for Automation Testing Practice"');
        this.username = page.locator('input#username');
        this.password = page.locator('#password');
        this.submitButton = page.locator("[type='submit']");
        this.successMessage = page.locator('text="You logged into a secure area!"');
        this.successNewRegistrationMessage = page.locator('text="Successfully registered, you can log in now."');
        
    }

    async loginWithUserPassword(uName, password){
        await this.username.fill(uName);   
        //await this.page.pause();   
        await this.password.fill(password);
        await this.submitButton.click();
    }

    async getLoginSuccessMessage(){
        await this.successMessage.isVisible();
        const text = await this.successMessage.textContent(); 
        return text;
    }

    async verifyLoginPage() {
        await this.h1TextLoginPage.isVisible();  
    }

    /**
     * User comes to Login page after successful registration
     * Hence verification will be on login page 
     */
    async verifyNewRegistrationMessage() {
        await this.successNewRegistrationMessage.isVisible();  
    }
}

module.exports = LoginBDDPage;