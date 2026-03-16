// Centralized URL constants - Single source of truth
export const URLS = {
	// External Services
	validatorLogs: "https://validators.paseo.site",
	grafanaLogs: "https://grafana.paseo.site/",
	regionXHub: "https://hub.regionx.tech/?network=paseo",

	// GitHub - Paseo Network
	github: "https://github.com/paseo-network",
	githubChainSpecs: "https://github.com/paseo-network/paseo-chain-specs",
	githubGovernance: "https://github.com/paseo-network/paseo-action-submission",
	githubSupport: "https://github.com/paseo-network/support",
	githubSLA:
		"https://github.com/paseo-network/paseo-action-submission/blob/main/pas/PAS-2-core-support-model.md",

	// Social Media
	twitter: "https://x.com/PaseoTestnet",

	// Matrix
	matrixSupport: "https://matrix.to/#/#paseo-testnet-support:parity.io",
	matrixAnnouncements: "https://matrix.to/#/#paseo-announcements:matrix.org",

	// Polkadot
	polkadotEcosystem: "https://polkadot.com",
	polkadotWikiAsyncBacking:
		"https://wiki.polkadot.com/learn/learn-async-backing/#asynchronous-backing",
	polkadotFellowsAgileCoretime:
		"https://polkadot-fellows.github.io/RFCs/approved/0001-agile-coretime.html?highlight=agile#rfc-1-agile-coretime",
	polkadotFellowsElasticScaling:
		"https://polkadot-fellows.github.io/RFCs/approved/0103-introduce-core-index-commitment.html?highlight=Elastic%20scaling#summary",

	// Zondax
	zondax: "https://zondax.ch",
	zondaxPrivacy: "https://zondax.ch/privacy-policy",
	zondaxTerms: "https://zondax.ch/terms-of-use",

	// Chain Specs - R2 Storage
	chainSpecsBase: "https://paseo-r2.zondax.ch/chain-specs",
	chainSpecs: {
		relayChain: "https://paseo-r2.zondax.ch/chain-specs/paseo.raw.json",
		relayChainSmol:
			"https://paseo-r2.zondax.ch/chain-specs/paseo.raw.smol.json",
		assetHub: "https://paseo-r2.zondax.ch/chain-specs/paseo-asset-hub.json",
		assetHubSmol:
			"https://paseo-r2.zondax.ch/chain-specs/paseo-asset-hub.smol.json",
		bridgeHub:
			"https://paseo-r2.zondax.ch/chain-specs/paseo-bridge-hub.raw.json",
		bridgeHubSmol:
			"https://paseo-r2.zondax.ch/chain-specs/paseo-bridge-hub.raw.smol.json",
		coretime: "https://paseo-r2.zondax.ch/chain-specs/paseo-coretime.raw.json",
		coretimeSmol:
			"https://paseo-r2.zondax.ch/chain-specs/paseo-coretime.raw.smol.json",
		people: "https://paseo-r2.zondax.ch/chain-specs/paseo-people.raw.json",
		peopleSmol:
			"https://paseo-r2.zondax.ch/chain-specs/paseo-people.raw.smol.json",
		collectives:
			"https://paseo-r2.zondax.ch/chain-specs/paseo-collectives.raw.json",
		collectivesSmol:
			"https://paseo-r2.zondax.ch/chain-specs/paseo-collectives.raw.smol.json",
	},

	// Explorers
	explorers: {
		routescan: "https://polkadot.testnet.routescan.io/",
		subscan: "https://paseo.subscan.io/",
	},

	// Resources
	faucet: "https://faucet.polkadot.io/",
	onPop: "https://onpop.io/",
	pdp: "https://www.deploypolkadot.xyz/",
	pdpCoretimeAutoRenewal:
		"https://www.deploypolkadot.xyz/coretime-auto-renewal",
	polkadotParachainsGuide:
		"https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/",
	polkadotSmartContracts: "https://docs.polkadot.com/develop/smart-contracts/",
	passetHubExplorer: "https://blockscout-passet-hub.parity-testnet.parity.io/",

	// RPC Endpoints
	passetHubRpc: {
		ibp: "wss://passet-hub-paseo.ibp.network",
		polkadot: "wss://testnet-passet-hub-eth-rpc.polkadot.io",
	},
} as const;
