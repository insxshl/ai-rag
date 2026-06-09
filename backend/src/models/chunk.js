const mongoose = require("mongoose");

const chunkSchema = new mongoose.Schema(
  {
    pdfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pdf",
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    embedding: {
      type: [Number],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chunk", chunkSchema);