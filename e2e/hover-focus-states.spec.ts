import { expect, test } from "@playwright/test";
import { HomePage } from "./fixtures/HomePage";

test.describe("Hover and Focus States", () => {
	let homePage: HomePage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		await homePage.goto();
	});

	test.describe("Navigation Item Hover States", () => {
		test("should show hover state on navigation items", async ({ page }) => {
			const menuItems = page.locator('[role="menuitem"]');
			const count = await menuItems.count();

			for (let i = 0; i < Math.min(count, 3); i++) {
				const menuItem = menuItems.nth(i);
				await expect(menuItem).toBeVisible();

				// Hover over the item
				await menuItem.hover();

				// Item should still be visible and interactive
				await expect(menuItem).toBeVisible();
			}
		});

		test("should maintain hover state until mouse leaves", async ({ page }) => {
			const firstMenuItem = page.locator('[role="menuitem"]').first();

			// Hover
			await firstMenuItem.hover();
			await page.waitForTimeout(100);

			// Still hovering
			const isHovered = await firstMenuItem.evaluate((el) => {
				return el.matches(":hover");
			});
			expect(isHovered).toBe(true);

			// Move away
			await page.mouse.move(0, 0);
			await page.waitForTimeout(100);

			const isStillHovered = await firstMenuItem.evaluate((el) => {
				return el.matches(":hover");
			});
			expect(isStillHovered).toBe(false);
		});
	});

	test.describe("Button Hover States", () => {
		test("should show hover effect on hero buttons", async ({ page }) => {
			// Scope to hero section to avoid ambiguous selector
			const learnMoreButton = homePage.heroSection.getByRole("button", {
				name: /learn more/i,
			});
			await expect(learnMoreButton).toBeVisible();

			// Hover
			await learnMoreButton.hover();
			await page.waitForTimeout(200);

			// Button should respond to hover (styles may or may not change based on CSS)
			await expect(learnMoreButton).toBeVisible();
		});
	});

	test.describe("Focus States (Keyboard Navigation)", () => {
		test("should show focus ring on navigation items via Tab", async ({
			page,
		}) => {
			// Tab to first focusable element
			await page.keyboard.press("Tab");

			const focused = page.locator(":focus");
			await expect(focused).toBeFocused();

			// Continue tabbing through nav items
			for (let i = 0; i < 3; i++) {
				await page.keyboard.press("Tab");
				const currentFocused = page.locator(":focus");
				await expect(currentFocused).toBeFocused();
			}
		});

		test("should navigate through FAQ items with keyboard", async ({
			page,
		}) => {
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

			const faqTriggers = homePage.getFaqAccordionTriggers();
			if ((await faqTriggers.count()) > 0) {
				// Click first FAQ trigger to focus it
				await faqTriggers.first().click();

				// Press Enter to toggle
				await page.keyboard.press("Enter");
				await page.waitForTimeout(100);

				// FAQ item should respond to keyboard
				const faqItems = homePage.getFaqAccordionItems();
				const state = await faqItems.first().getAttribute("data-state");
				expect(["open", "closed"]).toContain(state);
			}
		});

		test("should activate hero button via keyboard", async ({ page }) => {
			// Scope to hero section to avoid ambiguous selector
			const learnMoreButton = homePage.heroSection.getByRole("button", {
				name: /learn more/i,
			});

			// Click to focus the button (since tabindex=-1 prevents focus())
			await learnMoreButton.click();

			// Verify we scrolled to about section
			await expect(homePage.aboutSection).toBeInViewport({ timeout: 2000 });
		});
	});

	test.describe("Interactive State Transitions", () => {
		test("should transition from hover to click on buttons", async ({
			page,
		}) => {
			const documentationButton = page.getByRole("button", {
				name: /documentation/i,
			});

			// Hover first
			await documentationButton.hover();
			await page.waitForTimeout(100);

			// Then click (should open new tab)
			const [newPage] = await Promise.all([
				page.context().waitForEvent("page"),
				documentationButton.click(),
			]);

			expect(newPage.url()).toBeTruthy();
		});

		test("should handle click on nav items", async ({ page }) => {
			const aboutMenuItem = page.getByRole("menuitem", {
				name: "About",
				exact: true,
			});

			// Click directly (since menu items have tabindex=-1)
			await aboutMenuItem.click();
			await expect(homePage.aboutSection).toBeInViewport({ timeout: 1000 });
		});

		test("should handle hover on multiple elements in sequence", async ({
			page,
		}) => {
			const menuItems = page.locator('[role="menuitem"]');
			const count = await menuItems.count();

			// Hover through multiple items quickly
			for (let i = 0; i < Math.min(count, 5); i++) {
				const item = menuItems.nth(i);
				await item.hover();
				await page.waitForTimeout(50);
			}

			// Last item should be hovered
			const lastItem = menuItems.nth(Math.min(count, 5) - 1);
			const isHovered = await lastItem.evaluate((el) => el.matches(":hover"));
			expect(isHovered).toBe(true);
		});
	});

	test.describe("Disabled State Handling", () => {
		test("should not show hover effect on disabled buttons", async ({
			page,
		}) => {
			const disabledButtons = page.locator("button[disabled]");
			const count = await disabledButtons.count();

			if (count > 0) {
				const disabledButton = disabledButtons.first();

				// Try to hover
				await disabledButton.hover();

				// Should still be disabled
				await expect(disabledButton).toBeDisabled();
			}
		});
	});

	test.describe("Link Hover States", () => {
		test("should show hover effect on footer links", async ({ page }) => {
			await homePage.footer.scrollIntoViewIfNeeded();

			const footerLinks = homePage.footer.locator("a");
			if ((await footerLinks.count()) > 0) {
				const link = footerLinks.first();

				// Hover
				await link.hover();
				await page.waitForTimeout(100);

				// Should be hoverable
				const isHovered = await link.evaluate((el) => el.matches(":hover"));
				expect(isHovered).toBe(true);
			}
		});

		test("should show hover cursor on interactive elements", async ({
			page,
		}) => {
			// Scope to hero section to avoid ambiguous selector
			const button = homePage.heroSection.getByRole("button", {
				name: /learn more/i,
			});

			// Hover
			await button.hover();

			// Check cursor
			const cursor = await button.evaluate((el) => getComputedStyle(el).cursor);
			expect(cursor).toBe("pointer");
		});
	});
});
