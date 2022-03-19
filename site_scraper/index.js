// import {startBrowser as browserObject} from "./browser.js";
import { browserObject } from "./browser.js";
import { scraperAll } from "./pageController.js";

let browserInstance = browserObject.startBrowser();
scraperAll(browserInstance);