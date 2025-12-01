"use client";

import { useCallback, useEffect, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
	fetchFileContentByPath,
	fetchRepositoryFiles,
	type GitHubFile,
	type GitHubFileContent,
} from "@/lib/github";
import { ErrorCard } from "./ErrorCard";
import { FileContentPanel } from "./FileContentPanel";
import { FileListPanel } from "./FileListPanel";
import { MobileFileSelector } from "./MobileFileSelector";
import type { GitHubFileBrowserProps } from "./types";

export function GitHubFileBrowser({
	repoConfig,
	title = "Files",
}: GitHubFileBrowserProps) {
	return (
		<TooltipProvider>
			<GitHubFileBrowserContent repoConfig={repoConfig} title={title} />
		</TooltipProvider>
	);
}

function GitHubFileBrowserContent({
	repoConfig,
	title = "Files",
}: GitHubFileBrowserProps) {
	const [files, setFiles] = useState<GitHubFile[]>([]);
	const [selectedFile, setSelectedFile] = useState<GitHubFile | null>(null);
	const [fileContent, setFileContent] = useState<GitHubFileContent | null>(
		null,
	);
	const [isLoadingFiles, setIsLoadingFiles] = useState(true);
	const [isLoadingContent, setIsLoadingContent] = useState(false);
	const [error, setError] = useState<boolean>(false);
	const [showMarkdownFormatted, setShowMarkdownFormatted] = useState(true);

	const loadFiles = useCallback(async () => {
		try {
			setIsLoadingFiles(true);
			setError(false);
			const repoFiles = await fetchRepositoryFiles(repoConfig);
			setFiles(repoFiles);
			setSelectedFile(repoFiles[0]);
		} catch (_err) {
			setError(true);
		} finally {
			setIsLoadingFiles(false);
		}
	}, [repoConfig]);

	useEffect(() => {
		loadFiles();
	}, [loadFiles]);

	useEffect(() => {
		async function loadFileContent() {
			if (!selectedFile) {
				setFileContent(null);
				return;
			}

			try {
				setIsLoadingContent(true);
				setError(false);
				const content = await fetchFileContentByPath(
					repoConfig,
					selectedFile.name,
				);
				setFileContent(content);
			} catch (_err) {
				setError(true);
				setFileContent(null);
			} finally {
				setIsLoadingContent(false);
			}
		}

		loadFileContent();
	}, [selectedFile, repoConfig]);

	const handleRetry = useCallback(() => {
		setError(false);
		loadFiles();
	}, [loadFiles]);

	if (error && !isLoadingFiles) {
		return <ErrorCard repoConfig={repoConfig} onRetry={handleRetry} />;
	}

	return (
		<div className="max-w-7xl mx-auto mt-8">
			<MobileFileSelector
				files={files}
				selectedFile={selectedFile}
				onSelectFile={setSelectedFile}
			/>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
				<FileListPanel
					files={files}
					selectedFile={selectedFile}
					isLoading={isLoadingFiles}
					error={error}
					title={title}
					onSelectFile={setSelectedFile}
					onRetry={handleRetry}
				/>

				<FileContentPanel
					selectedFile={selectedFile}
					fileContent={fileContent}
					isLoading={isLoadingContent}
					error={error}
					showMarkdownFormatted={showMarkdownFormatted}
					onToggleMarkdownView={setShowMarkdownFormatted}
					onError={() => setError(true)}
				/>
			</div>
		</div>
	);
}
