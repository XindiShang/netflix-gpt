/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_API_ACCESS_TOKEN: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_GROQAI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
