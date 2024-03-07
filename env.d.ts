namespace NodeJS {
	interface ProcessEnv {
		NEXTAUTH_URL: string;
		NODE_ENV: "development" | "production";
		API_URL: string;
	}
}
