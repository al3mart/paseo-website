import { expect, test } from "@playwright/test";
import { HomePage } from "./fixtures/HomePage";

test.describe("FAQ Accordion Interactions", () => {
	let homePage: HomePage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		await homePage.goto();

		// Navigate to FAQ section first
		await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
		await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });
	});

	test("should expand FAQ item when clicked", async () => {
		const faqItems = homePage.getFaqAccordionItems();
		const faqTriggers = homePage.getFaqAccordionTriggers();
		const itemCount = await faqItems.count();

		if (itemCount > 0) {
			const firstItem = faqItems.first();
			const firstTrigger = faqTriggers.first();
			const initialState = await firstItem.getAttribute("data-state");

			// Click trigger to expand
			await firstTrigger.click();

			// Should be open
			const newState = await firstItem.getAttribute("data-state", {
				timeout: 1000,
			});
			expect(newState).toBe("open");
			expect(newState).not.toBe(initialState);
		}
	});

	test("should collapse FAQ item when clicked twice", async () => {
		const faqItems = homePage.getFaqAccordionItems();
		const faqTriggers = homePage.getFaqAccordionTriggers();
		const itemCount = await faqItems.count();

		if (itemCount > 0) {
			const firstItem = faqItems.first();
			const firstTrigger = faqTriggers.first();

			// Click trigger to expand
			await firstTrigger.click();
			await expect(firstItem).toHaveAttribute("data-state", "open");

			// Click trigger again to collapse
			await firstTrigger.click();
			await expect(firstItem).toHaveAttribute("data-state", "closed");
		}
	});

	test("should close first item when opening second (single mode)", async () => {
		const faqItems = homePage.getFaqAccordionItems();
		const faqTriggers = homePage.getFaqAccordionTriggers();
		const itemCount = await faqItems.count();

		if (itemCount >= 2) {
			// Expand first item
			await faqTriggers.nth(0).click();
			await expect(faqItems.nth(0)).toHaveAttribute("data-state", "open");

			// Expand second item
			await faqTriggers.nth(1).click();
			await expect(faqItems.nth(1)).toHaveAttribute("data-state", "open");

			// First item should now be closed (single mode accordion)
			await expect(faqItems.nth(0)).toHaveAttribute("data-state", "closed");
		}
	});

	test("should display FAQ content when expanded", async ({ page }) => {
		const faqItems = homePage.getFaqAccordionItems();
		const faqTriggers = homePage.getFaqAccordionTriggers();
		const itemCount = await faqItems.count();

		if (itemCount > 0) {
			const firstTrigger = faqTriggers.first();

			// Click trigger to expand
			await firstTrigger.click();
			await page.waitForTimeout(300);

			// Find content area (typically sibling or child with data-state)
			const content = page
				.locator('[data-state="open"]')
				.locator('div[role="region"]')
				.first();

			// Content should be visible
			if ((await content.count()) > 0) {
				await expect(content).toBeVisible();
				const text = await content.textContent();
				expect(text).toBeTruthy();
				expect(text?.length).toBeGreaterThan(0);
			}
		}
	});

	test("should handle rapid FAQ accordion clicks", async ({ page }) => {
		const faqItems = homePage.getFaqAccordionItems();
		const faqTriggers = homePage.getFaqAccordionTriggers();
		const itemCount = await faqItems.count();

		if (itemCount >= 2) {
			// Rapidly click multiple triggers
			await faqTriggers.nth(0).click();
			await page.waitForTimeout(50);

			await faqTriggers.nth(1).click();
			await page.waitForTimeout(50);

			await faqTriggers.nth(0).click();
			await page.waitForTimeout(300);

			// Should not crash and items should be in valid states
			const state0 = await faqItems.nth(0).getAttribute("data-state");
			const state1 = await faqItems.nth(1).getAttribute("data-state");

			expect(["open", "closed"]).toContain(state0);
			expect(["open", "closed"]).toContain(state1);
		}
	});

	test("should support keyboard navigation through FAQ", async ({ page }) => {
		const faqItems = homePage.getFaqAccordionItems();
		const faqTriggers = homePage.getFaqAccordionTriggers();
		const itemCount = await faqItems.count();

		if (itemCount > 0) {
			const firstItem = faqItems.first();
			const firstTrigger = faqTriggers.first();

			// Focus on first FAQ trigger (the button)
			await firstTrigger.focus();
			await expect(firstTrigger).toBeFocused();

			// Press Enter to expand
			await page.keyboard.press("Enter");
			await page.waitForTimeout(300);

			// Should be expanded
			const state = await firstItem.getAttribute("data-state");
			expect(state).toBe("open");
		}
	});

	test("should maintain scroll position when interacting with FAQ", async ({
		page,
	}) => {
		// Get scroll position
		const initialScroll = await page.evaluate(() => window.scrollY);

		const faqTriggers = homePage.getFaqAccordionTriggers();
		if ((await faqTriggers.count()) > 0) {
			// Expand an item by clicking trigger
			await faqTriggers.first().click();
			await page.waitForTimeout(300);

			// Scroll position should not drastically change
			const newScroll = await page.evaluate(() => window.scrollY);
			const scrollDiff = Math.abs(newScroll - initialScroll);

			// Allow some movement for content expansion, but not major jumps
			expect(scrollDiff).toBeLessThan(500);
		}
	});
});
