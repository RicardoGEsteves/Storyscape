import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Storyscape",
  description:
    "Storyscape: Social Media Platform for Enhanced Connectivity and Brand Engagement",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
