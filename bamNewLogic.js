var inquirer = require('inquirer');
var connection = require('./config/connection.js');
var product_choice;
var product_name;
var product_price;
var purchase_amt;
var stock_remaining;

forSale();


function forSale() {
    var query = "SELECT id, spiceName, price FROM products;";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].spiceName + " | " + res[i].price);
        }
        productSearch();
    });
}




function productSearch() {
    inquirer
        .prompt({
            name: "id",
            type: "input",
            message: "pick id of product you want to buy"
        })
        .then(function(answer) {
            var query = "SELECT id, spiceName, price, stock FROM products WHERE ?";
            connection.query(query, { id: answer.id }, function(err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].id + " " + res[i].spiceName + " $" + res[i].price);
                    console.log(res[i].stock + " left in stock");
                    var remove_from_stock = res[i].stock;
                    product_price = res[i].price;
                    product_name = res[i].spiceName;
                    // console.log("product_price: " + product_price);
                }
                var answer1 = answer;
                product_choice = answer;
                // console.log("product_choice: " + product_choice.id);
                checkInventory(remove_from_stock);
                // console.log("quantity: " + res[i].stock_quantity);
            });
        });

}

function checkInventory(remove_from_stock) {
    inquirer
        .prompt({
            name: "howmany",
            type: "input",
            message: "How many would you like to buy"
        })
        .then(function(answer) {
            var buy_howmany = answer.howmany;
            purchase_amt = buy_howmany;
            console.log("buy_howmany: ", buy_howmany);
            console.log("remove_from_stock: ", remove_from_stock);
            console.log("product_choice: " + product_choice.id);
            console.log("You will be purchasing: " + buy_howmany + " " + product_name + " for $" + product_price + " each.");
            var stock_left = remove_from_stock - buy_howmany;
            console.log("stock_left: " + stock_left);
            stock_remaining = stock_left;
            if (stock_left < 0) {
                console.log("Insufficient quantity!")
                connection.end();
            } else {
                checkOut();
            }
            v

        });
}




function checkOut() {
    console.log("Checking Out");
    console.log("product_choice: " + product_choice.id);
    console.log("product_price: " + product_price);
    var total_price = purchase_amt * product_price;
    console.log("You're total price is $" + total_price);
    var query = "UPDATE products SET stock_quantity = " + stock_remaining + " WHERE id = " + product_choice.id + ";";
    connection.query(query, function(err, res) {
        // console.log("Updated Database")
    });
    shopSomeMore();
}



function shopSomeMore() {

    inquirer
        .prompt({
            name: "shopMore",
            type: "input",
            message: "would you like to shop some more? y/n"
        })
        .then(function(answer) {

            var shoppingSpree = answer.shopMore;
            if (shoppingSpree === "y") {

                forSale();

            } else {
                console.log("goodbye");
            }


        });

}

// function deleteInventory {

//     console.log("updating data in database");





// }terrm;