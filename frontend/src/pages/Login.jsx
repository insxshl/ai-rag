import { useState } from "react";
import API from "../api";
import {
FaEnvelope,
FaLock,
FaSignInAlt,
} from "react-icons/fa";

export default function Login({
setLoggedIn,
setShowRegister,
}) {
const [email, setEmail] = useState("");
const [password, setPassword] =
useState("");

const login = async () => {
try {
const res = await API.post(
"/auth/login",
{
email,
password,
}
);

  localStorage.setItem(
    "token",
    res.data.token
  );

  setLoggedIn(true);

  alert("Login Success");
} catch (err) {
  console.log(
    err?.response?.data ||
      err.message
  );

  alert("Login Failed");
}

};

return (
<div
style={{
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
background:
"linear-gradient(to bottom,#050505,#0f0f0f)",
padding: "20px",
}}
>
<div
style={{
width: "420px",
padding: "35px",
borderRadius: "24px",
background:
"linear-gradient(145deg,#0a0a0a,#161616)",
border:
"1px solid rgba(212,175,55,0.4)",
boxShadow:
"0 0 35px rgba(212,175,55,0.18)",
}}
>
<div
style={{
textAlign: "center",
marginBottom: "25px",
}}
>



      <h1
        style={{
          color: "#d4af37",
          marginTop: "12px",
          marginBottom: "5px",
        }}
      >
        Welcome Back
      </h1>

      <p
        style={{
          color: "#999",
          fontSize: "14px",
        }}
      >
        Login to AI PDF Assistant
      </p>
    </div>

    <div
      style={{
        position: "relative",
        marginBottom: "16px",
      }}
    >
      <FaEnvelope
        color="#d4af37"
        style={{
          position: "absolute",
          top: "15px",
          left: "14px",
        }}
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{
          width: "100%",
          padding:
            "14px 14px 14px 42px",
          borderRadius: "12px",
          border:
            "1px solid #333",
          background: "#111",
          color: "#fff",
          outline: "none",
          boxSizing:
            "border-box",
        }}
      />
    </div>

    <div
      style={{
        position: "relative",
        marginBottom: "20px",
      }}
    >
      <FaLock
        color="#d4af37"
        style={{
          position: "absolute",
          top: "15px",
          left: "14px",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding:
            "14px 14px 14px 42px",
          borderRadius: "12px",
          border:
            "1px solid #333",
          background: "#111",
          color: "#fff",
          outline: "none",
          boxSizing:
            "border-box",
        }}
      />
    </div>

    <button
      onClick={login}
      style={{
        width: "100%",
        padding: "14px",
        borderRadius: "12px",
        border: "none",
        fontWeight: "600",
        fontSize: "16px",
        cursor: "pointer",
        background:
          "linear-gradient(135deg,#d4af37,#f5d76e)",
        color: "#000",
      }}
    >
      Login
    </button>

    <p
      style={{
        textAlign: "center",
        marginTop: "20px",
        color: "#888",
      }}
    >
      Don't have an account?

      <span
        onClick={() =>
          setShowRegister(true)
        }
        style={{
          color: "#d4af37",
          cursor: "pointer",
          marginLeft: "6px",
          fontWeight: "600",
        }}
      >
        Register
      </span>
    </p>
  </div>
</div>

);
}