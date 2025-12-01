"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getLanguageFromExtension } from "@/lib/github";
import type { FileContentViewerProps } from "./types";

export function FileContentViewer({
	fileContent,
	showMarkdownFormatted,
}: FileContentViewerProps) {
	if (fileContent.extension === "md" && showMarkdownFormatted) {
		return (
			<div className="prose prose-slate dark:prose-invert max-w-none p-6">
				<ReactMarkdown>{fileContent.content}</ReactMarkdown>
			</div>
		);
	}

	return (
		<SyntaxHighlighter
			language={getLanguageFromExtension(fileContent.extension)}
			style={oneDark}
			showLineNumbers
			customStyle={{
				margin: 0,
				borderRadius: 0,
				background: "transparent",
			}}
			codeTagProps={{
				style: {
					fontSize: "14px",
					fontFamily:
						'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
				},
			}}
		>
			{fileContent.content}
		</SyntaxHighlighter>
	);
}
