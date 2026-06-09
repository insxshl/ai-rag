const cosine = require("compute-cosine-similarity");
const Chunk = require("../models/Chunk");

const retrieveRelevantChunks = async (pdfId, queryEmbedding) => {
  const chunks = await Chunk.find({ pdfId });

  if (!chunks || chunks.length === 0) {
    return [];
  }

  const scored = chunks.map((chunk) => {
    const score = cosine(
      Array.from(queryEmbedding),
      Array.from(chunk.embedding)
    );

    return {
      text: chunk.text,
      score: score || 0,
    };
  });

  // sort best matches first
  scored.sort((a, b) => b.score - a.score);

  console.log("\n🔥 TOP MATCH SCORES:");
  scored.slice(0, 5).forEach((c, i) => {
    console.log(`${i + 1}. score: ${c.score.toFixed(4)}`);
    console.log(`   text: ${c.text.slice(0, 80)}\n`);
  });

  // 🔥 ALWAYS RETURN TOP K (NO FILTERING = STABLE RAG)
  const topChunks = scored.slice(0, 5);

  return topChunks;
};

module.exports = {
  retrieveRelevantChunks,
};