type themeT = "light" | "dark";

/**
 * Sets attribute data-theme with theme
 * to ensure the css variables are applied.
 * @param {string} theme - The theme name ("light" | "dark")
 */
const applyTheme = (theme: themeT) => {
  // Going directly to the DOM.
  document.documentElement.setAttribute("data-theme", theme);
};

export default applyTheme;
