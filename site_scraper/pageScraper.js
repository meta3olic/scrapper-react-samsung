import chalk from "chalk";

export const scraperObject = {
	url: 'https://www.mvideo.ru/',
	async scraper ( browser ) {
		let page = await browser.newPage();
		console.log(chalk.green(`Navigating to ${this.url}`));
		await page.goto(this.url);
	}
}