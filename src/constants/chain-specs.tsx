import { Database, FileCode, type LucideIcon, Server } from "lucide-react";
import { URLS } from "./urls";

interface ChainSpecFile {
	readonly filename: string;
	readonly url: string;
}

interface ChainSpec {
	readonly title: string;
	readonly description: string;
	readonly files: readonly ChainSpecFile[];
	readonly icon: LucideIcon;
}

interface ChainSpecsContent {
	readonly title: string;
	readonly description: string;
	readonly downloadLabel: string;
	readonly specs: readonly ChainSpec[];
}

// Chain Specs Content
export const CHAIN_SPECS_CONTENT = {
	title: "Chain Specifications",
	description:
		"Download the chain specification files needed to connect to Paseo network and its parachains. All files are hosted and maintained by Zondax.",
	downloadLabel: "Download",
	specs: [
		{
			title: "Paseo Relay Chain",
			description: "Main relay chain specification file",
			files: [
				{ filename: "paseo.raw.json", url: URLS.chainSpecs.relayChain },
				{
					filename: "paseo.raw.smol.json",
					url: URLS.chainSpecs.relayChainSmol,
				},
			],
			icon: Server,
		},
		{
			title: "Asset Hub",
			description: "Asset Hub parachain specification",
			files: [
				{ filename: "paseo-asset-hub.json", url: URLS.chainSpecs.assetHub },
				{
					filename: "paseo-asset-hub.smol.json",
					url: URLS.chainSpecs.assetHubSmol,
				},
			],
			icon: Database,
		},
		{
			title: "Bridge Hub",
			description: "Bridge Hub parachain specification",
			files: [
				{
					filename: "paseo-bridge-hub.raw.json",
					url: URLS.chainSpecs.bridgeHub,
				},
				{
					filename: "paseo-bridge-hub.raw.smol.json",
					url: URLS.chainSpecs.bridgeHubSmol,
				},
			],
			icon: FileCode,
		},
		{
			title: "Coretime Chain",
			description: "Coretime parachain specification",
			files: [
				{ filename: "paseo-coretime.raw.json", url: URLS.chainSpecs.coretime },
				{
					filename: "paseo-coretime.raw.smol.json",
					url: URLS.chainSpecs.coretimeSmol,
				},
			],
			icon: Server,
		},
		{
			title: "People Chain",
			description: "People parachain specification",
			files: [
				{ filename: "paseo-people.raw.json", url: URLS.chainSpecs.people },
				{
					filename: "paseo-people.raw.smol.json",
					url: URLS.chainSpecs.peopleSmol,
				},
			],
			icon: Database,
		},
		{
			title: "Collectives Chain",
			description: "Collectives parachain specification",
			files: [
				{
					filename: "paseo-collectives.raw.json",
					url: URLS.chainSpecs.collectives,
				},
				{
					filename: "paseo-collectives.raw.smol.json",
					url: URLS.chainSpecs.collectivesSmol,
				},
			],
			icon: Database,
		},
	],
} as const satisfies ChainSpecsContent;
