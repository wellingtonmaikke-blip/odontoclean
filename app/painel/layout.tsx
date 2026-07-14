"use client";

import DashboardShell from "@/components/DashboardShell";

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="clinica">{children}</DashboardShell>;
}
