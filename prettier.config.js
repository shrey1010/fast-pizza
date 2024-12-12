import tailwindPlugin from "prettier-plugin-tailwindcss";

export default {
  plugins: [tailwindPlugin],
  tailwindConfig: "./tailwind.config.js", // Optional: path to your Tailwind configuration file
  printWidth: 80, // Set print width (adjust as needed)
  // tabWidth: 2, // Set tab width
  // useTabs: false, // Use spaces instead of tabs
  semi: true, // Add semicolons at the end of statements
  singleQuote: true, // Use single quotes instead of double quotes
  trailingComma: "es5", // Add trailing commas where valid in ES5 (objects, arrays, etc.)
  bracketSpacing: true, // Add spaces between brackets in object literals
  arrowParens: "always", // Always include parentheses around arrow function parameters
};
