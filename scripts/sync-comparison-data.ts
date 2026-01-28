/**
 * Sync Comparison Data Script
 *
 * Fetches the "Testnet vs Production" tables from the paseo-network/runtimes README
 * and updates the COMPARISON_CONTENT in src/constants/content.ts
 *
 * Usage: npx tsx scripts/sync-comparison-data.ts
 */

import * as fs from "node:fs";
import * as path from "node:path";

export const RUNTIMES_README_URL =
	"https://raw.githubusercontent.com/paseo-network/runtimes/main/README.md";

export interface FeatureItem {
	feature: string;
	link: string | undefined;
	paseo: boolean | string;
	kusama: boolean | string;
	polkadot: boolean | string;
}

export interface CostItem {
	feature: string;
	paseo: string;
	kusama: string;
	polkadot: string;
}

export interface ParsedTables {
	features: FeatureItem[];
	costs: CostItem[];
}

/**
 * Fetch the README content from the runtimes repository
 */
export async function fetchReadme(): Promise<string> {
	console.log("Fetching README from runtimes repository...");
	const response = await fetch(RUNTIMES_README_URL);

	if (!response.ok) {
		throw new Error(`Failed to fetch README: ${response.status}`);
	}

	return response.text();
}

/**
 * Extract markdown link text and URL
 */
export function parseMarkdownLink(text: string): {
	text: string;
	url: string | null;
} {
	const linkMatch = text.match(/\[([^\]]+)\]\(([^)]+)\)/);
	if (linkMatch) {
		return { text: linkMatch[1], url: linkMatch[2] };
	}
	return { text: text.trim(), url: null };
}

/**
 * Parse a cell value to determine if it's a boolean or string
 */
export function parseCellValue(cell: string): boolean | string {
	const trimmed = cell.trim();

	if (trimmed === "✅" || trimmed === "✓") return true;
	if (trimmed === "❌" || trimmed === "✗" || trimmed === "") return false;

	return trimmed;
}

/**
 * Parse a markdown table into rows
 */
export function parseMarkdownTable(tableText: string): string[][] {
	const lines = tableText.trim().split("\n");
	const rows: string[][] = [];

	for (const line of lines) {
		// Skip separator lines (|---|---|---|)
		if (line.includes("---")) continue;

		// Parse table row
		const cells = line
			.split("|")
			.map((cell) => cell.trim())
			.filter((cell) => cell !== "");

		if (cells.length > 0) {
			rows.push(cells);
		}
	}

	return rows;
}

/**
 * Extract a table after a specific header
 */
export function extractTableAfterHeader(
	content: string,
	headerPattern: RegExp,
): string | null {
	const headerMatch = content.match(headerPattern);
	if (!headerMatch || headerMatch.index === undefined) return null;

	// Get content after the header
	const startIndex = headerMatch.index + headerMatch[0].length;
	const afterHeader = content.slice(startIndex);

	// Find the table (lines starting with |)
	const tableMatch = afterHeader.match(/(\|[^\n]+\|\n?)+/);
	return tableMatch ? tableMatch[0] : null;
}

/**
 * Extract the Features and Costs tables from the README
 */
