/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          muted: withOpacity("--color-text-muted"),
          inverted: withOpacity("--color-text-inverted"),
          "muted-button": withOpacity("--color-text-muted-button"),
        },
      },

      backgroundColor: {
        skin: {
          fill: withOpacity("--color-bg-base"),
          "button-base": withOpacity("--color-button-base"),
          "button-muted": withOpacity("--color-button-muted"),
        },
      },
    },
  },
  plugins: [],
};
