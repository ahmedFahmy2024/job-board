import AdminSidebar from "@/components/adminComponent/AdminSidebar";
import JobDetailPage from "@/components/jobDetails/JobDetailPage";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface pageProps {
  params: { slug: string };
}

const page = async ({ params: { slug } }: pageProps) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return (
    <main className="m-auto my-10 max-w-5xl px-3 flex flex-col items-center gap-5 md:flex-row md:items-start">
        <JobDetailPage job={job} />
        <AdminSidebar job={job} />
    </main>
  )
};

export default page;
