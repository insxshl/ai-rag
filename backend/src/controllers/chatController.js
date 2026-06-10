const { getEmbedding } = require("../services/embeddingService");
const { retrieveRelevantchunks } = require("../services/retrievalService");
const groq = require("../config/groq");

const askQuestion = async (req, res) => {
  try {
    const { question, pdfId, history } = req.body;

    if (!question || !pdfId) {
      return res.status(400).json({
        success: false,
        message: "pdfId and question required",
      });
    }

    const queryEmbedding = await getEmbedding(question);

    const chunks = await retrieveRelevantchunks(pdfId, queryEmbedding);

    if (!chunks.length) {
      return res.json({
        success: true,
        answer: "The answer is not available in the uploaded PDF.",
      });
    }

    const context = chunks
      .map((c, i) => `chunk ${i + 1}: ${c.text}`)
      .join("\n\n");

    const prompt = `
You are an intelligent PDF Assistant.

YOUR JOB:
Help users understand, analyze, summarize, and explore the uploaded PDF.

If the user asks for a specific paragraph number,
do not guess.

Only answer if the paragraph can be clearly identified
from the provided context.

Otherwise reply:

"Sorry, I cannot reliably identify that paragraph from the available PDF context 😊"

LANGUAGE RULES:
- Reply in the same language as the user.
- English → English
- Hindi → Hindi
- Hinglish → Hinglish
- Telugu → Telugu
- Mixed language → same style

BEHAVIOR:
- Friendly and engaging like ChatGPT.
- Use headings, bullets, emojis, and formatting.
- Do NOT dump everything in one paragraph.
- Make answers easy to read.

PDF RULES:
- Use ONLY the provided PDF context.
- Never invent facts.
- If information is missing, say:
  "Sorry, mujhe PDF me ye information nahi mili 😊"

IF USER ASKS:
- Summary → structured summary
- Short summary → 3-5 bullets
- Detailed summary → sections
- Key points → bullets
- Explain → simple explanation
- Author → exact author
- Conclusion → conclusion section
- Findings → findings section
- Next steps → next steps section
- Funny summary → funny style but facts unchanged
- Interview questions → generate from PDF
- MCQs → generate from PDF
- Notes → structured notes
- Presentation → slide-style points

FORMATTING RULES:
- Use markdown.
- Use headings.
- Use bullet points.
- Use numbered lists when useful.
- Keep answers visually attractive.
- Avoid giant paragraphs.

OUTPUT STYLE:

- Never return a giant paragraph.
- Always organize answers visually.
- Use:
  - Headings
  - Bullet points
  - Emojis where appropriate
  - Short sections
- For summaries:
  1. Overview
  2. Key Points
  3. Important Numbers
  4. Conclusion
- End with a "Quick Take" section when relevant.

PARAGRAPH RULES:

If the user asks for:
- first paragraph
- second paragraph
- third paragraph
- nth paragraph
- page number

ONLY answer if paragraph/page metadata is explicitly available in the context.

If paragraph/page metadata is not available, reply:

"Sorry, paragraph or page information is not available in the current PDF structure 😊"

Do not infer.
Do not guess.
Do not approximate.

CONTEXT:
${context}

QUESTION:
${question}

ANSWER:
`;

    const messages = history || [];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly PDF assistant. Be helpful, natural, and context-aware.",
        },

        ...messages,

        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const answer = completion.choices[0].message.content;

    return res.json({
      success: true,
      answer,
    });
  } catch (err) {
    console.log("ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { askQuestion };