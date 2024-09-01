import H1 from "@/components/jobsComponent/H1";
import JobListItem from "@/components/jobsComponent/JobListItem";
import prisma from "@/lib/prisma";
import Link from "next/link";

const AdminPage = async () => {
  const unApprovedJobs = await prisma.job.findMany({
    where: { approved: false },
  });
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <H1 className="text-center">Admin Dashboard</H1>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Unapproved jobs:</h2>
        {unApprovedJobs.map((job) => (
          <Link className="block" key={job.id} href={`/admin/jobs/${job.slug}`}>
            <JobListItem job={job} />
          </Link>
        ))}
        {unApprovedJobs.length === 0 && (
          <p className="m-auto text-center text-muted-foreground md:text-left md:m-0">No unapproved jobs found.</p>
        )}
      </section>
    </main>
  );
};

export default AdminPage;
