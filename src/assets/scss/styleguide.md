# Career Development Tool

Welcome to Career Development Tool CSS Styleguide staring point for developers.

## Organization

The styleguide should be organized by numbered sections. These sections can go as deep as you like. Every component should have a numbered section to refer to. For example:

    1. Design
      1.1 Logo
      1.2 Colors
      1.3 Icons
      1.4 Navigation
      1.5 Typography
    2. Components
      2.1 Accordions
      2.2 Alerts
      2.3 Breadcrumbs
      2.4 Buttons
      2.5 Charts
      2.6 Evaluation Ranking
      2.7 Grid System
      2.8 Lists
      2.9 Paginator
      2.10 Search
      2.11 Tables
    3. Modules
      3.1 Footer
      3.2 Header
      3.3 Hero
      3.4 Log In

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

Compiling the styleguide (This is automatically done with **gulp**)
    
    $ ./node_modules/.bin/kss-node --source src/assets/scss --destination dist/styleguide --template _template-kss
