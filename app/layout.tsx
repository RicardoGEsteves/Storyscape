import type { Metadata } from "next";
import AuthOverlay from "./(auth)/auth-overlay";

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
      <body>
        {/* TODO: Remove after after auth implementation */}
        <AuthOverlay />
        {children}
      </body>
    </html>
  );
}
