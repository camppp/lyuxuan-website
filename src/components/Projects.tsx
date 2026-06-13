type Project = {
  name: string;
  desc: string;
  tech: string[];
  github?: string;
  npm?: string;
  demo?: string;
  featured?: boolean;
  badge?: string;
};

const projects: Project[] = [
  {
    name: "cypress-parallel-fast",
    desc: "Parallelize Cypress test cases within and across spec files using a dynamic task queue. Faster than file-level splitting because individual it() blocks are distributed across workers.",
    tech: ["TypeScript", "Cypress", "CI/CD", "Node.js"],
    github: "https://github.com/camppp/cypress-parallel-fast",
    npm: "https://www.npmjs.com/package/cypress-parallel-fast",
    featured: true,
    badge: "Latest · Spokeo OSS",
  },
  {
    name: "@camppp/cypress-to-playwright",
    desc: "Translates Cypress commands to Playwright equivalents at runtime, enabling gradual migration without rewriting test suites.",
    tech: ["TypeScript", "Cypress", "Playwright"],
    github: "https://github.com/camppp/cypress-to-playwright",
    npm: "https://www.npmjs.com/package/@camppp/cypress-to-playwright",
    featured: true,
    badge: "Spokeo OSS",
  },
  {
    name: "Erroneous Vector Assessment (EVA)",
    desc: "Weightlifting form correction app using computer vision and pose estimation. Pairs a phone camera with IMU for real-time feedback.",
    tech: ["Python", "Computer Vision", "Android"],
    github: "https://github.com/camppp/EVA",
  },
  {
    name: "Video Style Transfer",
    desc: "Deep learning video style transfer built on top of StyTR-2, extending transformer-based image style transfer to the temporal domain.",
    tech: ["PyTorch", "Deep Learning", "Computer Vision", "OpenCV"],
    github: "https://github.com/camppp/StyTR-2",
  },
  {
    name: "MadBus: Real-Time Bus Tracker",
    desc: "Real-time bus tracker for the Madison, WI Metro Transit network. Originally built in PHP/JS in 2018 — recently ported to Next.js API routes and embedded into this site.",
    tech: ["JavaScript", "Next.js API Routes", "HERE Maps", "GTFS"],
    github: "https://github.com/camppp/MadBus",
    demo: "/madbus",
  },
  {
    name: "WeChat Friendship Checker",
    desc: "Android app that detects one-sided WeChat contacts by analyzing the moments visibility graph.",
    tech: ["Java", "Android Development"],
    github: "https://github.com/camppp/WeChatFriendshipChecker",
  },
];

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.15v3.19c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function NpmIcon() {
  return (
    <svg viewBox="0 0 780 250" width="28" height="9" fill="currentColor" aria-hidden="true">
      <path d="M240 250h100v-50h100V0H240v250zm100-200h50v100h-50V50zM480 0v200h100V50h50v150h50V50h50v150h50V0H480zM0 200h100V50h50v150h50V0H0v200z" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-14 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-4 text-center">Projects</h2>
        <p className="text-center text-zinc-400 mb-10">
          Open-source work, including tools I built for test automation at Spokeo
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className={`relative bg-zinc-800 p-6 rounded-lg transition-colors border ${
                project.featured
                  ? "border-rose-500/40 hover:border-rose-400"
                  : "border-transparent hover:border-rose-500/40"
              } hover:bg-zinc-700/80`}
            >
              {project.badge && (
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-rose-600/20 text-rose-300 text-xs rounded-full border border-rose-500/40">
                  {project.badge}
                </span>
              )}
              <h3 className="text-xl font-bold mb-2 text-rose-400 pr-24">{project.name}</h3>
              <p className="text-zinc-300 mb-4 text-sm leading-relaxed">{project.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-950 border border-zinc-700 text-zinc-200 text-xs rounded-md transition-colors"
                  >
                    <GithubIcon />
                    <span>GitHub</span>
                  </a>
                )}
                {project.npm && (
                  <a
                    href={project.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#cb0000] hover:bg-[#a80000] text-white text-xs rounded-md transition-colors"
                    aria-label={`${project.name} on npm`}
                  >
                    <NpmIcon />
                    <span>npm</span>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs rounded-md transition-colors"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
