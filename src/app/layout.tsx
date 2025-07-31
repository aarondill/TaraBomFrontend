import type { Metadata } from "next";
import "./globals.css";

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
		<html lang="en">
			<body>
				<main>
					<Search />
					{children}
				</main>
			</body>
		</html>
	);
}
