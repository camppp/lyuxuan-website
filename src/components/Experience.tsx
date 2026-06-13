import Image from "next/image";

type Exp = {
  company: string;
  role: string;
  period: string;
  location: string;
  image?: string;
  highlights?: string[];
};

const experiences: Exp[] = [
  {
    company: "Spokeo",
    role: "Senior Software Engineer - Test Automation",
    period: "Feb 2024 - Present",
    location: "Pasadena, CA",
    image: "/images/portfolio/spokeo.png",
    highlights: [
      "Leading test automation initiatives with Cypress, TypeScript, RSpec, and Ruby",
      "Built and open-sourced cypress-parallel-fast (npm) — dynamic task-queue parallelization for Cypress",
      "Built @camppp/cypress-to-playwright (npm) — runtime command translation for migration",
      "Driving CI/CD improvements with Docker and Jenkins",
    ],
  },
  {
    company: "SiriusXM",
    role: "Software Engineer Intern",
    period: "May 2023 - Aug 2023",
    location: "Urbana-Champaign, IL",
    image: "/images/portfolio/sxm.jpg",
    highlights: [
      "Designed an event-driven monitoring pipeline using AWS Lambda, NodeJS, and CloudFormation",
      "Reduced cloud monitoring costs by 95% by eliminating manual CloudWatch Insights scheduling",
      "Built serverless infrastructure for S3 record loading/preprocessing with Lambda and SNS",
      "Designed Kibana dashboards and developed analytics logic with KQL",
    ],
  },
  {
    company: "Amazon",
    role: "Software Development Engineer I",
    period: "Jul 2021 - Jul 2022",
    location: "Greater Seattle Area",
    image: "/images/portfolio/amz.png",
    highlights: [
      "Designed payments core back-end in Java and AWS for payment method management and processing",
      "Re-architected retail credit card reader registry into modular, config-driven components",
      "Decomposed the registry into RESTful microservices, event processors, and NoSQL metadata stores",
      "Integrated payment processing with Amazon's biometrics platform across software and hardware",
      "Launched core logic in the 'Just Walk Out' experiment for Amazon Go / Fresh / Whole Foods, serving 10K+ TPS",
    ],
  },
  {
    company: "PerBlue",
    role: "Software Engineer Intern",
    period: "May 2020 - Aug 2020",
    location: "Madison, WI",
    image: "/images/portfolio/pb2.jpg",
    highlights: [
      "Developed back-end features of a cross-platform mobile game using the C# Orleans framework",
      "Built support server modules in C# for real-time platform management",
      "Developed testing infrastructure across the full-stack web application",
    ],
  },
  {
    company: "Baidu",
    role: "Software Engineer Intern",
    period: "May 2019 - Aug 2019",
    location: "Beijing, China",
    image: "/images/portfolio/bd.png",
    highlights: [
      "Built data pipelines across Apache Hive, Redis, and MySQL using HiveQL, SQL, and DataX",
      "Contributed to the Huiyan Data Analytics Platform supporting thousands of retailers",
      "Developed full-stack web app in JavaScript/PHP (MVC) with drill-down and pivot analysis",
      "Optimized Hive partitioning, reducing petabyte-scale daily jobs from 10h to 3h (-40% peak usage)",
    ],
  },
  {
    company: "NavInfo",
    role: "Software Engineer Intern",
    period: "May 2018 - Aug 2018",
    location: "Beijing, China",
    image: "/images/portfolio/navinfo.webp",
    highlights: [
      "Developed a Kalman filter-based GPS noise filtering solution in Java",
      "Implemented a Hadoop-based route distance service over HDFS-stored coordinates",
      "Optimized companywide Elasticsearch instances used for Geoshape intersection",
    ],
  },
];

function LogoBox({ exp }: { exp: Exp }) {
  return (
    <div className="relative w-full h-32 mb-4 flex items-center justify-center bg-white rounded p-4">
      {exp.image ? (
        <Image
          src={exp.image}
          alt={exp.company}
          width={240}
          height={100}
          className="object-contain max-h-24 w-auto"
        />
      ) : (
        <span className="text-2xl font-bold text-rose-600">{exp.company}</span>
      )}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-14 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-4 text-center">My Past Experiences</h2>
        <p className="text-center text-zinc-400 mb-12">
          A journey through some great companies
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="bg-zinc-800 p-6 rounded-lg flex flex-col hover:bg-zinc-700/80 transition-colors border border-transparent hover:border-rose-500/30"
            >
              <LogoBox exp={exp} />
              <h3 className="text-xl font-bold mb-1">{exp.company}</h3>
              <p className="text-rose-400 mb-1 text-sm font-medium">{exp.role}</p>
              <p className="text-zinc-500 text-xs mb-3">
                {exp.period} • {exp.location}
              </p>
              {exp.highlights && (
                <ul className="text-zinc-300 text-sm space-y-1 list-disc list-inside marker:text-rose-500">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
