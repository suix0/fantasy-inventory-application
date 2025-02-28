module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.html"], // Adjust paths as needed
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        tertiary: "var(--tertiary-color)",
        last: "var(--last-color)",
      },
    },
  },
  plugins: [],
};
