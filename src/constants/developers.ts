// RPC Endpoint structure
interface RpcEndpoint {
	readonly provider: string;
	readonly urls: readonly string[];
}

// Chain with multiple RPC endpoints
interface ChainEndpoints {
	readonly name: string;
	readonly network: string;
	readonly endpoints: readonly RpcEndpoint[];
}

// Developers page content structure
interface DevelopersPageContent {
	readonly hero: {
		readonly title: string;
		readonly description: string;
		readonly badge: string;
	};
	readonly rpcEndpoints: {
		readonly title: string;
		readonly description: string;
		readonly chains: readonly ChainEndpoints[];
	};
}

export const DEVELOPERS_PAGE_CONTENT = {
	hero: {
		title: "Developer Portal",
		description:
			"Everything you need to build, test, and deploy on Paseo testnet. Access RPC endpoints, download chain specs, and explore comprehensive documentation.",
		badge: "For Developers",
	},
	rpcEndpoints: {
		title: "RPC Endpoints",
		description:
			"Connect to Paseo network instantly using these public RPC endpoints. All endpoints are free to use for development and testing.",
		chains: [
			{
				name: "Paseo Relay Chain",
				network: "paseo",
				endpoints: [
					{ provider: "IBP Network", urls: ["wss://rpc.ibp.network/paseo"] },
					{ provider: "Dwellir", urls: ["wss://paseo-rpc.n.dwellir.com"] },
					{ provider: "Dotters", urls: ["wss://paseo.dotters.network"] },
					{ provider: "Amforc", urls: ["wss://paseo.rpc.amforc.com"] },
					{ provider: "Stakeworld", urls: ["wss://pas-rpc.stakeworld.io"] },
				],
			},
			{
				name: "Asset Hub",
				network: "asset-hub",
				endpoints: [
					{
						provider: "IBP Network",
						urls: ["wss://sys.ibp.network/asset-hub-paseo"],
					},
					{
						provider: "Dwellir",
						urls: ["wss://asset-hub-paseo-rpc.n.dwellir.com"],
					},
					{
						provider: "Dotters",
						urls: [
							"wss://asset-hub-paseo.dotters.network",
							"https://eth-asset-hub-paseo.dotters.network",
						],
					},
					{
						provider: "Stakeworld",
						urls: ["wss://pas-rpc.stakeworld.io/assethub"],
					},
					{
						provider: "Turboflakes",
						urls: ["wss://sys.turboflakes.io/asset-hub-paseo"],
					},
				],
			},
			{
				name: "Bridge Hub",
				network: "bridge-hub",
				endpoints: [
					{
						provider: "IBP Network",
						urls: ["wss://sys.ibp.network/bridgehub-paseo"],
					},
					{
						provider: "Dotters",
						urls: ["wss://bridge-hub-paseo.dotters.network"],
					},
				],
			},
			{
				name: "Coretime",
				network: "coretime",
				endpoints: [
					{
						provider: "IBP Network",
						urls: ["wss://sys.ibp.network/coretime-paseo"],
					},
					{
						provider: "Dotters",
						urls: ["wss://coretime-paseo.dotters.network"],
					},
				],
			},
			{
				name: "People",
				network: "people",
				endpoints: [
					{
						provider: "IBP Network",
						urls: ["wss://sys.ibp.network/people-paseo"],
					},
					{ provider: "Dotters", urls: ["wss://people-paseo.dotters.network"] },
					{ provider: "Amforc", urls: ["wss://people-paseo.rpc.amforc.com"] },
				],
			},
			{
				name: "Collectives",
				network: "collectives",
				endpoints: [
					{
						provider: "Dotters",
						urls: ["wss://collectives-paseo.dotters.network"],
					},
					{
						provider: "Amforc",
						urls: ["wss://collectives-paseo.rpc.amforc.com"],
					},
				],
			},
		],
	},
} as const satisfies DevelopersPageContent;
