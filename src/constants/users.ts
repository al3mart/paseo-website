// Projects and teams using Paseo testnet
export interface PaseoUser {
	readonly name: string;
	readonly url?: string;
	readonly logo?: string;
	/** Logo variant for dark mode. If absent, `logo` is used in both modes */
	readonly logoDark?: string;
	/** If true, invert the logo in dark mode (for dark raster logos without a dark variant) */
	readonly darkInvert?: boolean;
	/** If true, the logo already contains the project name (wordmark) */
	readonly isWordmark?: boolean;
}

export const PASEO_USERS = [
	{
		name: "Aventus",
		url: "https://aventus.io",
		logo: "/img/logos/users/light/aventus.svg",
		logoDark: "/img/logos/users/dark/aventus.svg",
		isWordmark: true,
	},
	{
		name: "Bifrost",
		url: "https://bifrost.io",
		logo: "/img/logos/users/light/bifrost.svg",
		logoDark: "/img/logos/users/dark/bifrost.svg",
		isWordmark: true,
	},
	{ name: "Depow" },
	{
		name: "Deserve (Helikon)",
		url: "https://helikon.io",
		logo: "/img/logos/users/light/helikon.svg",
		logoDark: "/img/logos/users/dark/helikon.svg",
	},
	{
		name: "EduChain",
		url: "https://educhain.blockscout.com",
		logo: "/img/logos/users/light/educhain.webp",
		darkInvert: true,
		isWordmark: true,
	},
	{
		name: "Energyweb",
		url: "https://energyweb.org",
		logo: "/img/logos/users/light/energyweb.svg",
		logoDark: "/img/logos/users/dark/energyweb.svg",
		isWordmark: true,
	},
	{
		name: "Frequency",
		url: "https://frequency.xyz",
		logo: "/img/logos/users/light/frequency.svg",
	},
	{
		name: "Hydration",
		url: "https://hydration.net",
		logo: "/img/logos/users/light/hydration.svg",
	},
	{
		name: "Hyperbridge",
		url: "https://hyperbridge.network",
		logo: "/img/logos/users/light/hyperbridge.svg",
		logoDark: "/img/logos/users/dark/hyperbridge.svg",
		isWordmark: true,
	},
	{
		name: "Ideal Network",
		url: "https://idealabs.network",
		logo: "/img/logos/users/light/idealnetwork.webp",
		darkInvert: true,
		isWordmark: true,
	},
	{
		name: "Kreivo",
		url: "https://kreivo.io",
		logo: "/img/logos/users/light/kreivo.svg",
	},
	{
		name: "Mandala Chain",
		url: "https://mandalachain.io",
		logo: "/img/logos/users/light/mandalachain.webp",
		darkInvert: true,
		isWordmark: true,
	},
	{
		name: "Mosaic Devnet",
		url: "https://mosaicchain.io",
		logo: "/img/logos/users/light/mosaicdevnet.webp",
	},
	{
		name: "Mythical",
		url: "https://mythicalgames.com",
		logo: "/img/logos/users/light/mythical.svg",
		isWordmark: true,
	},
	{
		name: "Neuroweb",
		url: "https://neuroweb.ai",
		logo: "/img/logos/users/light/neuroweb.webp",
		darkInvert: true,
	},
	{ name: "Opal", url: "https://mineopal.org/" },
	{
		name: "Parity",
		url: "https://parity.io",
		logo: "/img/logos/users/light/parity.svg",
		logoDark: "/img/logos/users/dark/parity.svg",
		isWordmark: true,
	},
	{
		name: "Pendulum",
		url: "https://pendulumchain.org",
		logo: "/img/logos/users/light/pendulum.svg",
		logoDark: "/img/logos/users/dark/pendulum.svg",
	},
	{ name: "Shibuya" },
	{
		name: "Xcavate",
		url: "https://xcavate.io",
		logo: "/img/logos/users/light/xcavate.svg",
	},
] as const satisfies readonly PaseoUser[];
