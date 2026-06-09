const Pdf = require("../models/Pdf");
const chunkText = require("../rag/chunker");
const { getEmbedding } = require("../services/embeddingService");
const { saveChunk } = require("../services/vectorService");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded",
      });
    }

    const fileBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(fileBuffer);

    const text = pdfData.text;

    if (!text || text.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: "PDF text is too short or empty",
      });
    }

    const chunks = chunkText(text);

    const pdf = await Pdf.create({
      user: req.user._id,
      fileName: req.file.originalname,
      filePath: req.file.path,
      text,
    });

    let savedChunks = 0;

    for (const chunk of chunks) {
      // 🔥 FIX: skip useless chunks
      if (!chunk || chunk.trim().length < 20) continue;

      try {
        const embedding = await getEmbedding(chunk);

        await saveChunk(pdf._id, chunk, embedding);

        savedChunks++;
      } catch (err) {
        console.log("Chunk embedding failed:", err.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: "PDF processed and vectors stored successfully 🚀",
      pdfId: pdf._id,
      totalChunks: chunks.length,
      savedChunks,
    });
  } catch (error) {
    console.log("Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMyPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find({
      user: req.user._id,
    }).select("_id fileName createdAt");

    return res.json({
      success: true,
      pdfs,
    });
  } catch (error) {
    console.log("Get PDFs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  uploadPdf,
  getMyPdfs,
};