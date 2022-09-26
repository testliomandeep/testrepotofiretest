# Loupe-Test-Automation

## Scripting Guide
### Page Factory classes
* Page Factory classes have generic methods to deal with web elements, mobile elements, browser and mobile devices
* `Page` class contains methods common to both web and mobile automation
* `Webpage` class extends `Page` class and contains generic methods for web browser automation
* `Mobilescreen` class extends `Page` class and contains generic methods for mobile device automation
* For adding new methods in Page classes, `TSDoc` is must
### Page Classes
* For each page on webapp, there should be page in `src/com/testlio/pages/lgnd` directory
* Each page should extend `Webpage` class
* Page class contains all elements and methods operating on those elements
* For operation on any element, methods from page factory classes needs to leveraged, one should not try to use raw `wdio` native methods here
* If any method is meant to navigate to different page on the app, then the new page class is initiated using
````
TBD
````
* The variable, which is going to store in other page class, or in other test
````
TBD
````
* Then, one move forward with any operation on that Page class
* The allure step can be defined for any method using `@step` annotation
* The screenshot can be attached to allure reports using the following method
````
TBD
````
* Allure steps and screenshot are must for each Page class methods
### Tests
TBD