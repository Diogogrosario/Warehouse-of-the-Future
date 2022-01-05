// import assert from "assert";
// import { Builder, By, Capabilities, Key } from "selenium-webdriver";
// import { Given, When, Then, AfterAll } from "@cucumber/cucumber";

const assert = require('assert');
const { Builder, By, Capabilities, Key } = require("selenium-webdriver");
const { Given, When, Then, AfterAll } = require('@cucumber/cucumber');

const driver = new Builder().forBrowser("firefox").build();

Given("I am on the Playground website", async function () {
	await driver.get("http://localhost:3000");
});

When("I click the {string} button", async function (id) {
	const element = await driver.findElement(By.id(id));
	element.click();
});

Then("the {string} view is fullscreen", async function (panel) {
	const otherPanel = await driver.findElements(By.id(panel + "-panel"));
	assert(otherPanel.length == 0);
});

AfterAll(async function () {
	await driver.quit();
});
