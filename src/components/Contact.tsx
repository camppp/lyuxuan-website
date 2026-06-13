import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="py-14 px-6">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl font-bold mb-2 text-center">Get in Touch</h2>
        <p className="text-center text-zinc-400 mb-10">
          Open to interesting conversations and opportunities
        </p>
        <div className="grid md:grid-cols-5 gap-10">
          {/* Form takes 3/5 */}
          <div className="md:col-span-3">
            <ContactForm />
          </div>
          {/* Contact info takes 2/5 */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <p className="text-sm uppercase tracking-wider text-rose-400 mb-3 font-semibold">
                Reach Me
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:lyuxuan0422@gmail.com"
                  className="flex items-center gap-3 text-zinc-300 hover:text-rose-400 transition-colors group"
                >
                  <span className="flex-shrink-0 w-9 h-9 rounded-md bg-rose-600/15 text-rose-400 flex items-center justify-center group-hover:bg-rose-600/25 transition-colors">
                    ✉
                  </span>
                  <span className="text-sm break-all">lyuxuan0422@gmail.com</span>
                </a>
                <a
                  href="tel:+16084222040"
                  className="flex items-center gap-3 text-zinc-300 hover:text-rose-400 transition-colors group"
                >
                  <span className="flex-shrink-0 w-9 h-9 rounded-md bg-rose-600/15 text-rose-400 flex items-center justify-center group-hover:bg-rose-600/25 transition-colors">
                    ☎
                  </span>
                  <span className="text-sm">+1 (608) 422-2040</span>
                </a>
                <div className="flex items-center gap-3 text-zinc-300">
                  <span className="flex-shrink-0 w-9 h-9 rounded-md bg-rose-600/15 text-rose-400 flex items-center justify-center">
                    ⚲
                  </span>
                  <span className="text-sm">Los Angeles, CA</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm uppercase tracking-wider text-rose-400 mb-3 font-semibold">
                Connect
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/camppp"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className="w-10 h-10 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-rose-500/60 rounded-md transition-colors text-zinc-300 hover:text-rose-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.51 11.51 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222v3.293c0 .32.192.694.8.576C20.565 21.796 24 17.303 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/lyuxuan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="w-10 h-10 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-rose-500/60 rounded-md transition-colors text-zinc-300 hover:text-rose-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://www.npmjs.com/~camppp"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="npm"
                  className="w-10 h-10 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-rose-500/60 rounded-md transition-colors text-zinc-300 hover:text-rose-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M0 0v24h24V0H0zm6.672 19.992H4.008V7.992H12v12h-2.664v-9.336H6.672v9.336zm9.336 0h-2.664V7.992h6.648v12h-2.664v-9.336h-1.32v9.336z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
                </span>
                <span>Currently at Spokeo · open to chats</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
