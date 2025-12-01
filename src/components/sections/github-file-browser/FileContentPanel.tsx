"use client";

import { Code, Download, ExternalLink, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { downloadGitHubFile } from "@/lib/download";
import { FileContentViewer } from "./FileContentViewer";
import { LoadingState } from "./LoadingState";
import type { FileContentPanelProps } from "./types";

export function FileContentPanel({
	selectedFile,
	fileContent,
	isLoading,
	error,
	showMarkdownFormatted,
	onToggleMarkdownView,
	onError,
}: FileContentPanelProps) {
	return (
		<Card className="col-span-1 lg:col-span-2">
			<CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-2">
				<CardTitle className="flex items-center gap-2 min-w-0 flex-1 max-w-full">
					{selectedFile ? (
						<>
							<FileText className="h-5 w-5 flex-shrink-0" />
							<Tooltip>
								<TooltipTrigger asChild>
									<span className="truncate block">{selectedFile.name}</span>
								</TooltipTrigger>
								<TooltipContent>
									<p>{selectedFile.name}</p>
								</TooltipContent>
							</Tooltip>
						</>
					) : (
						"Select a file to view"
					)}
				</CardTitle>
				{selectedFile && (
					<div className="flex gap-2 flex-shrink-0">
						{fileContent?.extension === "md" && (
							<div className="flex border rounded-md">
								<Button
									type="button"
									variant={showMarkdownFormatted ? "default" : "ghost"}
									size="sm"
									className="rounded-r-none"
									onClick={() => onToggleMarkdownView(true)}
								>
									<Eye className="h-4 w-4" />
								</Button>
								<Button
									type="button"
									variant={!showMarkdownFormatted ? "default" : "ghost"}
									size="sm"
									className="rounded-l-none"
									onClick={() => onToggleMarkdownView(false)}
								>
									<Code className="h-4 w-4" />
								</Button>
							</div>
						)}
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() =>
								downloadGitHubFile(selectedFile, {
									onError: () => onError(),
								})
							}
						>
							<Download className="h-4 w-4" />
						</Button>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => window.open(selectedFile.html_url, "_blank")}
						>
							<ExternalLink className="h-4 w-4" />
						</Button>
					</div>
				)}
			</CardHeader>
			<CardContent className="p-0">
				{!selectedFile ? (
					<div className="flex items-center justify-center py-12 text-muted-foreground">
						Select a file from the list to view its content
					</div>
				) : isLoading ? (
					<LoadingState message="Loading content..." />
				) : error && !fileContent ? (
					<div className="p-6">
						<div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
							<p className="text-destructive font-medium text-sm">
								Could not load files
							</p>
						</div>
					</div>
				) : fileContent ? (
					<div className="h-[calc(100vh-320px)] overflow-auto">
						<FileContentViewer
							fileContent={fileContent}
							showMarkdownFormatted={showMarkdownFormatted}
						/>
					</div>
				) : null}
			</CardContent>
		</Card>
	);
}
