const express = require("express");
const router = express.Router();
//const PDFDocument = require("pdfkit");

var pdf_controller = require("../controllers/pdfController");

router.get("/generateReport", pdf_controller.generate_report);

router.get(
  "/generateWaterlooInventoryReport",
  pdf_controller.generate_waterloo_inventory_report
);

// router.post("/", (req, res) => {
//   const doc = new PDFDocument();
//   let filename = req.body.filename;
//   // stripping special charters
//   filename.encodeURIComponent(filename) + ".pdf";
//   // setting response to 'attachment' (download)
//   res.setHeader(
//     "Content-disposition",
//     'attachment; filename="' + filename + '"'
//   );
//   res.setHeader("Content-type", "application/pdf");

//   const content = req.body.content;
//   doc.y = 300;
//   doc.text(content, 50, 30);
//   doc.pipe(res);
//   doc.end();
// });

// export module
module.exports = router;
