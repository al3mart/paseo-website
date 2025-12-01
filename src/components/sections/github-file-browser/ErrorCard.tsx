"use client";

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ErrorCardProps } from "./types";

export function ErrorCard({ repoConfig, onRetry }: ErrorCardProps) {
	return (
		<Card className="max-w-6xl mx-auto border-destructive">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-destructive">
					<FileText className="h-5 w-5" />
					Error Loading Repository Files
				</CardTitle>
			</CardHeader>
			<CardContent className="p-6">
				<div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
					<p className="text-destructive font-medium mb-2">
						Could not load files
					</p>
					<p className="text-sm text-muted-foreground">
						Unable to access repository files. Please try again later.
					</p>
				</div>
				<div className="mt-4 text-sm text-muted-foreground">
					<p className="mb-1">
						<strong>Repository:</strong> {repoConfig.owner}/{repoConfig.repo}
					</p>
					<p className="mb-3">
						<strong>Path:</strong> {repoConfig.path || "/"}
					</p>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={onRetry}
						className="mt-2"
					>
						Try Again
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
