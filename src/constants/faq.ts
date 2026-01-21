import { URLS } from "./urls";

export interface FAQLink {
	readonly url: string;
	readonly label?: string;
}

export interface FAQItem {
	readonly question: string;
	readonly answer: string;
	readonly links?: readonly FAQLink[];
}

// FAQ Content
export const FAQ_CONTENT = {
	title: "Frequently Asked Questions",
	description: "Find answers to common questions about Paseo Network",
	items: [
		{
			question: "How do I obtain coretime in Paseo?",
			answer:
				"One can obtain coretime in Paseo by participating on coretime sales, just like in production. Learn more about purchasing, renewing, and managing coretime.",
			links: [{ url: "/coretime", label: "View Coretime Guide" }],
		},
		{
			question:
				"I want to test new Polkadot features that aren't yet on Polkadot, can I do this on Paseo?",
			answer:
				"Only after they have been included in a runtime release by the polkadot fellowship. One of the key ways to keep Paseo stable is by only deploying code that has been deemed of certain quality by the Polkadot fellows.",
		},
		{
			question: "Who is managing Paseo?",
			answer:
				"The maintainers of the testnet are a distributed group of contributors taking care of the testnet runtimes and its infrastructure.",
			links: [{ url: URLS.githubGovernance, label: "View Contributors" }],
		},
		{
			question: "Are there any SLAs for incident management?",
			answer: "Yes, we have documented SLAs for incident management.",
			links: [{ url: URLS.githubSLA, label: "View SLAs" }],
		},
		{
			question:
				"Will it be possible to access the logs from the Relay and System chains?",
			answer:
				"Yes, most infrastructure providers send logs to a centralized logging service.",
			links: [{ url: URLS.grafanaLogs, label: "Access Logs" }],
		},
		{
			question: "I am a bit lost or I need further support, what do I do?",
			answer: "The best ways of contacting the involved contributors are:",
			links: [
				{ url: URLS.githubSupport, label: "Open an Issue" },
				{ url: URLS.matrixSupport, label: "Join Matrix Room" },
			],
		},
		{
			question: "My balance was reduced to 5K PAS suddenly, what's going on?",
			answer:
				"All accounts have an upper bound of 5K PAS, so we reduce all balances to that amount periodically. This is done to ensure the network integrity and the good use of the resources available in Paseo by limiting the economic power of anonymous actors. If there's a good reason, feel free to submit a PR requesting to whitelist your account. Paseo is a common good for the ecosystem and we must take care of it all together!",
		},
	] as const satisfies readonly FAQItem[],
};
