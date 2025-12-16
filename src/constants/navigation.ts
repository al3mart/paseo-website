// Navigation item structure
export interface SubMenuItem {
	name: string;
	href: string;
}

export interface MenuItem {
	name: string;
	href: string;
	onClick?: () => void;
	submenu?: readonly SubMenuItem[];
}

// Developer page submenu items
export const DEVELOPER_SUBMENU_ITEMS: readonly SubMenuItem[] = [
	{ name: "RPC Endpoints", href: "/developers#rpc-endpoints" },
	{ name: "Chain Specs", href: "/developers#chain-specs" },
	{ name: "Network Comparison", href: "/developers#network-comparison" },
	{ name: "Tools & Docs", href: "/developers#tools-and-docs" },
];

// Main navigation menu items
export const NAVIGATION_ITEMS: readonly MenuItem[] = [
	{ name: "Home", href: "#hero" },
	{ name: "About", href: "#about" },
	{ name: "FAQ", href: "#faq" },
	{ name: "Developers", href: "/developers", submenu: DEVELOPER_SUBMENU_ITEMS },
];

// Labels for auxiliary UI elements (external links, theme toggle, modal titles)
export const ISOLATED_NAV_LABELS = {
	paseoLogs: "Paseo Logs",
	validatorLogin: "Validator Login",
	theme: "Theme",
	navigationMenu: "Navigation Menu",
} as const;

// Navigation behavior constants
export const SCROLL_THRESHOLD = 100 as const;
export const ANIMATION_DURATION = 200 as const;
