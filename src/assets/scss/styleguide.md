# Career Development Tool

Welcome to Career Development Tool CSS Styleguide staring point for developers.

## Organization

The styleguide should be organized by numbered sections. These sections can go as deep as you like. Every component should have a numbered section to refer to. For example:

    1. Design
      1.01 Grid System
      1.02 Logo
      1.03 Colors
      1.04 Typography
      1.05 Icons
      1.06 Buttons
      1.07 Button Links
      1.08 Special Buttons
      1.09 Forms
    2. Components
      2.01 Breadcrumbs
      2.02 Score Slider
      2.03 Steps
      2.04 Paginator
      2.05 Progress Bar
      2.06 Alerts
      2.07 Modal Alerts
      2.08 Charts
      2.09 Tabs
      2.10 Lists
      2.11 Tables
      2.12 Search
      2.13 Dropdown
      2.14 Accordions
    3. Modules
      3.01 Footer
      3.02 Nav
      3.03 Login
      3.04 Hero

We are using [*bootstrap-sass*](https://github.com/twbs/bootstrap-sass) as starting point to speed up the process of building the styleguide as we can see bootstrap already has some components we need. 

## Theme

We are only including the components we need and not the all bootstrap framework. After including a component we create a file with the same name as the one that we just included and override the styles as needed.

After making a new file for overriding a new component please check Bootstrap [*_variables*](https://github.com/twbs/bootstrap-sass/blob/master/assets/stylesheets/bootstrap/_variables.scss). You can change the styles for almost all the components by overriding a variable to the theme **_variables.scss** file.

## Dependecies 

We are using [*bower*](https://github.com/bower/bower) to manage all the frontend dependecies. You can find a list of dependencies in the *bower.json* file.
Whenever you need an external component please use bower to include it as follow.
    
    $ bower install jquery --save

### Kss-node

We are using a [*kss-node-template*](https://github.com/htanjo/kss-node-template) to generate the styleguide. 
If you are new to Kss please read it's [*documentation*](http://warpspire.com/kss/syntax/).


#### How to add documentation ?

KSS’s documentation syntax is human readable, but just structured enough to be machine parsable. And it takes less than 5 minutes to [*learn the syntax*](http://warpspire.com/kss/syntax/).



#### How to generate the styleguide ?

*We are using a custom template to make the generated styleguide look better. You can find the template in **_template-kss** folder.*

*Please keep in mind that you will have to change all your '**container**'s div's por '**container-fluid**' to look better on the styleguide, since it does not have all the space as you normally have it.*

Compiling the styleguide (This is automatically done with **gulp**)
    
    $ ./node_modules/.bin/kss-node --source src/assets/scss --destination dist/styleguide --template _template-kss
