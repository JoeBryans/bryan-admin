import * as z from "zod";
import { createAgent, tool } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import { title } from "process";
import { de, ta } from "zod/v4/locales";

// dotenv.config();

if (!process.env.OPENAI_API_KEY) {
    console.log("OPENAI_API_KEY is not set");
    throw new Error("OPENAI_API_KEY is not set");
}

if (!process.env.GOOGLE_API_KEY) {
    console.log("GOOGLE_API_KEY is not set");
    throw new Error("GOOGLE_API_KEY is not set");
}



const model = new ChatOpenAI({
    model: "gpt-4.1",
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.1,
    // maxTokens: 1000,
    // timeout: 30
});



const fetchJobs = tool(
    async () => {
        const res = await fetch("https://remoteok.com/api");
        const data = await res.json();
        return data;
    },
    {
        name: "fetch_jobs",
        description: "Fetch job listings from RemoteOK API",
        schema: z.object({}),
    }
);

const filterJobs = (jobs: any[]) => {
    const skills = ["next.js", "react", "node", "express", "nestjs"];

    return jobs.filter((job) => {
        const text = (job.position + job.description).toLowerCase();
        return skills.some(skill => text.includes(skill));
    });
};
 

const agent = createAgent({
    model,
    // model:"gemini-2.0-flash",
    tools: [fetchJobs,],
});


export const Agentic = async () => {
    const result = await agent.invoke({
        messages: [
            {
                role: "system",
                content: `
You are a job assistant.
Fetch jobs and return only jobs matching:
Next.js, React.js, Nest.js, Express.js, Node.js.

Return:
- title
- description
- salary (if available)
- tags
      `,
            },
            {
                role: "user",
                content: "Get jobs from RemoteOK",
            },
        ],
    });


    console.log(result);
    return result.messages[1].content;
}
// console.log("contents of result:", result);