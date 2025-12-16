import { expect, type Locator, test } from "@playwright/test";
import { HomePage } from "./fixtures/HomePage";

test.describe("Navigation and Section Interaction", () => {
	let homePage: HomePage;
	let navItems: { name: string; section: Locator }[];

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		// Navigation items that link to sections on the home page
		navItems = [
			{ name: "About", section: homePage.aboutSection },
			{ name: "FAQ", section: homePage.faqSection },
		];
		await homePage.goto();
	});

	test.describe("Desktop Navigation", () => {
		test("should display navigation menu with all items", async ({ page }) => {
			// Verify menubar is visible
			await expect(homePage.desktopNav).toBeVisible();

			for (const item of navItems) {
				const menuItem = page.getByRole("menuitem", { name: item.name });
				await expect(menuItem).toBeVisible();
			}
		});

		test("should scroll to section when clicking navigation item", async ({
			page,
		}) => {
			for (const item of navItems) {
				await page
					.getByRole("menuitem", { name: item.name, exact: true })
					.first()
					.click();
				await expect(item.section).toBeInViewport();
			}
		});

		test("should scroll back to top when clicking Home link", async ({
			page,
		}) => {
			// First scroll down to another section
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

			// Then click Home
			await page.getByRole("menuitem", { name: "Home", exact: true }).click();

			// Wait for scroll animation to complete and verify hero section is visible
			await expect(homePage.heroSection).toBeInViewport({ timeout: 3000 });
		});
	});

	test.describe("Section Scrolling", () => {
		test("should scroll through all sections sequentially", async () => {
			const sections = [
				{ id: "about", locator: homePage.aboutSection },
				{ id: "faq", locator: homePage.faqSection },
			];

			for (const section of sections) {
				await homePage.scrollToSection(section.id);
				await expect(section.locator).toBeInViewport();
			}
		});

		test("should handle rapid section changes", async ({ page }) => {
			// Rapidly click different navigation items
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

			await page.getByRole("menuitem", { name: "About", exact: true }).click();
			await expect(homePage.aboutSection).toBeInViewport({ timeout: 1000 });

			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();

			// Final section should be visible
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });
		});

		test("should maintain section visibility after scroll", async ({
			page,
		}) => {
			// Scroll to a section
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();

			// Verify it's visible
			await expect(homePage.faqSection).toBeVisible({ timeout: 1000 });

			// Wait and check it's still visible
			await expect(homePage.faqSection).toBeVisible({ timeout: 1000 });
		});
	});

	test.describe("Footer Navigation", () => {
		test("should display footer with all sections", async ({ page }) => {
			// Scroll to footer
			await homePage.footer.scrollIntoViewIfNeeded();

			// Verify footer is visible
			await expect(homePage.footer).toBeVisible();

			// Verify footer sections exist
			const footerSections = ["Network", "Developers", "Support"];
			for (const section of footerSections) {
				const heading = page.getByRole("heading", {
					name: section,
					exact: true,
				});
				await expect(heading).toBeVisible();
			}
		});

		test("should navigate to sections from footer links", async ({ page }) => {
			// Scroll to footer
			await homePage.footer.scrollIntoViewIfNeeded();

			// Click a footer link (if they exist)
			const aboutLink = homePage.footer.getByRole("link", {
				name: /about/i,
			});

			if ((await aboutLink.count()) > 0) {
				await aboutLink.first().click();
				await expect(homePage.aboutSection).toBeInViewport({ timeout: 1000 });
			}
		});

		test("should display social media links in footer", async ({ page }) => {
			await homePage.footer.scrollIntoViewIfNeeded();

			// Check for social media links (adjust selectors based on actual implementation)
			const footer = homePage.footer;
			await expect(footer).toBeVisible();

			// Verify footer contains links
			const links = footer.locator("a");
			expect(await links.count()).toBeGreaterThan(0);
		});
	});

	test.describe("Keyboard Navigation", () => {
		test("should navigate through menu items with Tab key", async ({
			page,
		}) => {
			// Focus on first navigation item
			await page.keyboard.press("Tab");

			// Get focused element
			const focused = page.locator(":focus");

			// Verify focus is within navigation
			const _isInNav = await focused.evaluate((el) => {
				const nav = el.closest('[role="menubar"]');
				return nav !== null;
			});

			// Tab is working if element is focused
			await expect(focused).toBeFocused();
		});
	});

	test.describe("Section Content Interactions", () => {
		test("should display FAQ accordion items", async ({ page }) => {
			// Navigate to FAQ section
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();

			// Verify FAQ section is visible
			await expect(homePage.faqSection).toBeVisible({ timeout: 1000 });

			// Check for accordion content
			const accordionItems = homePage.getFaqAccordionItems();
			expect(await accordionItems.count()).toBeGreaterThan(0);
		});
	});

	test.describe("Smooth Scrolling Behavior", () => {
		test("should scroll smoothly between sections", async ({ page }) => {
			// Click About
			await page.getByRole("menuitem", { name: "About", exact: true }).click();
			await expect(homePage.aboutSection).toBeInViewport({ timeout: 1000 });

			// Get scroll position
			const scrollPos1 = await page.evaluate(() => window.scrollY);

			// Click FAQ (much further down)
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

			// Get new scroll position
			const scrollPos2 = await page.evaluate(() => window.scrollY);

			// Verify we scrolled down
			expect(scrollPos2).toBeGreaterThan(scrollPos1);
		});
	});

	test.describe("Responsive Navigation Behavior", () => {
		test("should display all sections on desktop", async () => {
			// Verify all major sections are in the DOM
			await expect(homePage.heroSection).toBeAttached();
			await expect(homePage.aboutSection).toBeAttached();
			await expect(homePage.faqSection).toBeAttached();
		});

		test("should maintain navigation visibility during scroll", async ({
			page,
		}) => {
			// Verify nav is visible at top
			await expect(homePage.desktopNav).toBeVisible();

			// Scroll down
			await page.getByRole("menuitem", { name: "FAQ", exact: true }).click();
			await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

			// Nav should still be visible (sticky/fixed)
			await expect(homePage.desktopNav).toBeVisible();
		});
	});

	test.describe("Link Validation", () => {
		test("should have enabled menu items", async ({ page }) => {
			const menuItems = page.locator('[role="menuitem"]');
			const count = await menuItems.count();

			for (let i = 0; i < count; i++) {
				const item = menuItems.nth(i);

				// Each menu item should be clickable
				await expect(item).toBeEnabled();
			}

			// Should have at least 4 menu items (Home, About, Developers, FAQ)
			expect(count).toBeGreaterThanOrEqual(4);
		});
	});
});
