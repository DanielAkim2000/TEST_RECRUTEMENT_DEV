/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-main": "#007bff",
        "orange-main": "#fd7e14",
        "red-main": "#dc3545",
        "slate-main": "#475569",
        primary: {
          main: "#007bff",
        },
        orange: {
          main: "#fd7e14",
        },
        secondary: {
          main: "#6c757d",
        },
        success: {
          main: "#28a745",
        },
        info: {
          main: "#17a2b8",
        },
        warning: {
          main: "#ffc107",
        },
        danger: {
          main: "#dc3545",
        },
        light: {
          main: "#f8f9fa",
        },
        dark: {
          main: "#343a40",
        },
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      screens: {
        xs: "0",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
      },
    },
  },
  plugins: [],
};
