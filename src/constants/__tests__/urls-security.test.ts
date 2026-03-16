import { describe, expect, it } from "vitest";
import { URLS } from "../urls";

/**
 * Allowlist of trusted domains for all URLs in the project.
 * Any new domain must be explicitly added here after review.
 */
const ALLOWED_DOMAINS = [
	"github.com",
	"paseo-r2.zondax.ch",
	"validators.paseo.site",
	"grafana.paseo.site",
	"hub.regionx.tech",
	"x.com",
	"matrix.to",
	"polkadot.com",
	"wiki.polkadot.com",
	"polkadot-fellows.github.io",
	"zondax.ch",
	"faucet.polkadot.io",
	"onpop.io",
	"www.deploypolkadot.xyz",
	"docs.polkadot.com",
	"blockscout-passet-hub.parity-testnet.parity.io",
	"paseo.subscan.io",
	"polkadot.testnet.routescan.io",
	"testnet-passet-hub-eth-rpc.polkadot.io",
	"passet-hub-paseo.ibp.network",
];

/**
 * Known phishing or compromised domains that must never appear in the codebase.
 */
const BLOCKED_DOMAINS = ["docs.paseo.network"];

function extractAllUrls(
	obj: unknown,
	path = "",
): { url: string; path: string }[] {
	const urls: { url: string; path: string }[] = [];

	if (typeof obj === "string") {
		if (
			obj.startsWith("http://") ||
			obj.startsWith("https://") ||
			obj.startsWith("wss://")
		) {
			urls.push({ url: obj, path });
		}
	} else if (typeof obj === "object" && obj !== null) {
		for (const [key, value] of Object.entries(obj)) {
			urls.push(...extractAllUrls(value, path ? `${path}.${key}` : key));
		}
	}

	return urls;
}

function getDomain(url: string): string {
	try {
		return new URL(url.replace("wss://", "https://")).hostname;
	} catch {
		return "";
	}
}

describe("URL Security", () => {
	const allUrls = extractAllUrls(URLS);

	it("should have URLs to validate", () => {
		expect(allUrls.length).toBeGreaterThan(0);
	});

	it("should only contain URLs from allowed domains", () => {
		const disallowed = allUrls.filter(({ url }) => {
			const domain = getDomain(url);
			return !ALLOWED_DOMAINS.some(
				(allowed) => domain === allowed || domain.endsWith(`.${allowed}`),
			);
		});

		if (disallowed.length > 0) {
			const details = disallowed
				.map(({ url, path }) => `  ${path}: ${url}`)
				.join("\n");
			throw new Error(
				`Found URLs with domains not in the allowlist:\n${details}\n\n` +
					"If this domain is legitimate, add it to ALLOWED_DOMAINS in urls-security.test.ts",
			);
		}
	});

	it("should not contain any blocked/phishing domains", () => {
		const blocked = allUrls.filter(({ url }) => {
			const domain = getDomain(url);
			return BLOCKED_DOMAINS.some(
				(b) => domain === b || domain.endsWith(`.${b}`),
			);
		});

		if (blocked.length > 0) {
			const details = blocked
				.map(({ url, path }) => `  ${path}: ${url}`)
				.join("\n");
			throw new Error(`SECURITY: Found blocked/phishing domains:\n${details}`);
		}
	});

	it("should only use HTTPS or WSS protocols", () => {
		const insecure = allUrls.filter(
			({ url }) => !url.startsWith("https://") && !url.startsWith("wss://"),
		);

		if (insecure.length > 0) {
			const details = insecure
				.map(({ url, path }) => `  ${path}: ${url}`)
				.join("\n");
			throw new Error(`Found URLs using insecure protocols:\n${details}`);
		}
	});

	it("should have valid URL format", () => {
		const invalid = allUrls.filter(({ url }) => {
			try {
				new URL(url.replace("wss://", "https://"));
				return false;
			} catch {
				return true;
			}
		});

		if (invalid.length > 0) {
			const details = invalid
				.map(({ url, path }) => `  ${path}: ${url}`)
				.join("\n");
			throw new Error(`Found malformed URLs:\n${details}`);
		}
	});
});
