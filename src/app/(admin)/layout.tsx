import React from "react";
import AdminShell from "@/components/admin/AdminShell";
import SessionWrapper from "@/components/admin/SessionWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <AdminShell>{children}</AdminShell>
    </SessionWrapper>
  );
}
