"use client";

import { PASEO_USERS } from "@/constants/users";

export function UsersSection() {
	return (
		<section id="users" className="section-secondary py-16">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-12">
					<h2 className="text-2xl md:text-3xl font-bold mb-4">
						Who&apos;s using Paseo?
					</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						Trusted by teams and projects across the Polkadot ecosystem
					</p>
				</div>

				<div className="flex flex-wrap justify-center gap-4">
					{PASEO_USERS.map((user) => {
						const content = (
							<span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
								{user.name}
							</span>
						);

						if ("url" in user) {
							return (
								<a
									key={user.name}
									href={user.url}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex items-center justify-center px-5 py-3 bg-background/40 rounded-lg border border-border/40 hover:border-primary/30 hover:bg-background/60 transition-all duration-300 shadow-sm hover:shadow-md"
								>
									{content}
								</a>
							);
						}

						return (
							<div
								key={user.name}
								className="group flex items-center justify-center px-5 py-3 bg-background/40 rounded-lg border border-border/40 transition-all duration-300 shadow-sm"
							>
								{content}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
