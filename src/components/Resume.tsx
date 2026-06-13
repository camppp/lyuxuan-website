export default function Resume() {
  return (
    <section id="resume" className="py-14 px-6 bg-zinc-800">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-bold mb-8">My Resume</h2>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors font-semibold"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}
