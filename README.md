# Burger

## Overview
- A burger logger with MySQL, Node, Express, Handlebars and a homemade ORM (yum!). Following the MVC design pattern and using Node and MySQL to query and route data in the app, and Handlebars to generate HTML.
   
## Live Site
- https://evening-beyond-72378.herokuapp.com/

![Delicious Burger](DeliciousBurgers.png)

## Description
- Eat-Da-Burger is a restaurant logging app that lets users input the names of burgers they'd like to eat.
- Whenever a user submits a burger's name, the app will display the burger on the left side of the page -- waiting to be devoured.
- Each burger in the waiting area also has a 'Devour it!' button. When the user clicks it, the burger will move to the right side of the page.
- The app will store every burger in a database, whether devoured or not.



## Directory Structure
```
.
├── config
│   ├── connection.js
│   └── orm.js
│ 
├── controllers
│   └── burgers_controller.js
│
├── db
│   ├── schema.sql
│   └── seeds.sql
│
├── models
│   └── burger.js
│ 
├── node_modules
│ 
├── package.json
│
├── public
│   └── assets
│       ├── css
│       │   └── burger_style.css
│       └── img
│           └── burger.png
│   
│
├── server.js
│
└── views
    ├── index.handlebars
    └── layouts
        └── main.handlebars
```

## Technologies Used
- Javascript
- Node.js
- Express.js
- Handlebars
- MySQL
- Express NPM Package 


