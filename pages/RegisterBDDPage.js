/**
 * methods: async is mandatory with methods declaration
 * export: module.exports = RegisterBDDPage;   //No curly braces
 */
class RegisterBDDPage{

    constructor(page){
        console.log(">>> Register Page Constructor")
        this.page = page;
        this.h1TextRegisterPage = page.locator('text="Test Register page for Automation Testing Practice"');
        this.username = page.locator('input#username');
        this.password = page.locator('input#password');
        this.confirmPassword = page.locator('input#confirmPassword');
        this.submitButton = page.locator("button:has-text('Register')");  //Register
    }

    async registerNewUser(uName, password){
        await this.username.fill(uName);     
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
        await this.submitButton.click();
    }

    async verifyRegisterPage() {
        await this.h1TextRegisterPage.isVisible();  
    }
}

module.exports = RegisterBDDPage;