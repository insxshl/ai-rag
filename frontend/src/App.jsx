import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadPdf from "./components/UploadPdf";
import ChatBox from "./components/ChatBox";

export default function App() {
  const [pdfId, setPdfId] = useState(null);

  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [showRegister, setShowRegister] =
    useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setPdfId(null);
  };

  if (!loggedIn) {
    return showRegister ? (
      <Register
        setShowRegister={setShowRegister}
      />
    ) : (
      <Login
        setLoggedIn={setLoggedIn}
        setShowRegister={setShowRegister}
      />
    );
  }

  return (
  <div
    style={{
      minHeight: "100vh",
      background:
        "linear-gradient(to bottom,#050505,#111111)",
      padding: "20px",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "20px",
      }}
    >
      <button
        onClick={logout}
        style={{
          padding: "10px 18px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          background:
            "linear-gradient(135deg,#d4af37,#f5d76e)",
          color: "#000",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>
    </div>

    <UploadPdf setPdfId={setPdfId} />

    {pdfId && (
      <ChatBox pdfId={pdfId} />
    )}
  </div>
)}