"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CHAIN_SPECS_CONTENT } from "@/constants/chain-specs";

function getInitialSelectedFiles(): Record<string, string> {
	const initial: Record<string, string> = {};
	for (const spec of CHAIN_SPECS_CONTENT.specs) {
		initial[spec.title] = spec.files[0].filename;
	}
	return initial;
}

interface FileSelectProps {
	files: readonly { filename: string; url: string }[];
	value: string;
	onChange: (value: string) => void;
}

function FileSelect({ files, value, onChange }: FileSelectProps) {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className="flex-1 h-8 text-xs bg-background/50 text-left [&>span]:text-left">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{files.map((file) => (
					<SelectItem key={file.filename} value={file.filename}>
						{file.filename}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

export function ChainSpecsSection() {
	const [selectedFiles, setSelectedFiles] = useState<Record<string, string>>(
		getInitialSelectedFiles,
	);

	const getSelectedFile = (specTitle: string) => {
		const spec = CHAIN_SPECS_CONTENT.specs.find((s) => s.title === specTitle);
		const selectedFilename = selectedFiles[specTitle];
		return spec?.files.find((f) => f.filename === selectedFilename);
	};

	const handleFileChange = (specTitle: string, value: string) => {
		setSelectedFiles((prev) => ({
			...prev,
			[specTitle]: value,
		}));
	};

	return (
		<section id="chain-specs" className="section-primary py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						{CHAIN_SPECS_CONTENT.title}
					</h2>
					<p className="text-xl opacity-80 max-w-3xl mx-auto">
						{CHAIN_SPECS_CONTENT.description}
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
					{CHAIN_SPECS_CONTENT.specs.map((spec) => {
						const Icon = spec.icon;
						const selectedFile = getSelectedFile(spec.title);
						const hasMultipleFiles = spec.files.length > 1;

						return (
							<div
								key={spec.title}
								className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-all duration-200"
							>
								<div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
									<Icon className="w-6 h-6 text-primary" />
								</div>
								<h3 className="text-lg mb-2">{spec.title}</h3>
								<p className="text-muted-foreground text-sm mb-4">
									{spec.description}
								</p>
								<div className="flex items-center gap-2">
									{hasMultipleFiles ? (
										<FileSelect
											files={spec.files}
											value={selectedFiles[spec.title]}
											onChange={(value) => handleFileChange(spec.title, value)}
										/>
									) : (
										<code className="flex-1 text-xs bg-background/50 px-2 py-1 rounded text-primary truncate">
											{spec.files[0].filename}
										</code>
									)}
									<Button
										variant="ghost"
										size="sm"
										onClick={() =>
											selectedFile && window.open(selectedFile.url, "_blank")
										}
										className="bg-primary/10 hover:bg-primary/20 text-primary h-auto px-3 py-1 rounded-lg text-sm shrink-0"
									>
										<Download className="w-3 h-3" />
										<span>{CHAIN_SPECS_CONTENT.downloadLabel}</span>
									</Button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
