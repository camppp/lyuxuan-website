const topSkills = [
  "Amazon Web Services (AWS)",
  "Java",
  "JavaScript",
  "Computer Vision",
  "Python",
];

const categories: {
  title: string;
  icon: string;
  items: string[];
}[] = [
  {
    title: "Languages",
    icon: "{ }",
    items: [
      "Java",
      "Python",
      "TypeScript",
      "JavaScript",
      "Ruby",
      "C#",
      "C",
      "PHP",
      "SQL",
      "HiveQL",
    ],
  },
  {
    title: "Testing & Automation",
    icon: "✓",
    items: ["Cypress", "RSpec", "Jenkins", "Test Automation", "CI/CD"],
  },
  {
    title: "Cloud & DevOps",
    icon: "☁",
    items: [
      "AWS",
      "AWS Lambda",
      "CloudFormation",
      "Docker",
      "Linux",
      "Unix",
      "Git",
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: "▲",
    items: [
      "React.js",
      "Node.js",
      "Spring Boot",
      ".NET Framework",
      "Unity",
      "PyTorch",
      "OpenCV",
    ],
  },
  {
    title: "Data & ML",
    icon: "◆",
    items: [
      "Apache Hive",
      "Apache Spark",
      "Elasticsearch",
      "Redis",
      "MySQL",
      "Kibana",
      "Machine Learning",
      "Deep Learning",
      "Big Data",
      "Distributed Computing",
    ],
  },
  {
    title: "Domains",
    icon: "◎",
    items: [
      "Payment Systems",
      "Computer Vision",
      "Game Development",
      "IoT",
      "Android Development",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-14 px-6 bg-zinc-800">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-4 text-center">Skills</h2>
        <p className="text-center text-zinc-400 mb-12">
          Built at Spokeo, Amazon, SiriusXM, PerBlue, Baidu &amp; NavInfo
        </p>

        {/* Top skills - LinkedIn endorsed */}
        <div className="mb-12">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-rose-500/40 transition-colors"
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
                    className="px-2.5 py-1 bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded-md"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
