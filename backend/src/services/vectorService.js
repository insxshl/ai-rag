const Chunk = require("../models/Chunk");

const saveChunk = async (
  pdfId,
  text,
  embedding
) => {
  return Chunk.create({
    pdfId,
    text,
    embedding,
  });
};

const getAllChunks = async () => {
  return Chunk.find();
};

module.exports = {
  saveChunk,
  getAllChunks,
};