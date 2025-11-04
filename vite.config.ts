import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Nom exact du repo → important pour GitHub Pages
  base: "/capital-pintcheke-time/",

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    // Tagger utile seulement en dev
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // ✅ Génère les sourcemaps pour déboguer les erreurs minifiées
    sourcemap: true,
    // (optionnel) assure que les assets soient dans le bon dossier
    assetsDir: "assets",
    // (optionnel) plus lisible lors de debug sur Pages
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));
