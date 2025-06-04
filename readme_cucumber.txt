============================================================================================================
============================================================================================================
#Playwright Cucumber Framework
Docs: https://github.com/cucumber/cucumber-js

@ProdBug108 https://www.youtube.com/watch?v=Ycz-jTm3Wj8&list=PLEiBaBxmVLi90bbLcPmzXwB75CaujLP9l
============================================================================================================

#Installation:
1. Run installation command in VSCode > Terminal
        npm install @cucumber/cucumber                                               
        npm install --save-dev @cucumber/cucumber   | Preferred: Not included when deploying to production
              
2. Install VSCode Cucumber Plugin from VSCode Extensions 
       - Cucumber (Gherkin) Full Support
        
3. Verify Cucumber Installation
        - Check package.json dependencies section for cucumber entry 
        - VSCode project > node_module > bin > cucumber-js 
        - Run cmd
                vscode:   npm list --depth=0 | findstr cucumber
                gitbash:  npm list --depth=0 | grep cucumber
                


============================================================================================================
============================================================================================================
#How to run cases:
============================================================================================================
#CMD mode
npx cucumber-js                         | by default runs in parallel                                                                        
npx cucumber-js --exit                  | browser will get closed automatically
npx cucumber-js --dry-run               | steps will not execute
npx cucumber-js --parallel 1            | sequencial mode
npx cucumber-js --parallel 2            | two threads 
npx cucumber-js --exit --parallel 2     | parallel + browser exit 
npx cucumber-js features/login.feature --exit           | Pass feature file name
npx cucumber-js --tags="@sanity" --exit                 | Single Tags
npx cucumber-js --tags="@sanity and @reg" --exit        | Mult Tags: AND Gate 
npx cucumber-js --tags="@sanity or @reg" --exit         | Mult Tags: OR Gate        
npx cucumber-js --tags="@sanity" --retry 1 --exit       | Retry         

#cucumber.js: imp config in case TCs are not running normally
cucumber.js
{
  "default": "--parallel 2"
}


#Run TCs via NPM + package.json 
- update script tag inside package.json
- Run:
        npm run run-sanity-tcs-1 
        npm run run-sanity-tcs-2     

package.json:
"scripts": {
      "run-sanity-tcs-1": "npx cucumber-js --tags=@sanity --require './support/CustomWorld.js' --require './support/Hooks.js' --require './step-definitions/*.js' --exit",
      "run-sanity-tcs-2": "npx cucumber-js --tags=@sanity --exit"
  },


============================================================================================================
============================================================================================================
#Report Generation:
Basic HTML Report by Cucumber
============================================================================================================
npx cucumber-js --tags="@sanity or @reg" --exit --format html:cucumber_report.html
               copy path "cucumber_report.html" and open in any browser  




============================================================================================================
============================================================================================================
#Run Time Param
============================================================================================================
#Pass Base URL 
Using Git Bash Terminal 
BASE_URL=https://www.google.com/ npx cucumber-js --tags="@sanity" --exit
BASE_URL=https://qa.practice.expandtesting.com/ npx cucumber-js --tags="@sanity" --exit


#Pass Browser
Using Git Bash Terminal 
BROWSER=chromium npx cucumber-js --tags="@sanity" --exit
BROWSER=chromium BASE_URL=https://www.google.com/ npx cucumber-js --tags="@sanity" --exit
BROWSER=chromium BASE_URL=https://practice.expandtesting.com/ npx cucumber-js --tags="@sanity" --exit

#Pass Headless Mode 
Using Git Bash Terminal 

============================================================================================================
============================================================================================================
#TODO:
============================================================================================================
1. Tags    - DONE
2. Screenshots After - DONE
3. Report HTML  - DONE
4. Retry - DONE                  https://github.com/cucumber/cucumber-js/blob/main/docs/retry.md
5. pass baseURL - DONE
6. pass browser, headless


============================================================================================================
============================================================================================================
#Adv DisAdv of BDD with Playwright 
============================================================================================================
#Adv:
1. Easy to read feature files 
2. scenario will run in parallel

#DisAdv:
1. No default reporting
2. Manual screenshots of failed cases 
3. Playwright with JS is having a very detailed report, debugger etc 





============================================================================================================
============================================================================================================
#Imp Info:
============================================================================================================
1. feature folder shd be inside project folder not inside tests/ folder
2. stepfile should end with .spec.js incase working with Playwright else it can also be end with .js 
3. run the feature file to auto generate step definitions
4. cucumber.js: config file for cucumber | path:  VSCode project > node_module > bin > cucumber-js 
   We can create one more cucumber.js for additional settings and place it in project root folder


#step def
let browser, page;
 - if you plan to run tests in parallel, you should avoid global variables and instead store them in the World object (this)
    

============================================================================================================
============================================================================================================
#Debug:
============================================================================================================
1. Playwright not able to detect feature file
npx cucumber-js
0 scenarios
0 steps
0m00.000s (executing steps: 0m00.000s)

Solution:
npm uninstall @cucumber/cucumber
npm install --save-dev @cucumber/cucumber

or

features folder shd be inside project folder and not inside tests
        Correct: project/features
        Incorrect: project/tests/feature        



2. ReferenceError: homeBddPageObj is not defined
           at World.<anonymous>
Sol: use 'this.homeBddPageObj' everywhere rather 'homeBddPageObj'
        world object: once we use 'this' then that obj becomes world obj and can be used anywhere

        
 
3. SyntaxError: Invalid left-hand side in assignment
        actual: await this.homeBddPageObj = this.poBddManager.getHomeBDDPage();
        expected: this.homeBddPageObj = await this.poBddManager.getHomeBDDPage();



4. 'await' has no effect on the type of this expression.ts(80007)
    usually occurs when await is used on a non-Promise value. 
Sol: 
Remove await from assertions like expects etc      
To check if await required or not.
        console.log("###Confirm if Await required:",this.poBddManager.getHomeBDDPage() instanceof Promise);



5. Error: homeBddPageObj is undefined! Check initialization.
   Given('the user opens the website', { timeout: 20000 }, async () => {});

Sol: Change "()=>" to "function()" in Given 
   Given('the user opens the website', { timeout: 20000 }, async function () {});

Explanation:
Why Does function () {} Work But () => {} Fails?
1. Arrow Functions (()=>{}) Do Not Bind this
Arrow functions inherit this from their surrounding scope (lexical scope).
In Cucumber, this refers to the World object, but when using arrow functions, this does not refer to the World object.
So, this.homeBddPageObj becomes undefined because this is not bound correctly.

2. Regular Functions (function () {}) Bind this to Cucumber's World
Regular function expressions (function() {}) bind this to the correct execution context, which in this case is Cucumber’s World object.
Now, this.homeBddPageObj correctly refers to the initialized object inside World, making it accessible across step definitions.

3. Simple Rule to Remember
Use function () {} when accessing this in Cucumber step definitions. 
Avoid ()=>{} if you need this to refer to Cucumber's World object.        


6. Not able to detect step file, CustomWorld, hooks  
   update cucumber.js and add path of each file     
   npx cucumber-js --require step-definitions --dry-run