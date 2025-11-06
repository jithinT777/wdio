Feature: The Internet Guinea Pig Website

  Scenario Outline: As a user, I can log into the secure area

    Given I am on the login page
    When I search for product <product>
    And get the price of the product
    And compare price to price History app

    Examples:
      | product |
      | iPhone  |
