Feature: User Login Feature

  Scenario: Successful login to the website  
    Given the user opens the website  
    When the user navigates to the login page  
    And the user enters credentials "practice" and "SuperSecretPassword!"  
    Then the user should be logged in successfully  
