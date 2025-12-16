"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
	value: string;
	className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={handleCopy}
			className={cn("shrink-0 h-8 w-8 p-0", className)}
			aria-label={copied ? "Copied" : "Copy to clipboard"}
		>
			{copied ? (
				<Check className="w-4 h-4 text-green-500" />
			) : (
				<Copy className="w-4 h-4" />
			)}
		</Button>
	);
}
