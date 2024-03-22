namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_API_URL: string;
    MINIO_ROOT_USER: string;
    MINIO_ROOT_PASSWORD: string;
    MINIO_ENDPOINT: string;
    MINIO_PORT: number;
    MINIO_ACCESS_KEY: string;
    MINIO_SECRET_KEY: string;
    DATABASE_URL: string;
  }
}
