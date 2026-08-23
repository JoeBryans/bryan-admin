import { RemoteOkScraper } from "./remoteok";
import { WeWorkRemotelyScraper } from "./weWorkRemotely";

export async function scrapeAllJobs() {
    try {
        const results = await Promise.allSettled([
            RemoteOkScraper(),
            WeWorkRemotelyScraper(),
        ]);

        // handle failures safely
        const jobs = results.flatMap((result) => {
            if (result.status === "fulfilled") {
                return result.value;
            } else {
                console.error("Scraper failed:", result.reason);
                return [];
            }
        });

        console.log("scraped all jobs:", jobs);
        return jobs;
    } catch (error) {
        console.error("Aggregation error:", error);
        return [];
    }
}
