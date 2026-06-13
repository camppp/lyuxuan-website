import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://www.lyuxuan.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yuxuan Liu — Senior Software Engineer, Test Automation @ Spokeo",
    template: "%s | Yuxuan Liu",
  },
  description:
    "Yuxuan Liu is a Senior Software Engineer specializing in test automation at Spokeo. Previously at Amazon, SiriusXM, and Baidu. Expertise in Java, AWS, Python, Cypress, TypeScript, and computer vision. Based in Los Angeles, CA.",
  keywords: [
    "Yuxuan Liu",
    "Lyuxuan",
    "Software Engineer",
    "Senior Software Engineer",
    "Test Automation",
    "Spokeo",
    "Amazon",
    "SiriusXM",
    "Cypress",
    "TypeScript",
    "Java",
    "AWS",
    "Python",
    "Los Angeles",
    "UIUC",
    "cypress-parallel-fast",
  ],
  authors: [{ name: "Yuxuan Liu", url: SITE_URL }],
  creator: "Yuxuan Liu",
  publisher: "Yuxuan Liu",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Yuxuan Liu",
    title: "Yuxuan Liu — Senior Software Engineer, Test Automation @ Spokeo",
    description:
      "Portfolio of Yuxuan Liu — Senior SWE at Spokeo, formerly Amazon & SiriusXM. Building test-automation tooling in TypeScript, Java, and AWS.",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Yuxuan Liu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuxuan Liu — Senior Software Engineer",
    description:
      "Senior Software Engineer specializing in test automation. Cypress · TypeScript · Java · AWS.",
    images: ["/images/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/tabIcon.png",
  },
  category: "technology",
  other: {
    author: "Yuxuan Liu",
  },
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yuxuan Liu",
  alternateName: "Lyuxuan",
  url: SITE_URL,
  image: `${SITE_URL}/images/profile.jpg`,
  jobTitle: "Senior Software Engineer - Test Automation",
  worksFor: {
    "@type": "Organization",
    name: "Spokeo",
    url: "https://www.spokeo.com",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Illinois Urbana-Champaign",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "University of Wisconsin-Madison",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Los Angeles",
    addressRegion: "CA",
    postalCode: "90013",
    addressCountry: "US",
  },
  email: "mailto:lyuxuan0422@gmail.com",
  sameAs: [
    "https://github.com/camppp",
    "https://www.linkedin.com/in/lyuxuan/",
    "https://www.npmjs.com/~camppp",
  ],
  knowsAbout: [
    "Test Automation",
    "Cypress",
    "TypeScript",
    "Java",
    "AWS",
    "Python",
    "Computer Vision",
    "Software Engineering",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
