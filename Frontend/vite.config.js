<<<<<<< HEAD
=======
<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- THIS LINE IS CRUCIAL
  ],
  theme: { extend: {} },
  plugins: [tailwindcss(),react()],
})
=======
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": { target: "http://localhost:3000", changeOrigin: true },
    },
  },
});
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
