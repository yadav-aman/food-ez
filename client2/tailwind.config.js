module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        99: 'calc(100% - 16rem);' /* get the width of the main content from lg:viewport by dividing
        (the total width by the width of the side navigation)*/,
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
