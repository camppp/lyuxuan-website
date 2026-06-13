import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-14 px-6 scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-12 text-center">Just Call Me Yuxuan</h2>
        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-1 text-center">
            <div className="w-64 h-64 mx-auto rounded-full overflow-hidden ring-4 ring-zinc-700">
              <Image
                src="/images/profile.jpg"
                alt="Yuxuan Liu"
                width={256}
                height={256}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <p className="text-lg text-zinc-300">
              Computers are my biggest passion and have accompanied me throughout my life. I still
              remember my first computer, a giant IBM PC that my father bought when I was five.
            </p>
            <p className="text-lg text-zinc-300">
              Like many teenagers, I primarily used the PC to play video games. But in the process,
              I was fascinated by what a computer could do. Therefore, in middle school, I began
              attempting to learn some basic coding in Java.
            </p>
            <p className="text-lg text-zinc-300">
              As I entered college, I began considering coding and software engineering as my
              future career and started participating in multiple internships. After graduation, I
              went to Amazon as a full-time software engineer. In 2022, artificial intelligence
              quickly became one of the hottest topics in the industry, so I pursued a
              Master&apos;s in CS at UIUC to future-proof my career.
            </p>
            <p className="text-lg text-zinc-300">
              I&apos;m now a Senior Software Engineer focusing on Test Automation at{" "}
              <span className="text-rose-400 font-semibold">Spokeo</span>, based in Los Angeles.
            </p>
            <p className="text-zinc-400 italic">
              I like music, especially EDM (Dubstep, Drum &amp; Bass, Future House, Techno). I also
              love video games — Portal and the Mass Effect trilogy are my favorites.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
