const chunkText = (text, size = 800) => {
  const cleaned = text
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/Page \d+/gi, "")
    .trim();

  const sentences = cleaned.split(". ");

  const chunks = [];
  let current = "";

  for (let s of sentences) {
    const sentence = s.trim();

    if (!sentence) continue;

    if ((current + sentence).length > size) {
      if (current.length > 60) chunks.push(current.trim());
      current = sentence + ". ";
    } else {
      current += sentence + ". ";
    }
  }

  if (current.length > 60) chunks.push(current.trim());

  return chunks.filter((c) => c.length > 80);
};

module.exports = chunkText;