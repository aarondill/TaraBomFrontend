"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

function PDFPage() {
	const searchParams = useSearchParams();
	const docUrl = searchParams.get("docUrl");
	if (!docUrl) return <div>No document URL provided</div>;
	if (typeof docUrl !== "string")
		return <div>Document URL must be a string</div>;
	return <PDFViewer docUrl={docUrl} />;
}
export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<PDFPage />
		</Suspense>
	);
}
