import { SYNCED_COMPARISON_DATA } from "./comparison-data";
import { URLS } from "./urls";

interface Link {
	readonly href: string;
	readonly label: string;
}

// Hero section content structure
interface HeroContent {
	readonly title: string;
	readonly description: string;
	readonly buttons: {
		readonly primary: Link;
		readonly secondary: Link;
	};
}

// Hero section content
export const HERO_CONTENT = {
	title: "Polkadot Testnet",
	description:
		"The next-generation blockchain testnet for developers, validators, and innovators in the Polkadot ecosystem",
	buttons: {
		primary: {
			label: "Get Started",
			href: "#about",
		},
		secondary: {
			label: "Documentation",
			href: URLS.docs,
		},
	},
} as const satisfies HeroContent;

// About section content structure
interface AboutContent {
	readonly title: string;
	readonly description: string;
	readonly sections: readonly {
		readonly title: string;
		readonly description: string;
		readonly features: readonly string[];
	}[];
}

// About section content
export const ABOUT_CONTENT = {
	title: "About Paseo, the Polkadot Testnet",
	description:
		"Paseo is the testnet for the Polkadot ecosystem, designed as a decentralized, community-run, stable testnet for Parachain teams and dApp developers.",
	sections: [
		{
			title: "A Polkadot Testnet",
			description:
				"Paseo is a reliable testnet designed for quicker syncing and easy access to network slots for building parachains.",
			features: [
				"Coretime supply/demand management",
				"Faster chain synchronization",
				"Community-managed infrastructure",
			],
		},
		{
			title: "Community Driven",
			description:
				"Built by the community, for the community. Paseo operates as a fully decentralized testnet where decisions are made collectively by its participants.",
			features: [
				"Open source development",
				"Transparent decision making",
				"Community-funded operations",
				"Collaborative ecosystem growth",
			],
		},
	],
} as const satisfies AboutContent;

// Comparison section content structure
interface ComparisonContent {
	readonly title: string;
	readonly description: string;
	readonly features: {
		readonly title: string;
		readonly items: readonly {
			readonly feature: string;
			readonly link: string | undefined;
			readonly paseo: boolean | string;
			readonly kusama: boolean | string;
			readonly polkadot: boolean | string;
		}[];
	};
	readonly costs: {
		readonly title: string;
		readonly items: readonly {
			readonly feature: string;
			readonly paseo: string;
			readonly kusama: string;
			readonly polkadot: string;
		}[];
	};
	readonly footer: string;
}

// Comparison section content - uses synced data from paseo-network/runtimes
export const COMPARISON_CONTENT = {
	title: "Testnet vs Production",
	description:
		"The following section presents the differences between testnet and production runtimes. By showing users the variations in available features and operational costs, users can better adjust their expectations when transitioning from testnet to production environments.",
	features: {
		title: "Features",
		items: SYNCED_COMPARISON_DATA.features.items,
	},
	costs: {
		title: "Costs",
		items: SYNCED_COMPARISON_DATA.costs.items,
	},
	footer:
		"Paseo serves as the perfect testing ground before deploying to Polkadot mainnet, offering identical technology with zero financial risk.",
} as const satisfies ComparisonContent;

// Features section content structure
interface FeaturesContent {
	readonly title: string;
	readonly description: string;
	readonly button: Link;
}

// Features section content
export const FEATURES_CONTENT = {
	title: "Features",
	description:
		"Discover what makes Paseo the ideal testnet for your blockchain development needs",
	button: {
		label: "Explore All Features",
		href: "#technology",
	},
} as const satisfies FeaturesContent;

// Technology section content structure
interface TechnologyContent {
	readonly title: string;
	readonly description: string;
}

// Technology section content
export const TECHNOLOGY_CONTENT = {
	title: "Technology Stack",
	description:
		"Built on cutting-edge blockchain technology to provide the most reliable and efficient testnet experience",
} as const satisfies TechnologyContent;

// Community section content structure
interface CommunityContent {
	readonly title: string;
	readonly description: string;
	readonly links: readonly {
		readonly title: string;
		readonly description: string;
		readonly members: string;
		readonly href: string;
	}[];
	readonly governance: {
		readonly title: string;
		readonly description: string;
		readonly buttons: {
			readonly primary: Link;
			readonly secondary: Link;
		};
	};
}

// Community section content
export const COMMUNITY_CONTENT = {
	title: "Join Our Community",
	description:
		"Connect with thousands of developers, builders, and innovators shaping the future of blockchain technology.",
	links: [
		{
			title: "Matrix Support",
			description: "Get help in our support channel",
			members: "#paseo-testnet-support:parity.io",
			href: URLS.matrixSupport,
		},
		{
			title: "GitHub",
			description: "Contribute to Paseo development",
			members: "github.com/paseo-network",
			href: URLS.github,
		},
		{
			title: "Matrix Announcements",
			description: "Stay updated with network announcements",
			members: "#paseo-announcements:matrix.org",
			href: URLS.matrixAnnouncements,
		},
		{
			title: "PAS Governance",
			description: "Submit proposals and participate in governance",
			members: "Paseo Action Submission",
			href: "#governance",
		},
	],
	governance: {
		title: "Paseo Action Submission (PAS)",
		description:
			"Participate in Paseo governance by submitting proposals for network improvements. Help shape the future of the testnet through community-driven development.",
		buttons: {
			primary: {
				label: "Submit Proposal",
				href: URLS.githubGovernance,
			},
			secondary: {
				label: "View PAS Documents",
				href: URLS.docsGovernance,
			},
		},
	},
} as const satisfies CommunityContent;

// Resources section content structure
interface ResourcesContent {
	readonly title: string;
	readonly description: string;
}

// Resources section content
export const RESOURCES_CONTENT = {
	title: "Tools & Docs",
	description:
		"Access essential tools and documentation for building on Paseo testnet",
} as const satisfies ResourcesContent;

// PAS page content structure
interface PasContent {
	readonly title: string;
	readonly description: string;
	readonly repoConfig: {
		readonly owner: string;
		readonly repo: string;
		readonly path: string;
	};
	readonly browserTitle: string;
}

// PAS page content
export const PAS_CONTENT = {
	title: "Paseo Action Submission (PAS)",
	description:
		"Browse and view PAS files from the paseo-action-submission repository",
	repoConfig: {
		owner: "paseo-network",
		repo: "paseo-action-submission",
		path: "pas",
	},
	browserTitle: "PAS Files",
} as const satisfies PasContent;

// Developers section content structure
interface DevelopersContent {
	readonly title: string;
	readonly description: string;
}

// Developers section content
export const DEVELOPERS_CONTENT = {
	title: "For Developers",
	description: "Everything you need to start building on Paseo testnet",
} as const satisfies DevelopersContent;
