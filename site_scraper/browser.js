import puppeteer from "puppeteer";
import chalk from "chalk";

const user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36';
const launch_puppeteer_opts = {
	headless: true,
	args: [
		// 	// '--proxy-server=78.36.196.79:4002',
		'--no-sandbox',
		'--disable-setuid-sandbox',
		'--disable-dev-shm-usage',
		'--disable-accelerated-2d-canvas',
		'--disable-gpu',
		'--window-size=1920x1080',
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