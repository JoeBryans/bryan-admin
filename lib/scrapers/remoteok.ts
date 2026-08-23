import { chromium } from "playwright";

export async function RemoteOkScraper() {
    try {
        console.log("scraping...");

        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto("https://remoteok.com/remote-dev-jobs");
        // await page.goto("https://www.freelancer.com/dashboard");

        await page.waitForSelector(".job");

        const jobs = await page.$$eval(".job", (nodes) =>
            nodes.map((el) => {
                 console.log("scraping job element! :", el);
                const title = el.querySelector("h2")?.textContent;
                const link = (el as HTMLElement).getAttribute("data-href");

                return {
                    title,
                    url: link ? "https://remoteok.com" + link : null,
                };
            })
        );
 
        await browser.close();

        console.log("scraped remoteok jobs:", jobs);

        return jobs;
    } catch (error: any) {
        console.error(error);
        // throw new Error("Failed to scrape jobs");
        return error;
    }
}