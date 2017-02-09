module.exports = function getCSSVar(variable) {
  return window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(`--${variable}`)
    .trim();
};
