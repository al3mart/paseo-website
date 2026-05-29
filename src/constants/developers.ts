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

// Faucet structure
interface FaucetInfo {
	readonly name: string;
	readonly description: string;
	readonly url: string;
	readonly networks: readonly string[];
}

// Developers page content structure
interface DevelopersPageContent {
	readonly hero: {
		readonly title: string;
		readonly description: string;
		readonly badge: string;
	};
	readonly faucet: {
		readonly title: string;
		readonly description: string;
		readonly faucets: readonly FaucetInfo[];
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
	faucet: {
		title: "Get Test Tokens",
		description:
			"Request free PAS tokens to start building and testing your applications on Paseo testnet.",
		faucets: [
			{
				name: "Polkadot Faucet",
				description:
					"Official faucet for Paseo testnet. Get PAS tokens instantly via Matrix authentication.",
				url: "https://faucet.polkadot.io/",
				networks: [
					"Paseo Relay Chain",
					"Asset Hub",
					"Bridge Hub",
					"Coretime",
					"People",
					"Collectives",
				],
			},
		],
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
					{
						provider: "Zondax",
						urls: ["wss://api2.zondax.ch/pas/relay/node/rpc"],
					},
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
						provider: "Zondax",
						urls: ["wss://api2.zondax.ch/pas/assethub/node/rpc"],
					},
					{
						provider: "Dwellir",
						urls: ["wss://asset-hub-paseo-rpc.n.dwellir.com"],
					},
					{
						provider: "Dotters",
						urls: ["wss://asset-hub-paseo.dotters.network"],
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
						provider: "Zondax",
						urls: ["wss://api2.zondax.ch/pas/bridgehub/node/rpc"],
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
						provider: "Zondax",
						urls: ["wss://api2.zondax.ch/pas/coretime/node/rpc"],
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
						provider: "Zondax",
						urls: ["wss://api2.zondax.ch/pas/people/node/rpc"],
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
						provider: "Zondax",
						urls: ["wss://api2.zondax.ch/pas/collectives/node/rpc"],
					},
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
			{
				name: "Eth Asset Hub",
				network: "eth-asset-hub",
				endpoints: [
					{
						provider: "Dotters",
						urls: ["https://eth-asset-hub-paseo.dotters.network"],
					},
					{
						provider: "Polkadot Hub",
						urls: ["https://services.polkadothub-rpc.com/testnet"],
					},
					{
						provider: "Polkadot",
						urls: ["https://eth-rpc-testnet.polkadot.io/"],
					},
				],
			},
		],
	},
} as const satisfies DevelopersPageContent;
