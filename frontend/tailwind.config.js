/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12151C",
        panel: "#1B1F2A",
        panel2: "#232838",
        line: "#2E3444",
        amber: "#E8A33D",
        amber2: "#F4C06B",
        teal: "#4FD1C5",
        cream: "#F0EFEA",
        muted: "#8890A0",
        danger: "#E5686A",
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        panel: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        bar: {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
        reel: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        bar1: "bar 1.1s ease-in-out infinite",
        bar2: "bar 1.1s ease-in-out infinite 0.15s",
        bar3: "bar 1.1s ease-in-out infinite 0.3s",
        bar4: "bar 1.1s ease-in-out infinite 0.45s",
        bar5: "bar 1.1s ease-in-out infinite 0.6s",
        reel: "reel 4s linear infinite",
      },
    },
  },
  plugins: [],
};
