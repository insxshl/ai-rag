import { useState } from "react";
import API from "../api";
import {
FaFilePdf,
FaCloudUploadAlt,
FaRobot,
} from "react-icons/fa";

export default function UploadPdf({ setPdfId }) {
const [file, setFile] = useState(null);
const [loading, setLoading] = useState(false);

const upload = async () => {
try {
if (!file) {
alert("Select PDF first");
return;
}

  setLoading(true);

  const formData = new FormData();
  formData.append("pdf", file);

  const res = await API.post(
    "/pdf/upload",
    formData
  );

  if (res.data?.pdfId) {
    setPdfId(res.data.pdfId);
  }

  alert("PDF Uploaded Successfully");
} catch (err) {
  console.log(
    err?.response?.data ||
      err.message
  );

  alert("Upload Failed");
} finally {
  setLoading(false);
}

};

return (
<div
style={{
maxWidth: "750px",
margin: "30px auto",
padding: "35px",
borderRadius: "24px",
background:
"linear-gradient(145deg,#0a0a0a,#141414)",
border:
"1px solid rgba(212,175,55,0.4)",
boxShadow:
"0 0 35px rgba(212,175,55,0.18)",
color: "#ffffff",
textAlign: "center",
}}
>



  <h1
    style={{
      color: "#d4af37",
      marginTop: "15px",
      marginBottom: "8px",
    }}
  >
    AI PDF Assistant
  </h1>

  <p
    style={{
      color: "#fdfdfd",
      marginBottom: "25px",
    }}
  >
    Upload your PDF and start
    chatting with AI
  </p>

  <div
    style={{
      padding: "25px",
      border:
        "2px dashed rgba(212,175,55,0.4)",
      borderRadius: "16px",
      background: "#111",
    }}
  >
    <FaFilePdf
      size={40}
      color="#d4af37"
    />

    <div
      style={{
        marginTop: "15px",
      }}
    >
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) =>
          setFile(
            e.target.files?.[0]
          )
        }
        style={{
          color: "#8a2929",
        }}
      />
    </div>

    {file && (
      <div
        style={{
          marginTop: "15px",
          color: "#d4af37",
          fontWeight: "600",
        }}
      >
        <FaFilePdf
          style={{
            marginRight: "8px",
          }}
        />
        {file.name}
      </div>
    )}
  </div>

  <button
    onClick={upload}
    disabled={loading}
    style={{
      marginTop: "25px",
      padding: "14px 30px",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "15px",
      background:
        "linear-gradient(135deg,#d4af37,#f5d76e)",
      color: "#000",
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
    }}
  >
    <FaCloudUploadAlt />

    {loading
      ? "Uploading..."
      : "Upload PDF"}
  </button>
</div>

);
}