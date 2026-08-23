import { scrapeAllJobs } from "@/lib/scrapers/scrapeAll";
import { NextResponse } from "next/server";
import { chromium } from "playwright";

export const runtime = "nodejs";


export async function GET() {
    try {
        const jobs = await scrapeAllJobs();

        console.log("scraped", jobs.length, "jobs:", jobs);

        return NextResponse.json({
            total: jobs.length,
            jobs,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

