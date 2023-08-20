/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MAPBOXTOKEN: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }