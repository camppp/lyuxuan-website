import Image from "next/image";
import { ResumeButton } from "./ResumeButton";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      <Image
        src="/images/banner.jpg"
        alt="Hero background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/85 via-zinc-900/75 to-rose-900/70" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-zinc-900" />

      <div className="relative container mx-auto px-6 text-center z-10">
        <h1 className="sr-only">Yuxuan Liu — Senior Software Engineer · Test Automation</h1>
        <p className="text-5xl md:text-7xl font-bold mb-4">
          <span className="text-rose-400">Hello World!</span>
          <br />
          I&apos;m Yuxuan Liu
        </p>
        <p className="text-xl md:text-2xl text-zinc-200 mb-4">
          Senior Software Engineer · Test Automation @ Spokeo
        </p>
        <p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">
          Extensive hands-on experience in software design, development, optimization, and
          testing. Previously at Amazon, SiriusXM, and more.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#about"
            className="inline-block px-8 py-3 bg-zinc-800/80 hover:bg-zinc-700 border border-rose-500/40 rounded-lg transition-colors font-semibold"
          >
            Who am I?
          </a>
          <ResumeButton />
        </div>
      </div>
    </section>
  );
}
