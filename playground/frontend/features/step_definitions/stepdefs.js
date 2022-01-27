import assert from "assert";
import { Builder, By } from "selenium-webdriver";
import { Given, When, Then, AfterAll } from "@cucumber/cucumber";

const driver = new Builder().forBrowser("firefox").build();

Given("I am on the Playground website", async function () {
	await driver.get("http://localhost:3000");
	const element = await driver.findElement(By.id("app-tab-0"));
	await element.click();
});

// Fullscreen
When("I click the {string} button", async function (id) {
	const element = await driver.findElement(By.id(id));
	element.click();
});

Then("the {string} view is collapsed", async function (panel) {
	const otherPanel = await driver.findElements(By.id(panel + "-panel"));
	assert(otherPanel.length == 0);
});

// Report expand
When("I click a report", async function () {
	let report = await driver.findElements(By.id("playground-report-1"));
	if (report.length == 0) {
		console.warn("No reports to test. Skipping...");
		return "pending";
	}
	report = report[0];
	report.click();
});

Then("the report expands and shows actions", async function () {
	let reportContent = await driver.findElement(By.id("playground-report-1"));
	const isExpanded = await reportContent.getAttribute("aria-expanded");
	assert(isExpanded);
});

When("I click the Simulation Tab", async function () {
	const element = await driver.findElement(By.id("app-tab-1"));
	element.click();
});

Then("the current tab is set to Simulation", async function () {
	let header = await driver.findElements(By.id("mesh-communication-header"));
	assert(header.length == 1);
});

AfterAll(async function () {
	await driver.quit();
});
