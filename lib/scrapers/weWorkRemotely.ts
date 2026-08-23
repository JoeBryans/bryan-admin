import { chromium } from "playwright";

export async function WeWorkRemotelyScraper() {
    const browser = await chromium.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto("https://weworkremotely.com/remote-jobs", {
        waitUntil: "domcontentloaded",
    });

    // wait for job sections
    await page.waitForSelector("section.jobs");

    const jobs = await page.$$eval("section.jobs li", (nodes) =>
        nodes
            .map((el) => {
 
                console.log("scraping job element:", el);

                const linkEl = el.querySelector("a");
                if (!linkEl) return null;

                const href = linkEl.getAttribute("href");

                const company =
                    el.querySelector(".company")?.textContent?.trim() || "";

                const title =
                    el.querySelector(".title")?.textContent?.trim() || "";

                const region =
                    el.querySelector(".region")?.textContent?.trim() || "";

                // skip "view all" or invalid links
                if (!href || !title) return null;

                return {
                    title,
                    company,
                    region,
                    url: "https://weworkremotely.com" + href,
                    source: "weworkremotely",
                };
            })
            .filter(Boolean)
    );

    await browser.close();
    console.log("scraped weworkremotely jobs:", jobs);

    return jobs;
}
