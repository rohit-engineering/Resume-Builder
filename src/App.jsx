import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const checkAccess = () => {
    const isMobile =
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
        navigator.userAgent
      );

    return !isMobile && window.innerWidth >= 1280;
  };

  const [isAllowed, setIsAllowed] = useState(checkAccess());

  useEffect(() => {
    const handleResize = () => {
      setIsAllowed(checkAccess());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isAllowed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #111827 100%)",
          padding: "2rem",
          overflow: "hidden",
          position: "relative",
          fontFamily:
            "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Background Blur Circles */}
        <div
          style={{
            position: "absolute",
            width: 350,
            height: 350,
            background: "#3b82f6",
            borderRadius: "50%",
            filter: "blur(120px)",
            top: -120,
            left: -120,
            opacity: 0.35,
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            background: "#8b5cf6",
            borderRadius: "50%",
            filter: "blur(120px)",
            bottom: -100,
            right: -100,
            opacity: 0.3,
          }}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 700,
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 24,
            padding: "3.5rem",
            textAlign: "center",
            color: "#fff",
            boxShadow: "0 20px 60px rgba(0,0,0,.45)",
          }}
        >
          <div
            style={{
              fontSize: 72,
              marginBottom: 20,
            }}
          >
            💻
          </div>

          <h1
            style={{
              fontSize: "2.5rem",
              margin: 0,
              fontWeight: 700,
            }}
          >
            Laptop Screen Required
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              marginTop: 20,
              lineHeight: 1.8,
              fontSize: "1.08rem",
            }}
          >
            This platform is optimized exclusively for large laptop and desktop
            displays to provide the best experience.
          </p>

          <div
            style={{
              marginTop: 35,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 24px",
              borderRadius: 999,
              background: "rgba(59,130,246,.15)",
              border: "1px solid rgba(59,130,246,.35)",
              color: "#93c5fd",
              fontWeight: 600,
            }}
          >
            Minimum Screen Width: <strong>1280px</strong>
          </div>

          <div
            style={{
              marginTop: 40,
              padding: 20,
              borderRadius: 16,
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Please switch to a laptop or desktop.
            </div>

            <div
              style={{
                color: "#94a3b8",
                lineHeight: 1.7,
              }}
            >
              Mobile devices and tablets are currently not supported. Open this
              website on a laptop with a larger display to continue.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <AppRoutes />;
}

export default App;