// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************


// Requiring our Burger model
var db = require("../models");


// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the burgers
  app.get("/", function (req, res) {
    //console.log("get(/...");

    db.Burger.findAll({
      include: [db.Customer],
      order: [['burger_name', 'ASC']]
    }).then(function (results) {
      res.render("index", { burgers: results });
    });
  });


  app.post("/api/burger", function (req, res) {
    //console.log("post(/api/burger...");

    db.Customer.create({
      customer_name: "A. Diner"
    }).then(function (data) {
      var customerid = data.dataValues.id;

      db.Burger.create({
        burger_name: req.body.burger_name,
        CustomerId: customerid
      }).then(function (data) {
        res.redirect("/");
      });
    });

  });



  app.put("/api/burgers/:id", function (req, res) {
    //console.log("put(/api/burgers/:id...");
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

  app.put("/api/customer/", function (req, res) {
    //console.log("put(/api/customer/..");
    //var burgerId = req.params.id;
    //console.log(`burgerId ${burgerId}`);
    var customerId = req.body.customerid;
    
    //console.log(`customerId ${customerId}`);
    //console.log(req.body);
    db.Customer.update({ 
      customer_name: req.body.customername 
    }, 
    { where: { id: req.body.customerid } }
    ).then(function (result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.json(result);
      }
    });

  });






  app.delete("/api/burgers/:id", function (req, res) {
    var burgerId = req.params.id;
    //console.log(`burgerId ${burgerId}`);
    db.Burger.destroy({
      where: {
        id: burgerId
      }
    }).then(function (data) {
      res.end();
    });
  });

};

