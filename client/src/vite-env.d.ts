/// <reference types="vite/client" />

type AuthResponse = { msg: string, data: { username: string, _id: string }}

interface ImportMetaEnv {
    readonly VITE_MAPBOXTOKEN: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }