"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { CopyButton } from "./CopyButton";

export interface DetailField {
	label: string;
	value?: string | readonly string[];
	type?: "text" | "copyable" | "link";
	icon?: string;
}

export interface DetailSection {
	title?: string;
	fields: readonly DetailField[];
}

export interface DetailAction {
	label: string;
	url: string;
	icon?: string;
}

export interface ResourceDetailsData {
	sections: readonly DetailSection[];
	actions?: readonly DetailAction[];
}

interface ResourceDetailsModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	data: ResourceDetailsData;
}

export function ResourceDetailsModal({
	isOpen,
	onClose,
	title,
	data,
}: ResourceDetailsModalProps) {
	const renderField = (field: DetailField) => {
		// Handle fields without value (label-only fields)
		if (field.value === undefined) {
			return (
				<div key={field.label}>
					<p className="text-sm text-muted-foreground">
						{field.icon && `${field.icon} `}
						{field.label}
					</p>
				</div>
			);
		}

		const isArray = Array.isArray(field.value);
		const values: string[] = isArray
			? [...field.value]
			: [field.value as string];

		switch (field.type) {
			case "copyable":
				return (
					<div key={field.label}>
						<h4 className="font-medium text-sm text-muted-foreground mb-1">
							{field.icon && `${field.icon} `}
							{field.label}
						</h4>
						<div className="space-y-2">
							{values.map((value) => (
								<div
									key={value}
									className="flex items-center justify-between bg-muted rounded-md p-2"
								>
									<code className="text-sm flex-1 mr-2 break-all">{value}</code>
									<CopyButton value={value} />
								</div>
							))}
						</div>
					</div>
				);
			case "link":
				return (
					<div key={field.label}>
						<h4 className="font-medium text-sm text-muted-foreground mb-1">
							{field.icon && `${field.icon} `}
							{field.label}
						</h4>
						<div className="space-y-2">
							{values.map((value) => (
								<Button
									key={value}
									variant="outline"
									size="sm"
									onClick={() => window.open(value, "_blank")}
									className="w-full"
								>
									{value}
									<ExternalLink className="ml-2 h-4 w-4" />
								</Button>
							))}
						</div>
					</div>
				);
			default:
				return (
					<div key={field.label}>
						<h4 className="font-medium text-sm text-muted-foreground mb-1">
							{field.icon && `${field.icon} `}
							{field.label}
						</h4>
						{isArray ? (
							<div className="space-y-1">
								{values.map((value) => (
									<p key={value} className="font-mono text-sm">
										{value}
									</p>
								))}
							</div>
						) : (
							<p className="font-mono text-sm">{field.value}</p>
						)}
					</div>
				);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					{data.sections.map((section) => (
						<div key={section.title || "main"} className="space-y-3">
							{section.title && (
								<h3 className="font-semibold text-base">{section.title}</h3>
							)}
							{section.fields.map((field) => renderField(field))}
						</div>
					))}

					{data.actions && data.actions.length > 0 && (
						<div className="pt-2 space-y-2">
							{data.actions.map((action) => (
								<Button
									key={action.label}
									onClick={() => window.open(action.url, "_blank")}
									className="w-full"
								>
									{action.icon && `${action.icon} `}
									{action.label}
									<ExternalLink className="ml-2 h-4 w-4" />
								</Button>
							))}
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
