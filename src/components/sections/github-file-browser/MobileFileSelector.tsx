"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { MobileFileSelectorProps } from "./types";
import { formatFileSize } from "./utils";

export function MobileFileSelector({
	files,
	selectedFile,
	onSelectFile,
}: MobileFileSelectorProps) {
	return (
		<div className="lg:hidden mb-6">
			<Select
				value={selectedFile?.name || ""}
				onValueChange={(fileName) => {
					const file = files.find((f) => f.name === fileName);
					if (file) onSelectFile(file);
				}}
			>
				<SelectTrigger className="w-full rounded-xl border-border bg-card text-card-foreground shadow font-medium text-sm px-6">
					<SelectValue placeholder="Select a file to view" />
				</SelectTrigger>
				<SelectContent>
					{files.map((file) => (
						<SelectItem key={file.path} value={file.name}>
							<div className="flex items-center justify-between w-full gap-2">
								<span className="truncate font-medium text-sm min-w-0 flex-1">
									{file.name}
								</span>
								<span className="text-xs text-muted-foreground flex-shrink-0 whitespace-nowrap">
									{formatFileSize(file.size)}
								</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
