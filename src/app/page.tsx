import H1 from "@/components/jobsComponent/H1";
import JobFilterSidebar from "@/components/jobsComponent/JobFilterSidebar";
import JobResult from "@/components/jobsComponent/JobResult";
import { JobFilterValue } from "@/lib/validation";
import { Metadata } from "next";

interface pageProps {
  searchParams: {
    search?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
}

function getTitle({ search, type, location, remote }: JobFilterValue) {
  const titlePrefix = search
    ? `${search} jobs`
    : type
      ? `${type} developer jobs`
      : remote
        ? "Remote developer jobs"
        : "All developer jobs";

  const titleSuffix = location ? `in ${location}` : "";
  return `${titlePrefix} ${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { search, type, location, remote },
}: pageProps): Metadata {
  return {
    title: `${getTitle({ search, type, location, remote: remote === "true" })} | Flow Jobs`,
  };
}

export default async function Home({ searchParams }: pageProps) {
  const { search, type, location, remote, page } = searchParams;

  const filterValues: JobFilterValue = {
    search,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="mx-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your next dream job</p>
      </div>

      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResult filterValues={filterValues} page={page ? parseInt(page) : undefined} />
      </section>
    </main>
  );
}
