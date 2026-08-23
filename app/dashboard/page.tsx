import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
type Source = "upwork" | "freelancer" | "remote"
type Skill = "Nextjs" | "Reactjs" | "Node" | "Nestjs" | "Expressjs"
interface Job {
  id: string
  title: string
  description: string
  budget: number
  source: Source
  skill: Skill[]
  url: string
  currency: string
  rating?: number

}

const jobStructure: Job[] = [
  {
    id: "1",
    title: 'building of a landing page for a new product',
    description: "this project is about hbuilding a landing page for products",
    budget: 400,
    source: "upwork",
    url: "hnimnpiowdjpwq",
    skill: ["Nextjs", "Reactjs", "Node", "Expressjs"],
    currency: "USD"


  },
  {
    id: "2",
    title: 'building of a landing page for a new product',
    description: "this project is about hbuilding a landing page for products",
    budget: 600,
    source: "remote",
    url: "hnimnpiowdjpwq",
    skill: ["Node", "Reactjs", "Nestjs"],
    currency: "USD"


  },
  {
    id: "3",
    title: 'building of a landing page for a new product',
    description: "this project is about hbuilding a landing page for products",
    budget: 100,
    source: "freelancer",
    url: "hnimnpiowdjpwq",
    skill: ["Nextjs", "Reactjs"],
    currency: "USD"


  }
]

const page = async() => {
  const  jobs = await fetch("http://localhost:3000/api/scrape-web", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await jobs.json()
  console.log(jobs)
  console.log(data)
  return (
    <div
      className=' flex flex-col gap-4 justify-center items-center w-full h-full p-4'
    >


      {/* job list */}

      <div
        className='w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
      >
        {
          jobStructure.map((job) => (
            <Link key={job.id} href={`/dashboard/jobs/${job.id}`}
              className='space-y-2'
            >
              <Card
                key={job.id}
              >
                <CardContent
                  className='flex flex-col gap-2'
                >
                  <CardTitle
                    className='line-clamp-1'

                  >{job.title}</CardTitle>
                  <CardDescription
                    className='line-clamp-2'
                  >{job.description}</CardDescription>
                  <CardDescription>Budget: {job.budget} {job.currency}</CardDescription>

                  <div className='flex items-center gap-1'>
                    <span className='text-sm'>Source: </span>
                    <span
                      className={cn(
                        "text-sm w-fit text-white",
                        job.source === "upwork" && "bg-green-700 p-1 border-2 rounded-lg",
                        job.source === "freelancer" && "bg-blue-700 p-1 border-2 rounded-lg",
                        job.source === "remote" && "bg-red-700 p-1 border-2 rounded-lg",
                      )}
                    >{job.source}</span>
                  </div>
                  <div className=''>
                    <span className='text-sm'>Skills:</span>

                    <div
                      className='flex items-center gap-2'
                    >
                      {job.skill.map((skill) => (
                        <span
                          key={skill}
                          className={cn(
                            "text-sm w-fit text-white",
                            skill === "Nextjs" && "bg-black p-1.5 border-2 rounded-lg",
                            skill === "Reactjs" && "bg-blue-500 p-1.5 border-2 rounded-lg",
                            skill === "Node" && "bg-green-500 p-1.5 border-2 rounded-lg",
                            skill === "Nestjs" && "bg-red-500 p-1.5 border-2 rounded-lg",
                            skill === "Expressjs" && "bg-yellow-500 p-1.5 border-2 rounded-lg",
                          )}
                        >{skill}</span>
                      ))}
                    </div>
                  </div>


                </CardContent>
              </Card>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default page