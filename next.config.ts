import { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	env: {
		// NOTE: defaults to localhost on port 8080, this can be changed in the .env file
		RETRIEVER_SERVER_ADDRESS:
			process.env.RETRIEVER_SERVER_ADDRESS ?? "http://localhost:8080",
	},
};

export default nextConfig;
