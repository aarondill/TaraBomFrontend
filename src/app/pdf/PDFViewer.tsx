"use client";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
const options = {
	cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
};
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer(props: { docUrl: string }) {
	const [numPages, setNumPages] = useState<number>();
	const onDocumentLoadSuccess = useCallback(
		({ numPages: nextNumPages }: PDFDocumentProxy) => {
			setNumPages(nextNumPages);
		},
		[]
	);
	const apiUrl = new URL("./api", window.location.href);
	apiUrl.searchParams.set("docUrl", props.docUrl);

	// const url = props.docUrl;
	return (
		<Document
			file={apiUrl.toString()}
			options={options}
			onLoadSuccess={onDocumentLoadSuccess}>
			{Array.from(new Array(numPages), (_el, index) => (
				<Page key={`page_${index + 1}`} pageNumber={index + 1} />
			))}
		</Document>
	);
}
