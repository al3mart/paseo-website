import { expect, test } from "@playwright/test";
import { HomePage } from "./fixtures/HomePage";

test.describe("Section Content Visibility", () => {
	let homePage: HomePage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		await homePage.goto();
	});

	test("should display hero section with content", async () => {
		const heroSection = homePage.heroSection;
		await expect(heroSection).toBeVisible();

		// Verify hero has content
		const text = await heroSection.textContent();
		expect(text?.length).toBeGreaterThan(0);
	});

	test("should display about section with content", async ({ page }) => {
		// Navigate to About
		const aboutMenuItem = await page
			.getByRole("menuitem", { name: "About", exact: true })
			.first();
		await aboutMenuItem.click();
		await expect(homePage.aboutSection).toBeInViewport({ timeout: 1000 });

		const aboutSection = homePage.aboutSection;
		await expect(aboutSection).toBeVisible();

		// Verify about has content
		const text = await aboutSection.textContent();
		expect(text?.length).toBeGreaterThan(0);
	});

	test("should display faq section with content", async ({ page }) => {
		// Navigate to FAQ
		const faqMenuItem = await page
			.getByRole("menuitem", { name: "FAQ", exact: true })
			.first();
		await faqMenuItem.click();
		await expect(homePage.faqSection).toBeInViewport({ timeout: 1000 });

		const faqSection = homePage.faqSection;
		await expect(faqSection).toBeVisible();

		// Verify faq has content
		const text = await faqSection.textContent();
		expect(text?.length).toBeGreaterThan(0);
	});
});
