/// <reference types="vite/client" />

// vite-imagetools `?…&as=picture` imports
declare module '*as=picture' {
  const value: import('./content').Pic
  export default value
}
