import type { Metadata } from "next";
import { HomePage } from "@/components/sections/home-page";

export const metadata: Metadata = {
  title: "Vibe Coding Club",
  description:
    "Vibe Coding Club is a collaborative community focused on workshops, projects, and hands-on learning.",
};

export default function Page() {
  return <HomePage />;
}
