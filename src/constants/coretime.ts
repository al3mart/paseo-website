import type { LucideIcon } from "lucide-react";
import { RefreshCw, ShoppingCart, Wrench, Zap } from "lucide-react";

export interface CoretimeStep {
	readonly number: number;
	readonly icon: LucideIcon;
	readonly title: string;
	readonly content: readonly string[];
	readonly note?: string;
}

export interface CoretimeCTA {
	readonly icon: LucideIcon;
	readonly title: string;
	readonly description: string;
	readonly linkLabel: string;
}

export const CORETIME_CTA: CoretimeCTA = {
	icon: Wrench,
	title: "Simplifying the Process",
	description:
		"If you'd prefer a more streamlined experience, RegionX Hub provides tools that abstract away much of this process and can help simplify coretime management on Paseo.",
	linkLabel: "Visit RegionX Hub",
} as const;

export const CORETIME_STEPS: readonly CoretimeStep[] = [
	{
		number: 1,
		icon: ShoppingCart,
		title: "Purchasing a Core",
		content: [
			"To buy a core (if availability remains), use the broker.purchase extrinsic on the Coretime chain.",
			"If the price exceeds 5,000 PAS, you'll need to contact the Paseo team to be whitelisted and obtain enough funds, otherwise you won't be able to purchase the core.",
			"Once purchased, call broker.assign to create a region and assign the core to your parachain. The region will be valid starting from a specific timeslice—typically the beginning of the next cycle.",
			"When the region starts, your chain will begin receiving coretime and producing blocks.",
		],
	},
	{
		number: 2,
		icon: RefreshCw,
		title: "Renewing Your Core",
		content: [
			"When the interlude period begins (the first ~2 days of each cycle), you can renew your core for the upcoming cycle using broker.renew.",
			"If you prefer automatic renewals, enable them with broker.enableAutoRenewal. This will renew your core each cycle as long as your parachain's sovereign account has sufficient funds to pay for the renewal.",
		],
		note: "Autorenewal should be called using the chain sovereign account on Coretime. Due to the PAS balance restriction, teams requiring auto-renewal should contact the Paseo support team to ensure adequate funds in their sovereign account + an open HRMP channel with the coretime chain.",
	},
	{
		number: 3,
		icon: Zap,
		title: "Starting Block Production Immediately",
		content: [
			"Don't want to wait up to a month for the next cycle to begin? Since Paseo is a testnet, there's a shortcut available.",
			"You still need to purchase coretime and assign the region as described above. However, the Paseo team can manually assign a core on the relay chain so your chain can start producing blocks right away—within the current cycle.",
			"Keep in mind this manual assignment is only valid for the current cycle. To guarantee coretime in future cycles, you must purchase it through the standard process.",
		],
	},
] as const;
