import puppeteer from "puppeteer";
import chalk from "chalk";

const launch_puppeteer_opts = {
	headless: true,
	args: [
		// 	// '--proxy-server=78.36.196.79:4002',
		'--no-sandbox',
		'--disable-setuid-sandbox',
		'--disable-dev-shm-usage',
		'--single-process',
		'--disable-accelerated-2d-canvas',
		'--disable-gpu',
		'--window-size=1920x3000',
	]
};


async function startBrowser () {
	let browser;
	try {
		console.log(chalk.green('Opening the browser ...'));
		browser = await puppeteer.launch(launch_puppeteer_opts);
	} catch (err) {
		console.log(chalk.red('Could not create a browser instance :: ' + err));
	}

	return browser;
}

export const browserObject = {
	startBrowser
}