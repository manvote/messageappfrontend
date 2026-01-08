declare module '*.png' {
  // In React Native images imported via static import resolve to a number (native resource id)
  const value: number;
  export default value;
}
