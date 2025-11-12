export const getImageUrl = (name) => {
  // This is a Vite-specific pattern to resolve the path dynamically
  return new URL(`../assets/${name}`, import.meta.url).href;
};
