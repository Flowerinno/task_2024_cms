namespace NodeJS {
	interface ProcessEnv {
		NEXTAUTH_URL: string;
		NODE_ENV: "development" | "production";
		BASE_URL: string;
	}
}
