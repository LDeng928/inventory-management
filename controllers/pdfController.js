let ejs = require("ejs");
const { json } = require("express");
let pdf = require("html-pdf");
const { parse } = require("path");
let path = require("path");
//const { options } = require("../app");
let Order = require("../models/order");
let Product = require("../models/product");

// Store order for more inventory Order List report
exports.generate_report = function (req, res) {
  Order.find({}).exec(function (err, orders) {
    ejs.renderFile(
      path.join(__dirname, "../views/", "report-template.ejs"),
      { orders: orders },
      (err, data) => {
        if (err) {
          res.send(err);
        } else {
          let options = {
            height: "11.25in",
            width: "8.5in",
            header: {
              height: "20mm",
            },
            footer: {
              height: "20mm",
            },
          };
          pdf.create(data, options).toFile("report.pdf", function (err, data) {
            if (err) {
              res.send(err);
            } else {
              res.render("success", {
                action: "An order list report was created ",
              });
            }
          });
        }
      }
    );
  });
};

// Waterloo store inventory report controller
exports.generate_waterloo_inventory_report = function (req, res) {
  Product.find({ storeName: "Waterloo" }).exec(function (err, products) {
    ejs.renderFile(
      path.join(
        __dirname,
        "../views/",
        "Waterloo-inventory-report-template.ejs"
      ),
      { products: products },
      (err, data) => {
        if (err) {
          res.send(err);
        } else {
          let options = {
            height: "11.25in",
            width: "8.5in",
            header: {
              height: "20mm",
            },
            footer: {
              height: "20mm",
            },
          };
          pdf
            .create(data, options)
            .toFile("Waterloo-inventory-report.pdf", function (err, data) {
              if (err) {
                res.send(err);
              } else {
                res.render("success", {
                  action: "Waterloo store inventory report was created`",
                });
              }
            });
        }
      }
    );
  });
};
