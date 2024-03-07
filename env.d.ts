namespace NodeJS {
	interface ProcessEnv {
		NEXTAUTH_URL: string;
		NODE_ENV: "development" | "production";
		API_URL: string;
		MINIO_ROOT_USER: string;
		MINIO_ROOT_PASSWORD: string;
		REDIS_PASSWORD: string;
		REDIS_PORT: string;
		REDIS_HOST: string;
		REDIS_URL: string;
		REDIS_RESET_CODE: string;
	}
}
