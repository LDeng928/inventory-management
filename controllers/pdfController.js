let ejs = require("ejs");
let { json } = require("express");
let pdf = require("html-pdf");
let { parse } = require("path");
let path = require("path");
//const { options } = require("../app");
let bodyParser = require("body-parser");
let Order = require("../models/order");
let Product = require("../models/product");
let Store = require("../models/store");
const { page } = require("pdfkit");

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
          pdf
            .create(data, options)
            .toFile("Order-list.pdf", function (err, data) {
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

//inventory report get
exports.inventory_report_get = function (req, res) {
  //res.render("inventory_report_form");
  //res.send("Hello");
  // var pageData = {
  //   storeName: "",
  // };
  // res.render("inventory_report_form", pageData);

  Store.find({}).exec(function (err, stores) {
    if (err) {
      console.log(err);
    } else {
      res.render("inventory_report_form", { stores: stores });
    }
  });
};

//inventory report post
exports.inventory_report_post = function (req, res) {
  var storeName = req.body.storeName;
  var pageData = {
    storeName: storeName,
  };
  console.log(pageData);
  // var query = { storeName: req.body.storeName };
  // console.log(query);

  Product.find({ storeName: storeName }).exec(function (err, products) {
    ejs.renderFile(
      path.join(__dirname, "../views/", "Inventory-report-template.ejs"),
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
            .toFile(`${storeName}-inventory-report.pdf`, function (err, data) {
              if (err) {
                res.send(err);
              } else {
                res.render("success", {
                  action: `${storeName} store inventory report was created`,
                });
              }
            });
        }
      }
    );
  });
};

// Waterloo store inventory report controller
// exports.generate_waterloo_inventory_report = function (req, res) {
//   var storeName = req.body.storeName;
//   //console.log(store);
//   Product.find({ storeName: `"${storeName}"` }).exec(function (err, products) {
//     ejs.renderFile(
//       path.join(
//         __dirname,
//         "../views/",
//         "Waterloo-inventory-report-template.ejs"
//       ),
//       { products: products },
//       (err, data) => {
//         if (err) {
//           res.send(err);
//         } else {
//           let options = {
//             height: "11.25in",
//             width: "8.5in",
//             header: {
//               height: "20mm",
//             },
//             footer: {
//               height: "20mm",
//             },
//           };
//           pdf
//             .create(data, options)
//             .toFile("Waterloo-inventory-report.pdf", function (err, data) {
//               if (err) {
//                 res.send(err);
//               } else {
//                 res.render("success", {
//                   action: "Waterloo store inventory report was created`",
//                 });
//               }
//             });
//         }
//       }
//     );
//   });
// };
