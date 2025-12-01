"use client";

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LoadingState } from "./LoadingState";
import type { FileListPanelProps } from "./types";
import { formatFileSize } from "./utils";

export function FileListPanel({
	files,
	selectedFile,
	isLoading,
	error,
	title,
	onSelectFile,
	onRetry,
}: FileListPanelProps) {
	return (
		<Card className="hidden lg:flex col-span-1">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<FileText className="h-5 w-5" />
					{title} ({files.length})
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				{isLoading ? (
					<LoadingState message="Loading files..." />
				) : error ? (
					<div className="p-6">
						<div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
							<p className="text-destructive font-medium mb-2 text-sm">
								Could not load files
							</p>
							<p className="text-xs text-muted-foreground mb-3">
								Unable to access repository files.
							</p>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={onRetry}
								className="text-xs"
							>
								Retry
							</Button>
						</div>
					</div>
				) : (
					<div className="h-[calc(100vh-320px)] overflow-y-auto">
						{files.map((file, index) => (
							<div key={file.path}>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											type="button"
											variant="ghost"
											onClick={() => onSelectFile(file)}
											className={cn(
												"w-full text-left px-6 py-3 h-auto justify-start hover:bg-accent transition-colors",
												selectedFile?.path === file.path && "bg-accent",
											)}
										>
											<div className="w-full">
												<div className="font-medium text-sm truncate">
													{file.name}
												</div>
												<div className="text-xs text-muted-foreground">
													{formatFileSize(file.size)}
												</div>
											</div>
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>{file.name}</p>
									</TooltipContent>
								</Tooltip>
								{index < files.length - 1 && <Separator />}
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
