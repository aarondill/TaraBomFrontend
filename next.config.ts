import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	redirects: async () => {
		await Promise.resolve();
		return [
			{
				source: "/",
				has: [
					{
						type: "query",
						key: "id",
						value: "(?<id>.+)",
					},
				],
				destination: "/:id",
				permanent: false,
			},
		];
	},
};

export default nextConfig;
