import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FaucetCardProps {
	icon: LucideIcon;
	title: string;
	subtitle?: ReactNode;
	description?: string;
	children?: ReactNode;
	action?: ReactNode;
	className?: string;
}

export function FaucetCard({
	icon: Icon,
	title,
	subtitle,
	description,
	children,
	action,
	className,
}: FaucetCardProps) {
	return (
		<div
			className={cn(
				"relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-3xl border border-primary/20 p-8 md:p-10",
				className,
			)}
		>
			<div
				className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
				aria-hidden="true"
			/>
			<div
				className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"
				aria-hidden="true"
			/>

			<div className="relative z-10">
				<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
					<div className="flex-1">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center">
								<Icon className="w-7 h-7 text-primary" />
							</div>
							<div>
								<h3 className="text-2xl font-bold">{title}</h3>
								{subtitle}
							</div>
						</div>

						{description && (
							<p className="text-muted-foreground mb-6 max-w-xl">
								{description}
							</p>
						)}

						{children}
					</div>

					{action && <div className="flex-shrink-0">{action}</div>}
				</div>
			</div>
		</div>
	);
}
