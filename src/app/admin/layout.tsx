import AdminNavBar from "@/components/adminComponent/AdminNavBar";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <AdminNavBar />
      {children}
    </ClerkProvider>
  );
}
