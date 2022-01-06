// import assert from "assert";
// import { Builder, By, Capabilities, Key } from "selenium-webdriver";
// import { Given, When, Then, AfterAll } from "@cucumber/cucumber";

import assert from "assert";
import { Builder, By } from "selenium-webdriver";
import { Given, When, Then, AfterAll } from "@cucumber/cucumber";

const driver = new Builder().forBrowser("firefox").build();

Given("I am on the Playground website", async function () {
	await driver.get("http://localhost:3000");
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
	let report = await driver.findElements(By.id("PlaygroundReport-1"));
	if (report.length == 0) {
		console.warn("No reports to test. Skipping...");
		return "pending";
	}
	report = report[0];
	report.click();
});

Then("the report expands and shows actions", async function () {
	let reportContent = await driver.findElement(By.id("PlaygroundReportContent-1"));
	const isExpanded = await reportContent.getAttribute("aria-expanded");
	assert(isExpanded);
});

AfterAll(async function () {
	await driver.quit();
});
