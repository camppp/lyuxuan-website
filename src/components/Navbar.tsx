export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-sm z-50 border-b border-zinc-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="#hero" className="text-xl font-bold text-rose-400">
            Yuxuan Liu
          </a>
          <div className="hidden md:flex gap-6">
            <a href="#about" className="text-zinc-300 hover:text-rose-400 transition-colors">
              About
            </a>
            <a href="#experience" className="text-zinc-300 hover:text-rose-400 transition-colors">
              Experience
            </a>
            <a href="#skills" className="text-zinc-300 hover:text-rose-400 transition-colors">
              Skills
            </a>
            <a href="#projects" className="text-zinc-300 hover:text-rose-400 transition-colors">
              Projects
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-rose-400 transition-colors"
            >
              Resume
            </a>
            <a href="#contact" className="text-zinc-300 hover:text-rose-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
