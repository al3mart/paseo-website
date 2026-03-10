// Projects and teams using Paseo testnet
export interface PaseoUser {
	readonly name: string;
	readonly url?: string;
}

export const PASEO_USERS = [
	{ name: "Aventus", url: "https://aventus.io" },
	{ name: "Bifrost", url: "https://bifrost.io" },
	{ name: "Depow" },
	{ name: "Deserve (Helikon)", url: "https://helikon.io" },
	{ name: "EduChain" },
	{ name: "Energyweb", url: "https://energyweb.org" },
	{ name: "Frequency", url: "https://frequency.xyz" },
	{ name: "Hydration", url: "https://hydration.net" },
	{ name: "Hyperbridge", url: "https://hyperbridge.network" },
	{ name: "Ideal Network", url: "https://idealabs.network" },
	{ name: "Kreivo", url: "https://kreivo.io" },
	{ name: "Mandala Chain", url: "https://mandalachain.io" },
	{ name: "Mosaic Devnet" },
	{ name: "Mythical", url: "https://mythicalgames.com" },
	{ name: "Neuroweb", url: "https://neuroweb.ai" },
	{ name: "Opal" },
	{ name: "Parity", url: "https://parity.io" },
	{ name: "Pendulum", url: "https://pendulumchain.org" },
	{ name: "Shibuya" },
	{ name: "Xcavate", url: "https://xcavate.io" },
] as const satisfies readonly PaseoUser[];
