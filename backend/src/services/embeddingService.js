const { pipeline } = require("@xenova/transformers");

let embedder;

const loadModel = async () => {
  if (!embedder) {
    console.log("Loading embedding model...");
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/bge-small-en-v1.5"
    );
    console.log("Embedding model ready.");
  }
  return embedder;
};

const getEmbedding = async (text) => {
  const model = await loadModel();

  const output = await model(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
};

module.exports = { getEmbedding };