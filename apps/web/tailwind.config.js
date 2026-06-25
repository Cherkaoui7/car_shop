const { colors } = require('@carshop/design-tokens');
module.exports = { content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"], theme: { extend: { colors: { ...colors } } }, plugins: [] };
