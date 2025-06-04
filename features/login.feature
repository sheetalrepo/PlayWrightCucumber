Feature: User Login Feature

  @reg @abc
  Scenario: Successful login to the website 1 
    Given the user opens the website  
    When the user navigates to the login page  
    And the user enters credentials "practice" and "SuperSecretPassword!"  
    Then the user should be logged in successfully  


  @sanity
  Scenario: Successful login to the website 2 
    Given the user opens the website  
    When the user navigates to the login page  
    And the user enters credentials "TestBDDUser108108108" and "Password@123"  
    Then the user should be logged in successfully

 
  @outline
  Scenario Outline: Successful login to the website using Scenario outline
    Given the user opens the website
    When the user navigates to the login page
    And the user enters credentials "<username>" and "<password>"
    Then the user should be logged in successfully

  Examples:
    | username                | password              |
    | practice                | SuperSecretPassword!  |
    | TestBDDUser108108108    | Password@123          |
    | TestBDDUser108108107    | Password@123          |
    | TestBDDUser108108106    | Password@123          |
   