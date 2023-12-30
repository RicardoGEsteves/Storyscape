"use client";

import { useGeneralStore } from "@/store/general";
import ClientOnly from "./client-only";
import AuthOverlay from "@/app/(auth)/auth-overlay";
import EditProfileOverlay from "@/app/(main)/profile/[id]/_components/edit-profile-overlay";

export default function RenderOverlays() {
  const { isLoginOpen, isEditProfileOpen } = useGeneralStore();

  return (
    <ClientOnly>
      {isLoginOpen ? <AuthOverlay /> : null}
      {isEditProfileOpen ? <EditProfileOverlay /> : null}
    </ClientOnly>
  );
}
