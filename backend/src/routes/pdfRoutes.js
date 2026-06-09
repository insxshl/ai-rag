const express = require("express");

const {
  uploadPdf,
  getMyPdfs,
} = require("../controllers/pdfController");

const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("pdf"),
  uploadPdf
);

router.get(
  "/my-pdfs",
  protect,
  getMyPdfs
);

module.exports = router;