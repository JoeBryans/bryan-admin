import { int } from "zod";

interface User {
    skills: string[];
    experienceLevel: string;
    preferredRoles: string[];
}   

interface Job {
    title: string;
    description: string;
}

interface PromptInput {
    user: User;
    job: Job;
}

export function promptMatcher({ user, job }: PromptInput) {
    const prompt = `
You are an AI job matcher.

Based on the user's profile, analyze this job and return JSON:

{
  "summary": "short summary",
  "skills": ["skill1", "skill2"],
  "experienceLevel": "junior | mid | senior",
  "category": "frontend | backend | fullstack | other",
  "budget": "if available",
  "isScam": false,
  "matchScore": number (0-100),
  "simplicityScore": number (0-100)
}

User Profile:
Skills: ${user.skills.join(", ")}
Experience: ${user.experienceLevel}
Preferred Roles: ${user.preferredRoles.join(", ")}

Job Title:
${job.title}

Job Description:
${job.description}

Rules:
- matchScore = how well job fits user's skills
- simplicityScore = how easy the job is to complete
- Prefer beginner-friendly jobs for junior users
- Penalize complex or unclear jobs
`;

    return prompt;
}