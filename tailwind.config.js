/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#F8F3FC", // Light pastel purple for the main background
          secondary: "#EEE6F8", // Slightly darker purple for secondary backgrounds
        },
        text: {
          DEFAULT: "#4A3F55", // Deep muted purple for main text
          secondary: "#7A6C86", // Softer purple for secondary text
          accent: "#A78CBF", // Highlighted text or headings
        },
        button: {
          DEFAULT: "#C9A8E3", // Pastel purple for buttons
          hover: "#B08ED2", // Slightly darker on hover
        },
        input: {
          background: "#F3EAF7", // Very light purple for inputs
          border: "#D1BFD8", // Soft purple for input borders
          text: "#4A3F55", // Same as main text color
        },
        table: {
          header: "#D6C5E6", // Light pastel purple for table headers
          row: "#EEE6F8", // Alternate row background
          border: "#C9A8E3", // Borders for table
        },
        highlight: "#F4D9F7", // Accent for warnings or highlights
      },
    },
  },
  plugins: [],
};
