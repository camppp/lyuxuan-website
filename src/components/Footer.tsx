export default function Footer() {
  return (
    <footer className="py-8 px-6 bg-zinc-900 border-t border-zinc-800">
      <div className="container mx-auto max-w-6xl text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="https://github.com/camppp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/lyuxuan/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} Yuxuan Liu. All rights reserved.</p>
      </div>
    </footer>
  );
}
