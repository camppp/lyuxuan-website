import type { Metadata } from "next";
import dynamic from "next/dynamic";

const MadBusMap = dynamic(() => import("./MadBusMap"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: 600, background: "#888" }} />,
});

export const metadata: Metadata = {
  title: "MadBus — Real-Time Madison Bus Tracker",
  description:
    "Real-time bus tracker for the Madison, WI Metro Transit network. An undergraduate project by Yuxuan Liu, originally built in 2018 and ported to Next.js.",
  alternates: { canonical: "/madbus" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "MadBus — Real-Time Madison Bus Tracker",
    description:
      "Real-time bus tracker for the Madison, WI Metro Transit network. Originally built in 2018, ported to Next.js.",
    url: "https://www.lyuxuan.com/madbus",
    images: [{ url: "/images/profile.jpg", width: 1200, height: 630, alt: "MadBus by Yuxuan Liu" }],
  },
};

export default function MadBusPage() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          .madbus-icon {
            display: block !important;
            position: absolute;
          }
          .madbus-icon svg {
            display: block !important;
            width: 100%;
            height: 100%;
          }
          .madbus-icon svg rect {
            display: block !important;
          }
          .madbus-icon svg text {
            display: block !important;
          }
        `
      }} />

      <main className="min-h-screen bg-zinc-900 text-white pt-16">
        <div className="container mx-auto px-6 py-8 max-w-5xl">
          <div className="mb-6">
            <a
              href="/#projects"
              className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 text-sm"
            >
              ← Back to portfolio
            </a>
          </div>
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              MadBus <span className="text-rose-400">·</span>{" "}
              <span className="text-zinc-300 text-xl font-normal">
                Real-Time Madison Bus Tracker
              </span>
            </h1>
            <p className="text-zinc-400 text-sm mb-4">
              Live demo from a 2018 undergrad project, ported from PHP to
              Next.js API routes. Data from{" "}
              <a
                href="https://transitdata.cityofmadison.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-400 hover:underline"
              >
                City of Madison Metro Transit
              </a>
              . Try entering route <code className="text-rose-400">A</code>,{" "}
              <code className="text-rose-400">28</code>,{" "}
              <code className="text-rose-400">38</code>, or{" "}
              <code className="text-rose-400">75</code>.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-md px-4 py-3 text-amber-200 text-xs">
              <strong>Modernized:</strong> Now using React hooks instead of jQuery,
              with native fetch API and TypeScript types. No more global variables
              or imperative DOM manipulation.
            </div>
          </header>

          <div className="bg-white rounded-lg p-4 text-zinc-900">
            <MadBusMap />
          </div>
        </div>
      </main>
    </>
  );
}
