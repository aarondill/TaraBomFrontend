"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

export default function Page() {
	const searchParams = useSearchParams();
	const docUrl = searchParams.get("docUrl");
	if (!docUrl) return <div>No document URL provided</div>;
	if (typeof docUrl !== "string")
		return <div>Document URL must be a string</div>;
	return <PDFViewer docUrl={docUrl} />;
}
