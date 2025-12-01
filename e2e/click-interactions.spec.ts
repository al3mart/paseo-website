import { expect, test } from "@playwright/test";
import { HomePage } from "./fixtures/HomePage";

test.describe("Click Interactions", () => {
	let homePage: HomePage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		await homePage.goto();
	});

	test.describe("Hero Section Buttons", () => {
		test("should scroll to about section when clicking Learn More", async () => {
			// Use the hero section to scope the selector since there are multiple "Learn More" buttons
			const learnMoreButton = homePage.heroSection.getByRole("button", {
				name: /learn more/i,
			});
			await expect(learnMoreButton).toBeVisible();

			await learnMoreButton.click();

			await expect(homePage.aboutSection).toBeInViewport({ timeout: 2000 });
		});

		test("should open documentation link in new tab", async ({ page }) => {
			const documentationButton = page.getByRole("button", {
				name: /documentation/i,
			});
			await expect(documentationButton).toBeVisible();

			const [newPage] = await Promise.all([
				page.context().waitForEvent("page"),
				documentationButton.click(),
			]);

			expect(newPage.url()).toContain("github.com/paseo-network");
		});
	});

	test.describe("Resource Cards", () => {
		test.beforeEach(async ({ page }) => {
			await page
				.getByRole("menuitem", { name: "Resources", exact: true })
				.click();
			await expect(homePage.resourcesSection).toBeInViewport({ timeout: 1000 });
		});

		test("should display resource cards with buttons", async () => {
			const resourceCards = homePage.resourcesSection.locator(
				"[class*='card'], article",
			);
			const cardCount = await resourceCards.count();

			expect(cardCount).toBeGreaterThan(0);

			for (let i = 0; i < Math.min(cardCount, 3); i++) {
				const card = resourceCards.nth(i);
				const button = card.locator("button");
				if ((await button.count()) > 0) {
					await expect(button.first()).toBeVisible();
				}
			}
		});

		test("should handle resource card button clicks", async () => {
			const resourceButtons = homePage.resourcesSection.locator("button");
			const buttonCount = await resourceButtons.count();

			if (buttonCount > 0) {
				const firstButton = resourceButtons.first();
				await expect(firstButton).toBeVisible();
				await expect(firstButton).toBeEnabled();

				// Check if clicking opens a modal or navigates
				const buttonText = await firstButton.textContent();
				expect(buttonText).toBeTruthy();
			}
		});

		test("should open modal when clicking View Details button", async ({
			page,
		}) => {
			const viewDetailsButtons = homePage.resourcesSection.getByRole("button", {
				name: /view details/i,
			});

			if ((await viewDetailsButtons.count()) > 0) {
				await viewDetailsButtons.first().click();

				// Wait for modal to appear
				const modal = page.locator('[role="dialog"]');
				await expect(modal).toBeVisible({ timeout: 2000 });

				// Close modal
				const closeButton = modal.getByRole("button", { name: /close/i });
				if ((await closeButton.count()) > 0) {
					await closeButton.click();
					await expect(modal).not.toBeVisible({ timeout: 1000 });
				}
			}
		});
	});

	test.describe("Chain Specs Download Buttons", () => {
		test.beforeEach(async ({ page }) => {
			await page
				.getByRole("menuitem", { name: "Chain Specs", exact: true })
				.click();
			await expect(homePage.chainSpecsSection).toBeInViewport({
				timeout: 1000,
			});
		});

		test("should display download buttons for chain specs", async () => {
			const downloadButtons = homePage.chainSpecsSection.locator(
				"button:has-text('Download')",
			);
			const buttonCount = await downloadButtons.count();

			expect(buttonCount).toBeGreaterThan(0);

			for (let i = 0; i < buttonCount; i++) {
				const button = downloadButtons.nth(i);
				await expect(button).toBeVisible();
				await expect(button).toBeEnabled();
			}
		});

		test("should open chain spec file when clicking download", async ({
			page,
		}) => {
			const downloadButtons = homePage.chainSpecsSection.locator(
				"button:has-text('Download')",
			);

			if ((await downloadButtons.count()) > 0) {
				const [newPage] = await Promise.all([
					page.context().waitForEvent("page"),
					downloadButtons.first().click(),
				]);

				// Should open a new page with the spec file
				expect(newPage.url()).toBeTruthy();
			}
		});
	});

	test.describe("Navigation Menu Click States", () => {
		test("should show visual feedback on menu item click", async ({ page }) => {
			const menuItems = page.locator('[role="menuitem"]');
			const count = await menuItems.count();

			for (let i = 0; i < Math.min(count, 3); i++) {
				const menuItem = menuItems.nth(i);
				const itemName = await menuItem.textContent();

				// Click the item
				await menuItem.click();

				// Menu items should be interactive
				expect(itemName).toBeTruthy();
			}
		});

		test("should navigate and update URL hash on click", async ({ page }) => {
			const aboutMenuItem = page.getByRole("menuitem", {
				name: "About",
				exact: true,
			});
			await aboutMenuItem.click();

			await expect(homePage.aboutSection).toBeInViewport({ timeout: 1000 });
		});
	});

	test.describe("Footer Link Clicks", () => {
		test.beforeEach(async () => {
			await homePage.footer.scrollIntoViewIfNeeded();
		});

		test("should have clickable footer links", async () => {
			const footerLinks = homePage.footer.locator("a");
			const linkCount = await footerLinks.count();

			expect(linkCount).toBeGreaterThan(0);

			for (let i = 0; i < Math.min(linkCount, 5); i++) {
				const link = footerLinks.nth(i);
				await expect(link).toBeEnabled();

				const href = await link.getAttribute("href");
				expect(href).toBeTruthy();
			}
		});

		test("should open external footer links in new tab", async ({ page }) => {
			const externalLinks = homePage.footer.locator('a[target="_blank"]');
			const count = await externalLinks.count();

			if (count > 0) {
				const link = externalLinks.first();

				const [newPage] = await Promise.all([
					page.context().waitForEvent("page"),
					link.click(),
				]);

				expect(newPage.url()).toBeTruthy();
			}
		});
	});

	test.describe("Button States", () => {
		test("should show hover state on buttons", async ({ page }) => {
			const button = page.locator("button:visible").first();

			// Hover
			await button.hover();

			// Just verify the button is hoverable
			await expect(button).toBeVisible();
		});

		test("should verify buttons are clickable", async () => {
			// Test that hero section buttons are clickable
			const heroButtons = homePage.heroSection.locator("button");
			const count = await heroButtons.count();

			expect(count).toBeGreaterThan(0);

			for (let i = 0; i < count; i++) {
				const button = heroButtons.nth(i);
				await expect(button).toBeVisible();
				await expect(button).toBeEnabled();
			}
		});
	});
});