export function extractTables(readme: string): {
	features: string;
	costs: string;
} {
	// Find the "Testnet vs Production" section (## or ### level)
	const sectionMatch = readme.match(
		/##\s*Testnet\s+vs\s+Production[\s\S]*?(?=\n##\s[^#]|$)/i,
	);

	if (!sectionMatch) {
		throw new Error('Could not find "Testnet vs Production" section in README');
	}

	const section = sectionMatch[0];

	// Extract Features table (after ### Features header)
	const featuresTable = extractTableAfterHeader(
		section,
		/###\s*Features\s*\n/i,
	);

	// Extract Costs table (after ### Costs header)
	const costsTable = extractTableAfterHeader(section, /###\s*Costs\s*\n/i);

	if (!featuresTable) {
		throw new Error("Could not find Features table in the section");
	}

	if (!costsTable) {
		throw new Error("Could not find Costs table in the section");
	}

	return {
		features: featuresTable,
		costs: costsTable,
	};
}

/**
 * Parse the Features table
 */
export function parseFeaturesTable(tableText: string): FeatureItem[] {
	const rows = parseMarkdownTable(tableText);

	// Skip header row
	const dataRows = rows.slice(1);

	return dataRows.map((row) => {
		const [featureCell, paseoCell, kusamaCell, polkadotCell] = row;

		const { text: feature, url: link } = parseMarkdownLink(featureCell || "");

		return {
			feature,
			link: link || undefined,
			paseo: parseCellValue(paseoCell || ""),
			kusama: parseCellValue(kusamaCell || ""),
			polkadot: parseCellValue(polkadotCell || ""),
		};
	});
}

/**
 * Parse the Costs table
 */
export function parseCostsTable(tableText: string): CostItem[] {
	const rows = parseMarkdownTable(tableText);

	// Skip header row
	const dataRows = rows.slice(1);

	return dataRows.map((row) => {
		const [featureCell, paseoCell, kusamaCell, polkadotCell] = row;

		return {
			feature: featureCell?.trim() || "",
			paseo: paseoCell?.trim() || "",
			kusama: kusamaCell?.trim() || "",
			polkadot: polkadotCell?.trim() || "",
		};
	});
}

/**
 * Safely serialize a value for TypeScript code generation
 */
export function serializeValue(value: unknown): string {
	if (value === undefined) return "undefined";
	if (typeof value === "boolean") return String(value);
	return JSON.stringify(value);
}

/**
 * Generate the TypeScript code for the comparison content
 */
export function generateComparisonCode(data: ParsedTables): string {
	const featuresCode = data.features
		.map((item) => {
			return `		{
			feature: ${serializeValue(item.feature)},
			link: ${serializeValue(item.link)},
			paseo: ${serializeValue(item.paseo)},
			kusama: ${serializeValue(item.kusama)},
			polkadot: ${serializeValue(item.polkadot)},
		}`;
		})
		.join(",\n");

	const costsCode = data.costs
		.map((item) => {
			return `		{
			feature: ${serializeValue(item.feature)},
			paseo: ${serializeValue(item.paseo)},
			kusama: ${serializeValue(item.kusama)},
			polkadot: ${serializeValue(item.polkadot)},
		}`;
		})
		.join(",\n");

	return `// Auto-generated comparison data from paseo-network/runtimes
// Last synced: ${new Date().toISOString()}
// Source: https://github.com/paseo-network/runtimes#testnet-vs-production

export const SYNCED_COMPARISON_DATA = {
	features: {
		items: [
${featuresCode}
		],
	},
	costs: {
		items: [
${costsCode}
		],
	},
} as const;
`;
}

/**
 * Validate parsed data has expected structure
 */
export function validateParsedData(data: ParsedTables): void {
	if (data.features.length === 0) {
		throw new Error("No features found in the Features table");
	}

	if (data.costs.length === 0) {
		throw new Error("No costs found in the Costs table");
	}

	// Validate each feature has required fields
	for (const item of data.features) {
		if (!item.feature || item.feature.trim() === "") {
			throw new Error("Found feature item with empty feature name");
		}
	}

	// Validate each cost has required fields
	for (const item of data.costs) {
		if (!item.feature || item.feature.trim() === "") {
			throw new Error("Found cost item with empty feature name");
		}
	}
}

/**
 * Main function
 */
async function main(): Promise<void> {
	try {
		// Fetch README
		const readme = await fetchReadme();

		// Extract tables
		console.log("Extracting tables from README...");
		const { features: featuresTable, costs: costsTable } =
			extractTables(readme);

		// Parse tables
		console.log("Parsing Features table...");
		const features = parseFeaturesTable(featuresTable);
		console.log(`  Found ${features.length} feature items`);

		console.log("Parsing Costs table...");
		const costs = parseCostsTable(costsTable);
		console.log(`  Found ${costs.length} cost items`);

		// Validate parsed data
		console.log("Validating parsed data...");
		const parsedData = { features, costs };
		validateParsedData(parsedData);
		console.log("  Validation passed");

		// Generate code
		console.log("Generating TypeScript code...");
		const code = generateComparisonCode(parsedData);

		// Write to file
		const outputPath = path.join(
			process.cwd(),
			"src/constants/comparison-data.ts",
		);
		fs.writeFileSync(outputPath, code, "utf-8");
		console.log(`\nWritten to: ${outputPath}`);

		// Output summary
		console.log("\n--- Sync Summary ---");
		console.log(`Features: ${features.length} items`);
		console.log(`Costs: ${costs.length} items`);
		console.log("--------------------\n");
	} catch (error) {
		console.error("Error syncing comparison data:", error);
		process.exit(1);
	}
}

// Only run main when executed directly (not when imported for testing)
const isMainModule =
	typeof require !== "undefined"
		? require.main === module
		: import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
	main();
}
