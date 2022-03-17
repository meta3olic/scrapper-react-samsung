import puppeteer from "puppeteer";


export default class Main {

	site_point = 'https://www.mvideo.ru/';

	user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36';
	launch_puppeteer_opts = {
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

	async init (path, callback) {
		const url = `${this.site_point}${path}`;

		const browser = await puppeteer.launch(this.launch_puppeteer_opts);
		const page = await browser.newPage();

		await page.setUserAgent(this.user_agent);
		await page.setViewport({width: 1600, height: 900});

		await page.goto(url);

		/**
		 * waitFor is deprecated and will be removed in a future release.
		 * @waitForSelector
		 * @waitForFunction
		 * @waitForXPath
		 */

			// await page.waitFor(5000);

		const result = await page.evaluate( callback );

		await browser.close();

		return result;
	}
}
