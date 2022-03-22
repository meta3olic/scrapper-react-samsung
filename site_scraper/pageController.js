import { scraperObject } from "./pageScraper.js";
import chalk from "chalk";
import fs from "fs";

export async function scraperAll (browserInstance) {
	let browser;

	try {
		// let scrapedData = {};
		browser = await browserInstance;
		let scrapedData = await scraperObject.scraper(browser);

		/**
		 * TODO solve problems with closing the browser
		 */
		// await browser.close();
		console.log(chalk.green('Closing browser ...'));

		fs.writeFile("./data/data.json", JSON.stringify(scrapedData), 'utf8', function(err) {
			if(err) {
				return console.log(chalk.red(err));
			}
			console.log(chalk.green("The data has been scraped and saved successfully! View it at './data/data.json'"));
		});

	} catch (err) {
			console.log(chalk.red("Could not resolve the browser instance ...", err));
	}
}
