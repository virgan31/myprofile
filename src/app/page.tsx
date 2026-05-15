import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { PROFILE_QUERY, PROJECTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 0; // fetch fresh data on every request (real-time)

// Types for our data
interface Profile {
  name: string;
  headline: string;
  bio: string;
  profileImage?: any;
  location?: string;
  email?: string;
  socialLinks?: { platform: string; url: string }[];
}

interface Project {
  _id: string;
  title: string;
  slug: string;
  coverImage?: any;
  summary?: string;
  techStack?: string[];
  projectUrl?: string;
  githubUrl?: string;
}

export default async function Home() {
  // Fetch data from Sanity
  const profile: Profile = await client.fetch(PROFILE_QUERY);
  const projects: Project[] = await client.fetch(PROJECTS_QUERY);

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
        <p className="text-zinc-500">No profile data found. Please add content in the Sanity Studio.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-500/5" />
      </div>

      <main className="mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-32">
        {/* Hero Section */}
        <section className="flex flex-col-reverse items-center justify-between gap-12 md:flex-row md:items-start">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              I&apos;m <span className="text-indigo-600 dark:text-indigo-400">{profile.name}</span>
            </h1>
            <p className="text-xl font-medium text-zinc-600 dark:text-zinc-400 sm:text-2xl">
              {profile.headline}
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                >
                  Contact Me
                </a>
              )}
              {profile.socialLinks?.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>

          {profile.profileImage && (
            <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-900/10 dark:bg-zinc-800 md:h-64 md:w-64">
              <Image
                src={urlFor(profile.profileImage).width(512).height(512).url()}
                alt={profile.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 256px"
                priority
              />
            </div>
          )}
        </section>

        {/* Bio Section */}
        <section className="mt-24 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight">About</h2>
          <div className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {profile.bio}
          </div>
          {profile.location && (
            <p className="mt-4 flex items-center gap-2 text-zinc-500">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.422 17 9A7 7 0 1 0 3 9c0 3.422 1.698 5.988 3.359 7.587.83.799 1.653 1.381 2.273 1.765.312.193.572.337.758.433a5.736 5.736 0 0 0 .281.14l.018.008.006.003ZM10 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clipRule="evenodd" />
              </svg>
              {profile.location}
            </p>
          )}
        </section>

        {/* Projects Section */}
        <section className="mt-24">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {projects.map((project, index) => (
              <div
                key={project._id}
                className="group relative flex flex-col items-start rounded-2xl bg-zinc-50 p-6 transition hover:bg-zinc-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
              >
                {project.coverImage && (
                  <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-200 ring-1 ring-zinc-900/5 dark:bg-zinc-800">
                    <Image
                      src={urlFor(project.coverImage).width(800).url()}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      priority={index === 0}
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold leading-7 tracking-tight">
                  {project.projectUrl ? (
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  {project.summary}
                </p>
                {project.techStack && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-200 dark:bg-zinc-950 dark:text-zinc-400 dark:ring-zinc-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-6 flex gap-4">
                  {project.projectUrl && (
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                      Live Demo &rarr;
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-24 border-t border-zinc-100 py-10 dark:border-zinc-800">
        <div className="mx-auto max-w-4xl px-6 text-center text-sm text-zinc-500 lg:px-8">
          &copy; {new Date().getFullYear()} {profile.name}. Built with Next.js and Sanity.
        </div>
      </footer>
    </div>
  );
}
