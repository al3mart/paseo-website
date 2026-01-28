// Auto-generated comparison data from paseo-network/runtimes
// Last synced: 2026-01-28T15:34:01.160Z
// Source: https://github.com/paseo-network/runtimes#testnet-vs-production

export const SYNCED_COMPARISON_DATA = {
	features: {
		items: [
		{
			feature: "Agile Coretime",
			link: "https://polkadot-fellows.github.io/RFCs/approved/0001-agile-coretime.html?highlight=agile#rfc-1-agile-coretime",
			paseo: true,
			kusama: true,
			polkadot: true,
		},
		{
			feature: "Async Backing",
			link: "https://wiki.polkadot.com/learn/learn-async-backing/#asynchronous-backing",
			paseo: true,
			kusama: true,
			polkadot: true,
		},
		{
			feature: "Elastic Scaling",
			link: "https://polkadot-fellows.github.io/RFCs/approved/0103-introduce-core-index-commitment.html?highlight=Elastic%20scaling#summary",
			paseo: true,
			kusama: true,
			polkadot: true,
		},
		{
			feature: "Asset Hub Migration",
			link: undefined,
			paseo: true,
			kusama: true,
			polkadot: true,
		},
		{
			feature: "PolkaVM Contracts",
			link: undefined,
			paseo: true,
			kusama: true,
			polkadot: true,
		},
		{
			feature: "ERC-20 Precompile",
			link: "https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/assets/precompiles",
			paseo: true,
			kusama: true,
			polkadot: true,
		},
		{
			feature: "XCM Precompile",
			link: "https://github.com/paritytech/polkadot-sdk/tree/master/polkadot/xcm/pallet-xcm/precompiles/",
			paseo: true,
			kusama: true,
			polkadot: true,
		},
		{
			feature: "Coretime interlude period",
			link: undefined,
			paseo: "2 days",
			kusama: "7 days",
			polkadot: "7 days",
		}
		],
	},
	costs: {
		items: [
		{
			feature: "Parachain Id Reservation",
			paseo: "100",
			kusama: "4",
			polkadot: "100",
		},
		{
			feature: "Parachain Registration",
			paseo: "~3,200",
			kusama: "~105",
			polkadot: "~3,200",
		},
		{
			feature: "Asset Creation",
			paseo: "~0.0017 + 0.4 Deposit",
			kusama: "~0.00012 + 0.013 Deposit",
			polkadot: "~0.0018 + 0.4 Deposit",
		},
		{
			feature: "Identity Creation",
			paseo: "~0.002 + 0.2 Deposit",
			kusama: "~0.00009 + 0.006 Deposit",
			polkadot: "~0.002 + 0.2 Deposit",
		},
		{
			feature: "Contract Instantiation (12K polkavm blob)",
			paseo: "~0.12 + 0.6 Deposit",
			kusama: "~0.004 + 0.02 Deposit",
			polkadot: "-",
		}
		],
	},
} as const;
