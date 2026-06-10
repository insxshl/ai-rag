const chunk = require("../models/chunk");

const savechunk = async (
  pdfId,
  text,
  embedding
) => {
  return chunk.create({
    pdfId,
    text,
    embedding,
  });
};

const getAllchunks = async () => {
  return chunk.find();
};

module.exports = {
  savechunk,
  getAllchunks,
};