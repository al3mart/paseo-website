import { expect, test } from "@playwright/test";
import { HomePage } from "./fixtures/HomePage";

test.describe("Section Navigation Flow", () => {
	let homePage: HomePage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		await homePage.goto();
	});

	test.describe("Sequential Section Navigation", () => {
		test("should navigate from hero to about to resources in order", async ({
			page,
		}) => {
			// Start at hero
			await expect(homePage.heroSection).toBeInViewport();

			// Navigate to About
			await page.getByRole("menuitem", { name: "About", exact: true }).click();
			await expect(homePage.aboutSection).toBeInViewport({ timeout: 1000 });

			// Navigate to Resources
			await page
				.getByRole("menuitem", { name: "Resources", exact: true })
				.click();
			await expect(homePage.resourcesSection).toBeInViewport({ timeout: 1000 });
		});

		test("should navigate through all sections in sequence", async ({
			page,
		}) => {
			const navigationSequence = [
				{ name: "About", section: homePage.aboutSection },
				{ name: "Resources", section: homePage.resourcesSection },
				{ name: "Features", section: homePage.featuresSection },
				{ name: "Comparison", section: homePage.comparisonSection },
				{ name: "Chain Specs", section: homePage.chainSpecsSection },
				{ name: "FAQ", section: homePage.faqSection },
			];

			for (const nav of navigationSequence) {
				await page
					.getByRole("menuitem", { name: nav.name, exact: true })
					.first()
					.click();
				await expect(nav.section).toBeInViewport({ timeout: 1000 });
			}
		});

		test("should navigate in reverse order from FAQ to Hero", async ({
			page,
		}) => {
			// Start at FAQ
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

			// Navigate backwards
			await page
				.getByRole("menuitem", { name: "Chain Specs", exact: true })
				.click();
			await expect(homePage.chainSpecsSection).toBeInViewport({
				timeout: 1000,
			});

			await page
				.getByRole("menuitem", { name: "Comparison", exact: true })
				.click();
			await expect(homePage.comparisonSection).toBeInViewport({
				timeout: 1000,
			});

			await page
				.getByRole("menuitem", { name: "Features", exact: true })
				.first()
				.click();
			await expect(homePage.featuresSection).toBeInViewport({ timeout: 1000 });

			await page
				.getByRole("menuitem", { name: "Resources", exact: true })
				.click();
			await expect(homePage.resourcesSection).toBeInViewport({ timeout: 1000 });

			await page.getByRole("menuitem", { name: "About", exact: true }).click();
			await expect(homePage.aboutSection).toBeInViewport({ timeout: 1000 });

			await page.getByRole("menuitem", { name: "Home", exact: true }).click();
			await expect(homePage.heroSection).toBeInViewport({ timeout: 1000 });
		});
	});

	test.describe("Jump Navigation", () => {
		test("should jump from first to last section", async ({ page }) => {
			// Start at hero
			await expect(homePage.heroSection).toBeInViewport();

			// Jump directly to FAQ (last section)
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

			// Verify we scrolled significantly
			const scrollY = await page.evaluate(() => window.scrollY);
			expect(scrollY).toBeGreaterThan(500);
		});

		test("should jump from last to first section", async ({ page }) => {
			// Go to FAQ first
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

			// Jump back to Home
			await page.getByRole("menuitem", { name: "Home", exact: true }).click();
			await expect(homePage.heroSection).toBeInViewport({ timeout: 1000 });

			// Verify we scrolled back near top
			const scrollY = await page.evaluate(() => window.scrollY);
			expect(scrollY).toBeLessThan(200);
		});

		test("should jump to middle section from top and bottom", async ({
			page,
		}) => {
			// Jump to Features from top
			await page
				.getByRole("menuitem", { name: "Features", exact: true })
				.first()
				.click();
			await expect(homePage.featuresSection).toBeInViewport({ timeout: 1000 });

			const scrollFromTop = await page.evaluate(() => window.scrollY);

			// Go to FAQ
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

			// Jump back to Features
			await page
				.getByRole("menuitem", { name: "Features", exact: true })
				.first()
				.click();
			await expect(homePage.featuresSection).toBeInViewport({ timeout: 1000 });

			const scrollFromBottom = await page.evaluate(() => window.scrollY);

			// Scroll positions should be similar when viewing the same section
			expect(Math.abs(scrollFromTop - scrollFromBottom)).toBeLessThan(100);
		});
	});

	test.describe("Navigation Persistence", () => {
		test("should maintain section position after navigation", async ({
			page,
		}) => {
			// Navigate to Comparison
			await page
				.getByRole("menuitem", { name: "Comparison", exact: true })
				.click();
			await expect(homePage.comparisonSection).toBeInViewport({
				timeout: 1000,
			});

			// Get initial position
			const initialScroll = await page.evaluate(() => window.scrollY);

			// Click somewhere in the section (not a link)
			await homePage.comparisonSection.click({ position: { x: 100, y: 100 } });

			// Position should remain stable
			const afterClickScroll = await page.evaluate(() => window.scrollY);
			expect(Math.abs(initialScroll - afterClickScroll)).toBeLessThan(50);
		});

		test("should keep nav visible after scrolling to any section", async ({
			page,
		}) => {
			const sections = [
				"About",
				"Resources",
				"Features",
				"Comparison",
				"Chain Specs",
				"FAQ",
			];

			for (const section of sections) {
				await page
					.getByRole("menuitem", { name: section, exact: true })
					.first()
					.click();
				await page.waitForTimeout(500);

				// Nav should always be visible (sticky/fixed)
				await expect(homePage.desktopNav).toBeVisible();
			}
		});
	});

	test.describe("Scroll-Based Section Detection", () => {
		test("should scroll through page and track position", async ({ page }) => {
			const positions: number[] = [];

			// Navigate to each section and record scroll position
			const sections = [
				{ name: "About", section: homePage.aboutSection },
				{ name: "Features", section: homePage.featuresSection },
				{ name: "FAQ", section: homePage.faqSection },
			];

			for (const nav of sections) {
				await page
					.getByRole("menuitem", { name: nav.name, exact: true })
					.first()
					.click();
				await expect(nav.section).toBeInViewport({ timeout: 1000 });

				const scrollY = await page.evaluate(() => window.scrollY);
				positions.push(scrollY);
			}

			// Verify sections are in order (increasing scroll positions)
			for (let i = 1; i < positions.length; i++) {
				expect(positions[i]).toBeGreaterThan(positions[i - 1]);
			}
		});

		test("should handle manual scroll between clicks", async ({ page }) => {
			// Navigate to About
			await page.getByRole("menuitem", { name: "About", exact: true }).click();
			await expect(homePage.aboutSection).toBeInViewport({ timeout: 1000 });

			// Manually scroll down a bit
			await page.evaluate(() => window.scrollBy(0, 200));
			await page.waitForTimeout(100);

			// Navigate to FAQ
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

			// Should successfully navigate despite manual scroll
			const isFaqVisible = await homePage.faqSection.isVisible();
			expect(isFaqVisible).toBe(true);
		});
	});

	test.describe("Section Boundary Testing", () => {
		test("should handle rapid back and forth navigation", async ({ page }) => {
			// Rapidly switch between two sections
			for (let i = 0; i < 3; i++) {
				await page
					.getByRole("menuitem", { name: "About", exact: true })
					.click();
				await page.waitForTimeout(200);

				await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
				await page.waitForTimeout(200);
			}

			// Final state should be at FAQ
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });
		});

		test("should handle clicking same section multiple times", async ({
			page,
		}) => {
			const aboutMenuItem = page.getByRole("menuitem", {
				name: "About",
				exact: true,
			});

			// Click About multiple times with waits for scroll animation to complete
			await aboutMenuItem.click();
			await expect(homePage.aboutSection).toBeInViewport({ timeout: 1000 });
			await page.waitForTimeout(500); // Wait for scroll animation to settle

			const scroll1 = await page.evaluate(() => window.scrollY);

			await aboutMenuItem.click();
			await page.waitForTimeout(500); // Wait for scroll animation to settle
			const scroll2 = await page.evaluate(() => window.scrollY);

			await aboutMenuItem.click();
			await page.waitForTimeout(500); // Wait for scroll animation to settle
			const scroll3 = await page.evaluate(() => window.scrollY);

			// Scroll position should remain relatively stable (allow for scroll adjustments due to animations)
			expect(Math.abs(scroll1 - scroll2)).toBeLessThan(200);
			expect(Math.abs(scroll2 - scroll3)).toBeLessThan(200);
		});
	});

	test.describe("Cross-Section Interactions", () => {
		test("should navigate to section and interact with content", async ({
			page,
		}) => {
			// Navigate to FAQ
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

			// Interact with FAQ accordion
			const faqTriggers = homePage.getFaqAccordionTriggers();
			if ((await faqTriggers.count()) > 0) {
				await faqTriggers.first().click();

				// Should be able to expand FAQ item after navigation
				const faqItems = homePage.getFaqAccordionItems();
				const state = await faqItems.first().getAttribute("data-state");
				expect(state).toBe("open");
			}
		});

		test("should navigate away from section while interacting", async ({
			page,
		}) => {
			// Navigate to FAQ and expand an item
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

			const faqTriggers = homePage.getFaqAccordionTriggers();
			if ((await faqTriggers.count()) > 0) {
				await faqTriggers.first().click();
			}

			// Navigate to another section
			await page.getByRole("menuitem", { name: "About", exact: true }).click();
			await expect(homePage.aboutSection).toBeInViewport({ timeout: 1000 });

			// Return to FAQ - state may or may not be preserved
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });
		});
	});
});
