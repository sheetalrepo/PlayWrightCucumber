Feature: Register New User Feature  

  @reg
  Scenario: Successful Register New User
    Given the user opens the website
    When the user navigates to the register page  
    And the user enters new user credentials "TestBDDUser108108112" and "Password@123"  
    Then the new user should have been created successfully  
