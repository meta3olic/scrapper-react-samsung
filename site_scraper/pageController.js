import { scraperObject } from "./pageScraper.js";
import chalk from "chalk";

export async function scraperAll (browserInstance) {
	let browser;

	try {
		browser = await browserInstance;
		await scraperObject.scraper(browser);
	} catch (err) {
			console.log(chalk.red("Could not resolve the browser instance ...", err));
	}
}
