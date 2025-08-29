import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FaLinkedin, FaEnvelope, FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";

const roles = [
  {
    title: "Frontend Developer",
    type: "Full-Time",
    location: "Remote/Bangladesh",
    description:
      "Build beautiful, responsive user interfaces with React, Tailwind, and more. Collaborate with designers and backend engineers.",
    requirements: [
      "2+ years experience with React",
      "Strong knowledge of JavaScript/TypeScript",
      "CSS/SCSS/Tailwind expertise",
      "Git & modern workflow"
    ],
  },
  {
    title: "Backend Engineer",
    type: "Full-Time",
    location: "Dhaka Office/Remote",
    description:
      "Design scalable APIs and services for parcel logistics. Work with Node.js, Express, and cloud infrastructure.",
    requirements: [
      "3+ years experience with Node.js",
      "REST API design & security",
      "Database expertise (MongoDB, SQL)",
      "Cloud experience (AWS, GCP, Docker)"
    ],
  },
  {
    title: "Product Designer",
    type: "Contract",
    location: "Remote",
    description:
      "Craft intuitive web/mobile experiences for parcel logistics. Shape user journeys and interface flows, working closely with engineers.",
    requirements: [
      "Portfolio of shipped products",
      "UX/UI fundamentals",
      "Figma/Sketch proficiency",
      "Collaboration skills"
    ],
  },
];

export default function Career() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:to-orange-900 py-8 px-2">
      <div className="w-full md:w-10/12 mx-auto">
        <Card className="mb-8 shadow-md border-0 rounded-2xl bg-gradient-to-r from-orange-100 to-blue-50 dark:from-gray-900 dark:to-blue-950">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <FaRocket className="text-orange-500 text-3xl" />
              <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent tracking-tight">
                Careers at Logisti Core
              </CardTitle>
            </div>
            <CardDescription className="text-lg text-gray-800 dark:text-gray-100">
              Join our mission to reinvent parcel logistics in Bangladesh & beyond. We value innovation, teamwork, and growth.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-full md:w-2/3">
                <h2 className="text-xl font-bold mb-2 text-orange-700 dark:text-orange-300">Open Positions</h2>
                <div className="space-y-6">
                  {roles.map((role, i) => (
                    <div key={i} className="bg-white dark:bg-gray-950 rounded-xl shadow p-5 border border-orange-100 dark:border-orange-900">
                      <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">{role.title}</h3>
                      <div className="flex flex-wrap gap-3 mb-2">
                        <span className="px-2 py-1 rounded bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-200 text-xs font-semibold">{role.type}</span>
                        <span className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold">{role.location}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-200 mb-2">{role.description}</p>
                      <ul className="list-disc ml-6 mb-2 text-sm text-gray-600 dark:text-gray-300">
                        {role.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                      <Button asChild size="sm" className="mt-2">
                        <a href="mailto:hr@logisticore.com?subject=Application%20for%20" target="_blank" rel="noopener noreferrer">
                          Apply Now
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/3 mt-6 md:mt-0">
                <div className="p-5 rounded-xl shadow bg-white dark:bg-gray-950 border border-orange-100 dark:border-orange-900 text-center">
                  <h2 className="font-bold text-lg mb-2 text-blue-700 dark:text-blue-300">Life at Logisti Core</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    We celebrate diversity, remote work, and continuous learning. Be part of a team shaping the future of logistics.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <a href="mailto:hr@logisticore.com" className="flex items-center gap-2 justify-center">
                        <FaEnvelope /> Email HR
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="https://www.linkedin.com/company/logisticore/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center">
                        <FaLinkedin /> LinkedIn Page
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Application form */}
        <Card className="shadow-md border-0 rounded-2xl bg-gradient-to-r from-white to-orange-50 dark:from-gray-900 dark:to-orange-900">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-orange-700 dark:text-orange-200 mb-2">Didn't find a suitable role?</CardTitle>
            <CardDescription className="text-base text-gray-600 dark:text-gray-300">
              Send us your CV and we’ll get in touch if a matching opportunity comes up!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col md:flex-row gap-4"
              action="mailto:hr@logisticore.com"
              method="POST"
              encType="text/plain"
            >
              <Input
                required
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full md:w-1/3"
                autoComplete="name"
              />
              <Input
                required
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full md:w-1/3"
                autoComplete="email"
              />
              <Input
                type="text"
                name="linkedin"
                placeholder="LinkedIn Profile (optional)"
                className="w-full md:w-1/3"
                autoComplete="url"
              />
              <Button type="submit" className="w-full md:w-auto">
                Send CV
              </Button>
            </form>
          </CardContent>
        </Card>
        {/* Footer note */}
        <div className="text-center text-xs text-muted-foreground mt-8">
          &copy; {new Date().getFullYear()} Logisti Core. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}