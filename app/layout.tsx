import type { Metadata } from "next";

import UserProvider from "@/context/user";
import RenderOverlays from "@/components/render-overlays";

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
      <UserProvider>
        <body>
          <RenderOverlays />

          {children}
        </body>
      </UserProvider>
    </html>
  );
}
