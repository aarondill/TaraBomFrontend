import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "BOM Retriever",
};
function Search() {
	return (
		<form method="GET" action="/">
			<input type="text" name="id" placeholder="BOM ID" />
			<button type="submit">Search</button>
		</form>
	);
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body suppressHydrationWarning>
				<main>
					<Search />
					{children}
				</main>
			</body>
		</html>
	);
}
