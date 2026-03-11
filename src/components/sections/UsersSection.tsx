"use client";

import { PASEO_USERS } from "@/constants/users";
import Image from "next/image";

function UserLogo({
	src,
	srcDark,
	alt,
	width,
	height,
	className,
}: {
	src: string;
	srcDark?: string;
	alt: string;
	width: number;
	height: number;
	className: string;
}) {
	if (srcDark) {
		return (
			<>
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					className={`${className} dark:hidden`}
				/>
				<Image
					src={srcDark}
					alt={alt}
					width={width}
					height={height}
					className={`${className} hidden dark:block`}
				/>
			</>
		);
	}

	return (
		<Image
			src={src}
			alt={alt}
			width={width}
			height={height}
			className={className}
		/>
	);
}

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

				<div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
					{PASEO_USERS.map((user) => {
						const hasLogo = "logo" in user && user.logo;
						const hasDarkLogo = "logoDark" in user && user.logoDark;
						const shouldInvert =
							"darkInvert" in user && user.darkInvert;
						const isWordmark = "isWordmark" in user && user.isWordmark;

						const invertClass = shouldInvert ? "dark:invert" : "";
						const logoClass =
							`object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 ${invertClass}`;

						const content = isWordmark ? (
							<UserLogo
								src={user.logo!}
								srcDark={hasDarkLogo ? user.logoDark : undefined}
								alt={user.name}
								width={120}
								height={32}
								className={`h-6 w-auto max-w-[120px] ${logoClass}`}
							/>
						) : (
							<span className="flex items-center gap-2">
								{hasLogo && (
									<UserLogo
										src={user.logo!}
										srcDark={hasDarkLogo ? user.logoDark : undefined}
										alt={`${user.name} logo`}
										width={56}
										height={56}
										className={`w-7 h-7 ${logoClass}`}
									/>
								)}
								<span className="text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
									{user.name}
								</span>
							</span>
						);

						if ("url" in user) {
							return (
								<a
									key={user.name}
									href={user.url}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex items-center justify-center py-3 hover:scale-105 transition-transform duration-300"
									title={user.name}
								>
									{content}
								</a>
							);
						}

						return (
							<div
								key={user.name}
								className="group flex items-center justify-center py-3"
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
