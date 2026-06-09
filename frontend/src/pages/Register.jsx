import { useState } from "react";
import API from "../api";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
} from "react-icons/fa";

export default function Register({
  setShowRegister,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");

  const register = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Success");

      setShowRegister(false);
    } catch (err) {
      console.log(
        err?.response?.data ||
          err?.message
      );

      alert("Registration Failed");
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
          <FaUserPlus
            size={42}
            color="#d4af37"
          />

          <h1
            style={{
              color: "#d4af37",
              marginTop: "12px",
              marginBottom: "5px",
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              color: "#999",
              fontSize: "14px",
            }}
          >
            Join AI PDF Assistant
          </p>
        </div>

        {/* Name */}

        <div
          style={{
            position: "relative",
            marginBottom: "16px",
          }}
        >
          <FaUser
            color="#d4af37"
            style={{
              position: "absolute",
              top: "15px",
              left: "14px",
            }}
          />

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
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

        {/* Email */}

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

        {/* Password */}

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
          onClick={register}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            background:
              "linear-gradient(135deg,#d4af37,#f5d76e)",
            color: "#000",
          }}
        >
          Create Account
        </button>

        <p
          style={{
            textAlign: "center",
            color: "#888",
            marginTop: "20px",
          }}
        >
          Already have an account?

          <span
            onClick={() =>
              setShowRegister(false)
            }
            style={{
              color: "#d4af37",
              cursor: "pointer",
              marginLeft: "6px",
              fontWeight: "600",
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}