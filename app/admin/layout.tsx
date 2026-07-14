"use client";

import { usePathname } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // A página de login administrativa não deve ser envolvida pelo shell protegido.
  if (pathname === "/admin/login") return <>{children}</>;
  return <DashboardShell role="admin">{children}</DashboardShell>;
}
