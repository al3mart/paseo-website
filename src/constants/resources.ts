import type { LucideIcon } from "lucide-react";
import {
	Blocks,
	Droplets,
	FileText,
	Globe,
	Rocket,
	Search,
} from "lucide-react";
import { URLS } from "./urls";

// Resource modal field structure
export interface ModalField {
	readonly label: string;
	readonly value?: string | readonly string[];
	readonly icon: string;
	readonly type?: "text" | "copyable" | "link";
}

// Resource modal action structure
interface ModalAction {
	readonly label: string;
	readonly url: string;
}

// Resource modal data structure
export interface ModalData {
	readonly sections: readonly {
		readonly fields: readonly ModalField[];
	}[];
	readonly actions: readonly ModalAction[];
}

// Resource item structure
export interface Resource {
	readonly icon: LucideIcon;
	readonly title: string;
	readonly description: string;
	readonly href: string | undefined;
	readonly isExternal: boolean;
	readonly buttonLabel: string;
	readonly modalData: ModalData | undefined;
}

// Available resources for Paseo testnet
export const RESOURCES = [
	{
		icon: Droplets,
		title: "Paseo Faucet",
		description:
			"Get free testnet tokens for development and testing on Paseo network.",
		href: URLS.faucet,
		isExternal: true,
		buttonLabel: "Get Test Tokens",
		modalData: undefined,
	},
	{
		icon: FileText,
		title: "PAS Files",
		description:
			"Browse and access Paseo Action Submission governance documents and proposals.",
		href: "/pas",
		isExternal: false,
		buttonLabel: "Explore",
		modalData: undefined,
	},
	{
		icon: Globe,
		title: "OnPop",
		description:
			"Helps you build, deploy, and scale apps with open, modular, onchain tools.",
		href: URLS.onPop,
		isExternal: true,
		buttonLabel: "Visit Site",
		modalData: undefined,
	},
	{
		icon: Rocket,
		title: "PDP",
		description:
			"Easily build, deploy & scale native Polkadot rollups: secure, fast, and bridge-ready.",
		href: URLS.pdp,
		isExternal: true,
		buttonLabel: "Visit Site",
		modalData: undefined,
	},
	{
		icon: Rocket,
		title: "Build a Polkadot Parachain",
		description:
			"Learn how to start building a Polkadot parachain with comprehensive documentation and guides.",
		href: URLS.polkadotParachainsGuide,
		isExternal: true,
		buttonLabel: "Learn More",
		modalData: undefined,
	},
	{
		icon: Blocks,
		title: "Smart Contract Testnet",
		description:
			"Your playground for testing and deploying smart contracts in a safe Polkadot environment.",
		href: undefined,
		isExternal: false,
		buttonLabel: "View Details",
		modalData: {
			sections: [
				{
					fields: [
						{
							label: "Network name",
							value: "Passet Hub",
							icon: "📇",
						},
						{
							label: "Chain ID",
							value: "420420422",
							icon: "🆔",
						},
						{
							label: "RPC Endpoints",
							value: [URLS.passetHubRpc.ibp, URLS.passetHubRpc.polkadot],
							type: "copyable" as const,
							icon: "🔗",
						},
					],
				},
			],
			actions: [
				{
					label: "Block Explorer",
					url: URLS.passetHubExplorer,
				},
				{
					label: "Start building with Smart Contracts",
					url: URLS.polkadotSmartContracts,
				},
			],
		},
	},
	{
		icon: Search,
		title: "Explorers",
		description:
			"Browse transactions, blocks, and accounts on Paseo network with blockchain explorers.",
		href: undefined,
		isExternal: false,
		buttonLabel: "View Explorers",
		modalData: {
			sections: [
				{
					fields: [
						{
							label: "Choose a block explorer to get started",
							icon: "🔎",
						},
					],
				},
			],
			actions: [
				{
					label: "Open Routescan",
					url: URLS.explorers.routescan,
				},
				{
					label: "Open Subscan",
					url: URLS.explorers.subscan,
				},
			],
		},
	},
] as const satisfies readonly Resource[];
