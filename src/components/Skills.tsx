const topSkills = [
  "Amazon Web Services (AWS)",
  "Java",
  "JavaScript",
  "Computer Vision",
  "Python",
];

const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    url: "https://www.credly.com/badges/a305466b-7a24-4bcc-a11d-b4fe14afb675/public_url",
  },
  {
    name: "Oracle Certified Professional, Java SE 11 Developer",
    issuer: "Oracle",
    url: "https://www.credly.com/badges/971aeddc-8113-4dee-b94c-f28bf9ddd4b7/public_url",
  },
];

const categories: {
  title: string;
  icon: string;
  items: string[];
}[] = [
  {
    title: "Languages",
    icon: "{ }",
    items: ["Python", "Java", "TypeScript", "JavaScript", "C++", "Ruby", "C#", "C", "PHP", "SQL"],
  },
  {
    title: "Frameworks",
    icon: "▲",
    items: ["Next.js", "React", "Node.js", "Spring Boot", "Rails", "Tailwind CSS", "HTML/CSS", "PyTorch", "OpenCV", "Unity"],
  },
  {
    title: "Cloud & DevOps",
    icon: "☁",
    items: ["AWS", "AWS Lambda", "CloudFormation", "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Linux", "Git", "Microservices", "REST APIs"],
  },
  {
    title: "AI & ML",
    icon: "◆",
    items: ["Generative AI", "LLM Integration", "OpenAI API", "Prompt Engineering", "Machine Learning", "Deep Learning", "Computer Vision"],
  },
  {
    title: "Data Engineering",
    icon: "◎",
    items: ["Apache Spark", "Apache Hive", "Hadoop", "Elasticsearch", "PostgreSQL", "MySQL", "Redis", "Kibana", "NoSQL", "Big Data", "Distributed Computing"],
  },
  {
    title: "Testing",
    icon: "✓",
    items: ["Cypress", "Playwright", "RSpec", "Selenium", "Percy", "Testkube"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-8 px-6 scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-4 text-center">Skills</h2>
        <p className="text-center text-zinc-400 mb-12">
          Built at Spokeo, Amazon, SiriusXM, PerBlue, Baidu &amp; NavInfo
        </p>

        {/* Top skills - LinkedIn endorsed */}
        <div className="mb-8">
          <p className="text-sm uppercase tracking-wider text-rose-400 text-center mb-4 font-semibold">
            Top Skills · Endorsed on LinkedIn
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {topSkills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gradient-to-r from-rose-600 to-rose-700 text-white font-medium rounded-full shadow-lg shadow-rose-900/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Categorized skill grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 hover:border-rose-500/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-md bg-rose-600/15 text-rose-400 text-lg font-bold">
                  {cat.icon}
                </span>
                <h3 className="text-lg font-bold">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs rounded-md"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-10">
          <p className="text-sm uppercase tracking-wider text-rose-400 text-center mb-4 font-semibold">
            Certifications
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <a
                key={cert.name}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 bg-zinc-800 border border-zinc-700 rounded-xl hover:border-rose-500/40 transition-colors"
              >
                <span className="text-rose-400 text-lg">🏅</span>
                <div>
                  <p className="text-sm font-semibold text-white">{cert.name}</p>
                  <p className="text-xs text-zinc-400">{cert.issuer}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
