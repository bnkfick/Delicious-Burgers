// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************


// Requiring our Burger model
var db = require("../models");


// Routes
// =============================================================
module.exports = function (app) {

  app.get("/", function (req, res) {
    console.log("get(/...");
    // Add sequelize code to find all posts, and return them to the user with res.json
    // findAll returns all entries for a table when used with no options
    db.Burger.findAll({}).then(function (results) {
      // We have access to the posts as an argument inside of the callback function
      //console.log(results);
      var burgersObj = {
        burgers: results
      };
      res.render("index", burgersObj);
    });
  });


  app.post("/api/burger", function (req, res) {
    console.log("post(/api/burger...");

    db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function (result) {
      res.redirect("/");
    })

  });


  app.put("/api/burgers/:id", function (req, res) {
    console.log("put(/api/burgers/:id...");
    var burgerId = req.params.id;
    //console.log(`burgerId ${burgerId}`);

    db.Burger.update({
      devoured: req.body.devoured
    }, {
        where: {
          id: burgerId
        }
      })
      .then(function (result) {
        if (result.changedRows == 0) {
          return res.status(404).end();
        } else {
          res.json(result);
        }

      });
  });

  app.delete("/api/burgers/:id", function (req, res) {
    var burgerId = req.params.id;
    console.log(`burgerId ${burgerId}`);
    db.Burger.destroy({
      where: {
        id: burgerId
      }
    }).then(function (data) {
      res.end();
    });
  });

};

