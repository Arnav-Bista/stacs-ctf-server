import Link from "next/link";

export default function Curry() {
  return (
    <div
      style={{
        fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
        background: "linear-gradient(180deg, #000080 0%, #000040 100%)",
        color: "#00FF00",
        minHeight: "100vh",
        padding: "20px",
        imageRendering: "pixelated",
      }}
    >
      {/* Geocities-style starfield/tiled background overlay */}
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes rainbow {
          0% { color: #ff0000; }
          16% { color: #ff8800; }
          33% { color: #ffff00; }
          50% { color: #00ff00; }
          66% { color: #0088ff; }
          83% { color: #ff00ff; }
          100% { color: #ff0000; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .blink { animation: blink 1s step-end infinite; }
        .marquee { animation: marquee 12s linear infinite; white-space: nowrap; }
        .rainbow { animation: rainbow 3s linear infinite; }
        .spin { animation: spin 2s linear infinite; display: inline-block; }
      `}</style>

      {/* Under Construction Banner */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <span style={{ fontSize: "30px" }}>🚧</span>
        <span className="blink" style={{ color: "#FFFF00", fontSize: "18px", fontWeight: "bold" }}>
          {" "}!! UNDER CONSTRUCTION !!{" "}
        </span>
        <span style={{ fontSize: "30px" }}>🚧</span>
      </div>

      {/* Marquee */}
      <div style={{ overflow: "hidden", borderTop: "3px dashed #FF00FF", borderBottom: "3px dashed #FF00FF", padding: "8px 0", marginBottom: "15px" }}>
        <div className="marquee" style={{ fontSize: "20px", color: "#FF6600" }}>
          ★ ★ ★ Welcome to Prof. Chris Brown&apos;s WORLD FAMOUS Curry Page!!! ★ ★ ★ You are visitor #000451 ★ ★ ★ Best viewed in Netscape Navigator 4.0 at 800x600 ★ ★ ★
        </div>
      </div>

      {/* Main Title */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <h1 className="rainbow" style={{ fontSize: "42px", fontWeight: "bold", textShadow: "3px 3px #000000" }}>
          🍛 Prof. Chris Brown&apos;s 🍛
        </h1>
        <h2 style={{ fontSize: "36px", color: "#FF4444", textShadow: "2px 2px #000000", fontWeight: "bold" }}>
          FAMOUS CURRY RECIPE
        </h2>
        <p style={{ color: "#FFFF00", fontSize: "14px", fontStyle: "italic" }}>
          &quot;Don&apos;t get too idiomatic!&quot; — Prof. Brown, every lecture
        </p>
      </div>

      <hr style={{ border: "2px dashed #FF00FF", margin: "20px 0" }} />

      {/* Welcome Section */}
      <div style={{
        border: "4px ridge #C0C0C0",
        background: "linear-gradient(135deg, #000080, #400040)",
        padding: "20px",
        margin: "15px auto",
        maxWidth: "800px",
      }}>
        <h3 style={{ color: "#00FFFF", fontSize: "24px", textAlign: "center", textDecoration: "underline" }}>
          📜 A NOTE FROM THE PROFESSOR 📜
        </h3>
        <p style={{ color: "#FFFFFF", fontSize: "16px", lineHeight: "1.8", marginTop: "10px" }}>
          Greetings, brave student! You have found my <span style={{ color: "#FFFF00" }}>legendary curry recipe</span>,
          passed down through generations of functional programmers. This recipe is <b style={{ color: "#FF6600" }}>PURE</b>,
          requires <b style={{ color: "#FF6600" }}>NO SIDE EFFECTS</b>, and the result is always{" "}
          <b style={{ color: "#FF6600" }}>LAZILY EVALUATED</b> (it takes about 2 hours to cook).
        </p>
        <p style={{ color: "#AAFFAA", fontSize: "14px", marginTop: "8px", fontStyle: "italic" }}>
          Remember: in this kitchen, everything is <b>curried</b> by default. If you want to uncurry something,
          you&apos;re in the wrong kitchen, pal.
        </p>
      </div>

      {/* Animated divider */}
      <div style={{ textAlign: "center", fontSize: "24px", margin: "15px 0" }}>
        <span className="spin">🌶️</span>
        {"  "}~*~*~*~*~*~*~*~*~*~{"  "}
        <span className="spin">🌶️</span>
      </div>

      {/* Ingredients */}
      <div style={{
        border: "4px double #FFD700",
        background: "#1a0030",
        padding: "20px",
        margin: "15px auto",
        maxWidth: "800px",
      }}>
        <h3 style={{ color: "#FFD700", fontSize: "26px", textAlign: "center" }}>
          🧄 INGREDIENTS 🧄
        </h3>
        <p style={{ color: "#AAAAAA", fontSize: "12px", textAlign: "center", marginBottom: "12px" }}>
          (carefully <span style={{ color: "#00FFFF", fontWeight: "bold" }}>map</span> out each one!)
        </p>
        <ul style={{ color: "#FFFFFF", fontSize: "16px", lineHeight: "2", listStyleType: "square", paddingLeft: "30px" }}>
          <li>🧅 1 large onion (the <span style={{ color: "#FF88FF" }}>predecessor</span> of flavour)</li>
          <li>🧄 4 cloves of garlic (apply to <span style={{ color: "#FF88FF" }}>each</span> element of the dish)</li>
          <li>🫚 A thumb of ginger (for that <span style={{ color: "#FF88FF" }}>pure</span> kick)</li>
          <li>🌶️ 2 dried chillies (handle with <span style={{ color: "#FF88FF" }}>care — no exceptions!</span>)</li>
          <li>🥫 400g tinned tomatoes (fully <span style={{ color: "#FF88FF" }}>evaluated</span>)</li>
          <li>🥥 200ml coconut milk (a <span style={{ color: "#FF88FF" }}>lazy</span> substitution for cream)</li>
          <li>🍗 500g chicken (or tofu — we support <span style={{ color: "#FF88FF" }}>polymorphism</span>)</li>
          <li>🧂 Salt & pepper (<span style={{ color: "#FF88FF" }}>compose</span> to taste)</li>
        </ul>
      </div>

      {/* Steps */}
      <div style={{
        border: "4px groove #00FF00",
        background: "#0a0a2a",
        padding: "20px",
        margin: "15px auto",
        maxWidth: "800px",
      }}>
        <h3 style={{ color: "#00FF00", fontSize: "26px", textAlign: "center" }}>
          👨‍🍳 METHOD 👨‍🍳
        </h3>
        <p style={{ color: "#AAAAAA", fontSize: "12px", textAlign: "center", marginBottom: "12px" }}>
          Follow these steps IN ORDER (we&apos;re not doing parallel evaluation today)
        </p>
        <ol style={{ color: "#FFFFFF", fontSize: "15px", lineHeight: "2.2", paddingLeft: "30px" }}>
          <li>
            <b style={{ color: "#00FFFF" }}>Curry</b> the paste: fry onion, garlic, ginger &amp; chillies in oil.
            Remember, <b style={{ color: "#FFFF00" }}>Haskell Curry</b> himself would approve — break it down into
            smaller applications!
          </li>
          <li>
            <b style={{ color: "#00FFFF" }}>Map</b> the spices across the base. Every good chef knows you must
            <span style={{ color: "#FFFF00" }}> apply the same transformation to each element</span> for even flavour.
          </li>
          <li>
            Add the tomatoes. Like a good <b style={{ color: "#FFFF00" }}>functor</b>, they preserve the
            structure while transforming the contents.
          </li>
          <li>
            Pour in the coconut milk. Let it <b style={{ color: "#FFFF00" }}>reduce</b> — or as we say in
            polite company, <b style={{ color: "#FFFF00" }}>fold</b>.
          </li>
          <li>
            Add the chicken. Each piece is the <span style={{ color: "#FFFF00" }}>predecessor</span> of
            something delicious. Apply <code style={{ color: "#FF88FF", background: "#222", padding: "2px 5px" }}>pred</code> to
            transform it!
          </li>
          <li>
            Simmer for 20 minutes. <span style={{ color: "#AAAAAA" }}>
            (Lazy evaluation: it won&apos;t be ready until you actually need it.)</span>
          </li>
        </ol>
      </div>

      {/* The secret hint section */}
      <div style={{
        border: "5px ridge #FF00FF",
        background: "linear-gradient(135deg, #2a002a, #000040)",
        padding: "25px",
        margin: "20px auto",
        maxWidth: "800px",
        textAlign: "center",
      }}>
        <h3 className="blink" style={{ color: "#FF0000", fontSize: "22px" }}>
          ⚠️ SECRET INGREDIENT ⚠️
        </h3>
        <p style={{ color: "#FFFF00", fontSize: "16px", marginTop: "10px" }}>
          Prof. Brown&apos;s secret: before serving, you MUST whisper the ancient incantation.
        </p>
        <p style={{ color: "#AAAAAA", fontSize: "14px", marginTop: "5px" }}>
          Take this mystical spice blend and <span style={{ color: "#00FF00", fontWeight: "bold" }}>map</span> each
          character to its <span style={{ color: "#00FF00", fontWeight: "bold" }}>pred</span>ecessor:
        </p>
        <div style={{
          background: "#000000",
          border: "2px solid #00FF00",
          padding: "15px",
          margin: "15px auto",
          maxWidth: "500px",
          fontFamily: '"Courier New", monospace',
        }}>
          <p style={{ color: "#00FF00", fontSize: "28px", letterSpacing: "6px", fontWeight: "bold" }}>
            foepgvodups
          </p>
        </div>
        <p style={{ color: "#888888", fontSize: "12px", marginTop: "10px" }}>
          Hint: In the Prelude, you&apos;ll find everything you need. One line is all it takes. 🤫
        </p>
      </div>

      {/* Guestbook & misc Geocities stuff */}
      <div style={{ textAlign: "center", margin: "25px 0" }}>
        <span className="spin">⭐</span>
        {"  "}~*~*~*~*~*~*~*~*~*~{"  "}
        <span className="spin">⭐</span>
      </div>

      <div style={{
        border: "3px inset #C0C0C0",
        background: "#000020",
        padding: "15px",
        margin: "15px auto",
        maxWidth: "800px",
        textAlign: "center",
      }}>
        <p style={{ color: "#FF6600", fontSize: "16px" }}>
          📖 Sign my <span style={{ textDecoration: "underline", color: "#00FFFF", cursor: "pointer" }}>GUESTBOOK</span>!!! 📖
        </p>
        <p style={{ color: "#888888", fontSize: "12px", marginTop: "5px" }}>
          Last updated: 14th March 1998 | Email me: chris.brown@geocities.com
        </p>
        <div style={{ marginTop: "10px", fontSize: "12px", color: "#666666" }}>
          <p>This page is best viewed with <b style={{ color: "#AAAAAA" }}>Netscape Navigator 4.0</b></p>
          <p>Resolution: 800x600 | Colors: 256</p>
          <p style={{ marginTop: "5px" }}>
            <span style={{ fontSize: "10px" }}>
              Made with 💖 on GeoCities | Member of the Functional Programming Webring
            </span>
          </p>
        </div>

        {/* Visitor Counter */}
        <div style={{
          display: "inline-block",
          background: "#000000",
          border: "2px inset #808080",
          padding: "5px 15px",
          marginTop: "10px",
          fontFamily: '"Courier New", monospace',
        }}>
          <span style={{ color: "#00FF00", fontSize: "14px" }}>Visitors: </span>
          <span style={{ color: "#FF0000", fontSize: "18px", fontWeight: "bold" }}>004,517</span>
        </div>
      </div>

      {/* Back button */}
      <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "20px" }}>
        <Link href="/">
          <span style={{
            background: "#C0C0C0",
            color: "#000080",
            padding: "8px 20px",
            border: "3px outset #FFFFFF",
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}>
            🏠 Back to Home 🏠
          </span>
        </Link>
      </div>

      {/* Bottom construction banner */}
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <span style={{ fontSize: "30px" }}>🚧</span>
        <span className="blink" style={{ color: "#FFFF00", fontSize: "14px" }}>
          {" "}Page permanently under construction since 1998{" "}
        </span>
        <span style={{ fontSize: "30px" }}>🚧</span>
      </div>
    </div>
  );
}
