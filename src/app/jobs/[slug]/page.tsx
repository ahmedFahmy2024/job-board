import { cache } from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import JobDetailPage from "@/components/jobDetails/JobDetailPage";
import { Button } from "@/components/ui/button";

interface JobDetailProps {
  params: {
    slug: string;
  };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();
  return job;
});

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: {approved: true},
    select: { slug: true }
  });

  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params: { slug },
}: JobDetailProps): Promise<Metadata> {
  const job = await getJob(slug);
  return {
    title: job.title,
  };
}

const JobDetail = async ({ params: { slug } }: JobDetailProps) => {
  const job = await getJob(slug);
  const { applicationUrl, applicationEmail } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.log("Application link not found");
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobDetailPage job={job} />
      <aside>
        <Button asChild>
          <a href={applicationLink} className="w-40 md:w-fit">
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  );
};

export default JobDetail;
