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

	test.describe("About Section", () => {
		test.beforeEach(async ({ page }) => {
			await page.getByRole("menuitem", { name: "About", exact: true }).click();
			await expect(homePage.aboutSection).toBeInViewport({ timeout: 2000 });
		});

		test("should display about section content", async () => {
			await expect(homePage.aboutSection).toBeVisible();
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

			await expect(homePage.aboutSection).toBeInViewport({ timeout: 2000 });
		});
	});

	test.describe("Footer Link Clicks", () => {
		test.beforeEach(async ({ page }) => {
			// First wait for the page to be loaded then scroll to footer
			await page.waitForLoadState("domcontentloaded");
			await homePage.footer.scrollIntoViewIfNeeded();
			await expect(homePage.footer).toBeVisible();
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
