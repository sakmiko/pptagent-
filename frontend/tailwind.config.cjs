module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 50px -30px rgba(15, 23, 42, 0.45)",
      },
    },
  },
  plugins: [],
};
