$(function () {


  $("#add-burger").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var burger = document.getElementById("new-burger");

    // Check that a value was input by the user -
    // Currently takes gibberish
    if ( burger && burger.value && burger.value.trim() != '') {

 
      var newBurger = {
        burger_name: burger.value.trim(),
        devoured: 0
      };

      $.ajax("/api/burger", {
        type: "POST",
        data: newBurger
      }).then(
        function () {
          //console.log("Added A Burger to Devour", burger);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    }
    else {
      alert("Enter a Real Burger");
    }

  });

  //This should work for eating/devouring a burger
  //as well as reordering a burger so that it will
  //show up in the column to eat it again
  $(".change-eaten").on("click", function (event) {

    var id = $(this).data("id");
    var devoured = $(this).data("neweaten");
    //console.log(`id ${id}`);
    //console.log(`devoured ${devoured}`);

    var newIsEaten = {
      devoured: !devoured
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newIsEaten
    }).then(
      function () {
        //console.log("changed devoured to", newIsEaten);
        //Reload the page to get the updated list
        location.reload();
      }
    );
  });

  //This should work for eating/devouring a burger
  //as well as reordering a burger so that it will
  //show up in the column to eat it again
  $(".cancel").on("click", function (event) {

    var id = $(this).data("id");

    console.log(`delete id ${id}`);


    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function () {
        //console.log("removed burger");
        //Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(document).on("click", ".customer", editCustomerName);
  $(document).on("keyup", ".edit-customer", finishEdit);
  $(document).on("blur", ".edit-customer", cancelEdit);

  function editCustomerName() {
    var customerText = $(this).text();
    var burger = $(this).data("burgerid");
    $(`#${burger}`).show().focus();
    $(this).hide();
  }

    // This function is called whenever a todo item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var burgerid = $(this).attr("id");
    var burgerCustEdit = document.getElementById(burgerid);
    $(burgerCustEdit).hide();
    $(burgerCustEdit).siblings("span.customer").show();
  }
  // This function starts updating a customer name in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    var customerId = $(this).data("customerid");
    var customerName = $(this).val();
    var burgerId = $(this).attr("id");
    if (event.which === 13) {
      $(this).blur();
      updateCustomerName(customerName, customerId, burgerId);
    }
  }

  // This function updates a customer name in our database
  function updateCustomerName(customername, customerid, burgerid) {
    var newName = {
      customername: customername,
      customerid: customerid
    };

    //console.log(newName.customername);
    //console.log(newName.customerid);

    $.ajax("/api/customer/", {
      type: "PUT",
      data: newName
    }).then(
      function () {
        console.log("changed customer name", newName);
        var burgerCustEdit = document.getElementById(burgerid);
        $(burgerCustEdit).hide();
        $(burgerCustEdit).siblings("span.customer").text(newName.customername);
        $(burgerCustEdit).siblings("span.customer").show();
      }
    );
  }

});
