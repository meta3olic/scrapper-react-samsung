import chalk from "chalk";

const user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36';

export const scraperObject = {
	url: 'https://www.mvideo.ru/brand/samsung-13/f/page=1?categoryId=10',
	async scraper ( browser ) {
		let page = await browser.newPage();
		console.log(chalk.green(`Navigating to ${this.url}`));
		await page.setUserAgent(user_agent);
		await page.setViewport({width: 1920, height: 3000});
		await page.setDefaultNavigationTimeout(0);

		await page.goto(this.url);

		// Create the screenshot for test
		// await page.screenshot({
		// 	path: 'test.png',
		// 	fullPage: true
		// });
		// console.log(chalk.green('Save screenshot ...'));

		// Get the link to all the required smartphones

		let urls = await page.$$eval('div.c-pagination a.c-pagination__num', nodes => {
			let mask = 'https://www.mvideo.ru/brand/samsung-13/f/page=#MASK#?categoryId=10';

			let count = Number(nodes[nodes.length - 1].textContent);

			return Array.from(new Array(count),(val,index)=>index + 1)
				.map(num => mask.replace('#MASK#', num));
		});

		let pagePromise = (link) => new Promise (async (resolve, reject) => {
			let newPage = await browser.newPage();
			await newPage.setUserAgent(user_agent);
			await newPage.setViewport({width: 1920, height: 3000});
			await newPage.setDefaultNavigationTimeout(0);

			console.log(chalk.green(`Navigating to ${link}`));

			await newPage.goto(link);

			let data = await newPage.$$eval('div.product-tiles-list-wrapper div.fl-product-tile', block => {

				return block.map(el => {
					let dataObj = {};

					dataObj['name'] = el
						.querySelector('a.fl-product-tile-title__link')
						.textContent.replace(/\n/,"")
						.trim();

					dataObj['price'] = (el.querySelector('.fl-product-tile-price__current') != null)
						? el.querySelector('.fl-product-tile-price__current').textContent.replace(/[^0-9]/g,"")
						: false;

					dataObj['img'] = el
						.querySelector('img.product-tile-picture__image')
						.getAttribute('src');

					dataObj['rating'] = el
						.querySelector('span.fl-product-tile-rating__stars-value')
						.textContent;

					return dataObj;
				});
			});


			resolve(data);

			await newPage.close();
			console.log(chalk.yellow(`Closing to ${link}`));

		});

		let scrapedData = [];

		let i = 0;

		for (let link in urls) {
			let arrayPageData = await pagePromise(urls[link]);

			for (let currentPageData of arrayPageData) {

				currentPageData = {
					...currentPageData,
					id: i++
				}

				scrapedData.push(currentPageData);
			}

			console.log(chalk.green(`...`));
		}

		console.log(chalk.green(`Ready array, items count:  ${i}`));

		return scrapedData;
	}
}