import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import API from "../api";

export default function ChatBox({ pdfId }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Ref to automatically scroll to the bottom of the chat
  const chatContainerRef = useRef(null);

  // Auto-scroll logic whenever messages change or loading state toggles
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const ask = async () => {
    if (!pdfId) {
      alert("Upload PDF first");
      return;
    }

    if (!question.trim()) {
      return;
    }

    const currentQuestion = question;

    // 1. Instantly append the user's message to the UI
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: currentQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      // 2. FIXED: Map existing messages AND manually append the newest user message 
      // to the history array so the backend gets the complete conversation context.
      const history = [
        ...messages.map((m) => ({
          role: m.role === "ai" ? "assistant" : "user",
          content: m.text,
        })),
        { role: "user", content: currentQuestion }
      ];

      const res = await API.post("/chat/ask", {
        question: currentQuestion,
        pdfId,
        history,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.data.answer || "No response received.",
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong while processing your request.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ask();
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1000px",
        margin: "30px auto",
        padding: "20px",
        background: "#0a0a0a",
        border: "1px solid #d4af37",
        borderRadius: "20px",
        boxShadow: "0 0 25px rgba(212,175,55,0.2)",
      }}
    >
      <h2
        style={{
          color: "#d4af37",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        AI PDF Assistant
      </h2>

      <div
        ref={chatContainerRef} // Attached ref here
        style={{
          height: "500px",
          overflowY: "auto",
          border: "1px solid #333",
          borderRadius: "15px",
          padding: "20px",
          background: "#111111",
          scrollBehavior: "smooth"
        }}
      >
        {messages.length === 0 && (
          <p
            style={{
              color: "#888",
              textAlign: "center",
            }}
          >
            Upload a PDF and start chatting...
          </p>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                maxWidth: "80%",
                padding: "14px",
                borderRadius: "15px",
                background: m.role === "user" ? "#d4af37" : "#1a1a1a",
                color: m.role === "user" ? "#000" : "#fff",
                border: m.role === "ai" ? "1px solid #d4af37" : "none",
              }}
            >
              <strong>{m.role === "user" ? "You" : "AI"}</strong>

              <div
                style={{
                  marginTop: "8px",
                  lineHeight: "1.7",
                }}
              >
                {m.role === "ai" ? (
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                ) : (
                  m.text
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div
            style={{
              color: "#d4af37",
              marginTop: "10px",
            }}
          >
            AI is thinking...
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about the PDF..."
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #d4af37",
            background: "#111",
            color: "#fff",
            outline: "none",
          }}
        />

        <button
          onClick={ask}
          disabled={loading}
          style={{
            padding: "14px 24px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(135deg,#d4af37,#f5d76e)",
            color: "#000",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}