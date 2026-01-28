import { describe, expect, it } from "vitest";
import {
	extractTableAfterHeader,
	extractTables,
	generateComparisonCode,
	type ParsedTables,
	parseCellValue,
	parseCostsTable,
	parseFeaturesTable,
	parseMarkdownLink,
	parseMarkdownTable,
	serializeValue,
	validateParsedData,
} from "../sync-comparison-data";

describe("sync-comparison-data", () => {
	describe("parseMarkdownLink", () => {
		it("should extract text and URL from markdown link", () => {
			const result = parseMarkdownLink("[Agile Coretime](https://example.com)");
			expect(result).toEqual({
				text: "Agile Coretime",
				url: "https://example.com",
			});
		});

		it("should handle links with special characters in URL", () => {
			const result = parseMarkdownLink(
				"[Feature](https://example.com/path?query=1&other=2#hash)",
			);
			expect(result).toEqual({
				text: "Feature",
				url: "https://example.com/path?query=1&other=2#hash",
			});
		});

		it("should return plain text when no link present", () => {
			const result = parseMarkdownLink("Plain text");
			expect(result).toEqual({
				text: "Plain text",
				url: null,
			});
		});

		it("should trim whitespace from plain text", () => {
			const result = parseMarkdownLink("  Some text  ");
			expect(result).toEqual({
				text: "Some text",
				url: null,
			});
		});

		it("should handle empty string", () => {
			const result = parseMarkdownLink("");
			expect(result).toEqual({
				text: "",
				url: null,
			});
		});
	});

	describe("parseCellValue", () => {
		describe("boolean values", () => {
			it("should return true for checkmark emoji", () => {
				expect(parseCellValue("✅")).toBe(true);
			});

			it("should return true for checkmark character", () => {
				expect(parseCellValue("✓")).toBe(true);
			});

			it("should return false for X emoji", () => {
				expect(parseCellValue("❌")).toBe(false);
			});

			it("should return false for X character", () => {
				expect(parseCellValue("✗")).toBe(false);
			});

			it("should return false for empty string", () => {
				expect(parseCellValue("")).toBe(false);
			});
		});

		describe("string values", () => {
			it("should return trimmed string for text values", () => {
				expect(parseCellValue("2 days")).toBe("2 days");
			});

			it("should trim whitespace", () => {
				expect(parseCellValue("  7 days  ")).toBe("7 days");
			});

			it("should return numeric strings as strings", () => {
				expect(parseCellValue("100")).toBe("100");
			});
		});
	});

	describe("parseMarkdownTable", () => {
		it("should parse a simple table", () => {
			const table = `| Feature | Paseo | Kusama |
| --- | --- | --- |
| Feature A | ✅ | ❌ |
| Feature B | ✅ | ✅ |`;

			const result = parseMarkdownTable(table);

			expect(result).toEqual([
				["Feature", "Paseo", "Kusama"],
				["Feature A", "✅", "❌"],
				["Feature B", "✅", "✅"],
			]);
		});

		it("should skip separator lines", () => {
			const table = `| Col1 | Col2 |
|------|------|
| A | B |`;

			const result = parseMarkdownTable(table);

			expect(result).toHaveLength(2);
			expect(result[0]).toEqual(["Col1", "Col2"]);
			expect(result[1]).toEqual(["A", "B"]);
		});

		it("should handle cells with special characters", () => {
			const table = `| Feature | Cost |
| --- | --- |
| Asset Creation | ~0.0017 + 0.4 Deposit |`;

			const result = parseMarkdownTable(table);

			expect(result[1]).toEqual(["Asset Creation", "~0.0017 + 0.4 Deposit"]);
		});

		it("should handle empty table", () => {
			const result = parseMarkdownTable("");
			expect(result).toEqual([]);
		});
	});

	describe("extractTableAfterHeader", () => {
		it("should extract table after matching header", () => {
			const content = `# Some content

### Features

| Feature | Paseo |
| --- | --- |
| Test | ✅ |

### Other section`;

			const result = extractTableAfterHeader(content, /###\s*Features\s*\n/i);

			expect(result).toContain("| Feature | Paseo |");
			expect(result).toContain("| Test | ✅ |");
		});

		it("should return null when header not found", () => {
			const content = "Some content without the header";

			const result = extractTableAfterHeader(
				content,
				/###\s*NonExistent\s*\n/i,
			);

			expect(result).toBeNull();
		});

		it("should return null when no table after header", () => {
			const content = `### Features

No table here, just text.

### Other`;

			const result = extractTableAfterHeader(content, /###\s*Features\s*\n/i);

			expect(result).toBeNull();
		});
	});

	describe("extractTables", () => {
		const sampleReadme = `# Paseo Runtimes

## Some Section

Content here.

## Testnet vs Production

Some intro text.

### Features

| Feature | Paseo | Kusama | Polkadot |
| --- | --- | --- | --- |
| Agile Coretime | ✅ | ✅ | ✅ |
| PolkaVM | ✅ | ✅ | ❌ |

### Costs

| Feature | Paseo | Kusama | Polkadot |
| --- | --- | --- | --- |
| Asset Creation | 100 | 4 | 100 |

## Another Section`;

		it("should extract both features and costs tables", () => {
			const result = extractTables(sampleReadme);

			expect(result.features).toContain("Agile Coretime");
			expect(result.features).toContain("PolkaVM");
			expect(result.costs).toContain("Asset Creation");
		});

		it("should throw error when section not found", () => {
			const invalidReadme = "# No testnet section here";

			expect(() => extractTables(invalidReadme)).toThrow(
				'Could not find "Testnet vs Production" section',
			);
		});

		it("should throw error when features table not found", () => {
			const invalidReadme = `## Testnet vs Production

### Costs

| Feature | Paseo |
| --- | --- |
| Test | 100 |`;

			expect(() => extractTables(invalidReadme)).toThrow(
				"Could not find Features table",
			);
		});

		it("should throw error when costs table not found", () => {
			const invalidReadme = `## Testnet vs Production

### Features

| Feature | Paseo |
| --- | --- |
| Test | ✅ |`;

			expect(() => extractTables(invalidReadme)).toThrow(
				"Could not find Costs table",
			);
		});
	});

	describe("parseFeaturesTable", () => {
		it("should parse features with boolean values", () => {
			const table = `| Feature | Paseo | Kusama | Polkadot |
| --- | --- | --- | --- |
| Feature A | ✅ | ✅ | ❌ |`;

			const result = parseFeaturesTable(table);

			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				feature: "Feature A",
				link: undefined,
				paseo: true,
				kusama: true,
				polkadot: false,
			});
		});

		it("should parse features with links", () => {
			const table = `| Feature | Paseo | Kusama | Polkadot |
| --- | --- | --- | --- |
| [Agile Coretime](https://example.com) | ✅ | ✅ | ✅ |`;

			const result = parseFeaturesTable(table);

			expect(result[0]).toEqual({
				feature: "Agile Coretime",
				link: "https://example.com",
				paseo: true,
				kusama: true,
				polkadot: true,
			});
		});

		it("should parse features with string values", () => {
			const table = `| Feature | Paseo | Kusama | Polkadot |
| --- | --- | --- | --- |
| Coretime interlude | 2 days | 7 days | 7 days |`;

			const result = parseFeaturesTable(table);

			expect(result[0]).toEqual({
				feature: "Coretime interlude",
				link: undefined,
				paseo: "2 days",
				kusama: "7 days",
				polkadot: "7 days",
			});
		});
	});

	describe("parseCostsTable", () => {
		it("should parse costs table", () => {
			const table = `| Feature | Paseo | Kusama | Polkadot |
| --- | --- | --- | --- |
| Asset Creation | ~0.0017 + 0.4 | ~0.00012 + 0.013 | ~0.0018 + 0.4 |`;

			const result = parseCostsTable(table);

			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				feature: "Asset Creation",
				paseo: "~0.0017 + 0.4",
				kusama: "~0.00012 + 0.013",
				polkadot: "~0.0018 + 0.4",
			});
		});

		it("should handle X mark as string in costs", () => {
			const table = `| Feature | Paseo | Kusama | Polkadot |
| --- | --- | --- | --- |
| Contract | ~0.12 | ~0.004 | ❌ |`;

			const result = parseCostsTable(table);

			expect(result[0].polkadot).toBe("❌");
		});
	});

	describe("serializeValue", () => {
		it("should return 'undefined' for undefined", () => {
			expect(serializeValue(undefined)).toBe("undefined");
		});

		it("should return string 'true' for boolean true", () => {
			expect(serializeValue(true)).toBe("true");
		});

		it("should return string 'false' for boolean false", () => {
			expect(serializeValue(false)).toBe("false");
		});

		it("should JSON stringify strings", () => {
			expect(serializeValue("hello")).toBe('"hello"');
		});

		it("should escape special characters in strings", () => {
			expect(serializeValue('say "hello"')).toBe('"say \\"hello\\""');
		});

		it("should handle strings with newlines", () => {
			expect(serializeValue("line1\nline2")).toBe('"line1\\nline2"');
		});
	});

	describe("generateComparisonCode", () => {
		it("should generate valid TypeScript code", () => {
			const data: ParsedTables = {
				features: [
					{
						feature: "Test Feature",
						link: "https://example.com",
						paseo: true,
						kusama: false,
						polkadot: "N/A",
					},
				],
				costs: [
					{
						feature: "Test Cost",
						paseo: "100",
						kusama: "50",
						polkadot: "100",
					},
				],
			};

			const result = generateComparisonCode(data);

			expect(result).toContain("export const SYNCED_COMPARISON_DATA");
			expect(result).toContain('feature: "Test Feature"');
			expect(result).toContain('link: "https://example.com"');
			expect(result).toContain("paseo: true");
			expect(result).toContain("kusama: false");
			expect(result).toContain('polkadot: "N/A"');
			expect(result).toContain('feature: "Test Cost"');
			expect(result).toContain("as const");
		});

		it("should handle undefined links", () => {
			const data: ParsedTables = {
				features: [
					{
						feature: "No Link",
						link: undefined,
						paseo: true,
						kusama: true,
						polkadot: true,
					},
				],
				costs: [],
			};

			const result = generateComparisonCode(data);

			expect(result).toContain("link: undefined");
		});

		it("should include sync timestamp comment", () => {
			const data: ParsedTables = { features: [], costs: [] };
			const result = generateComparisonCode(data);

			expect(result).toContain("// Auto-generated comparison data");
			expect(result).toContain("// Last synced:");
			expect(result).toContain(
				"// Source: https://github.com/paseo-network/runtimes",
			);
		});
	});

	describe("validateParsedData", () => {
		it("should pass for valid data", () => {
			const data: ParsedTables = {
				features: [
					{
						feature: "Valid",
						link: undefined,
						paseo: true,
						kusama: true,
						polkadot: true,
					},
				],
				costs: [
					{
						feature: "Valid Cost",
						paseo: "100",
						kusama: "50",
						polkadot: "100",
					},
				],
			};

			expect(() => validateParsedData(data)).not.toThrow();
		});

		it("should throw for empty features", () => {
			const data: ParsedTables = {
				features: [],
				costs: [{ feature: "Cost", paseo: "1", kusama: "1", polkadot: "1" }],
			};

			expect(() => validateParsedData(data)).toThrow(
				"No features found in the Features table",
			);
		});

		it("should throw for empty costs", () => {
			const data: ParsedTables = {
				features: [
					{
						feature: "F",
						link: undefined,
						paseo: true,
						kusama: true,
						polkadot: true,
					},
				],
				costs: [],
			};

			expect(() => validateParsedData(data)).toThrow(
				"No costs found in the Costs table",
			);
		});

		it("should throw for empty feature name", () => {
			const data: ParsedTables = {
				features: [
					{
						feature: "",
						link: undefined,
						paseo: true,
						kusama: true,
						polkadot: true,
					},
				],
				costs: [{ feature: "Cost", paseo: "1", kusama: "1", polkadot: "1" }],
			};

			expect(() => validateParsedData(data)).toThrow(
				"Found feature item with empty feature name",
			);
		});

		it("should throw for empty cost name", () => {
			const data: ParsedTables = {
				features: [
					{
						feature: "Valid",
						link: undefined,
						paseo: true,
						kusama: true,
						polkadot: true,
					},
				],
				costs: [{ feature: "  ", paseo: "1", kusama: "1", polkadot: "1" }],
			};

			expect(() => validateParsedData(data)).toThrow(
				"Found cost item with empty feature name",
			);
		});
	});
});
