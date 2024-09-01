"use client";

import { Job } from "@prisma/client";
import ButtonSubmit from "../jobsComponent/ButtonSubmit";
import { useFormState } from "react-dom";
import { approveSubmission, rejectSubmission } from "@/app/admin/action";

interface AdminSidebarProps {
  job: Job;
}

const AdminSidebar = ({ job }: AdminSidebarProps) => {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? (
        <span className="text-center font-semibold text-green-500">
          Approved
        </span>
      ) : (
        <ApprovedSubmissionButton jobId={job.id} />
      )}
      <DeleteJobButton jobId={job.id} />
    </aside>
  );
};

export default AdminSidebar;

interface AdminButtonProps {
  jobId: number;
}

function ApprovedSubmissionButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(approveSubmission, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <ButtonSubmit className="w-full bg-green-500 hover:bg-green-600">
        Approve
      </ButtonSubmit>
      {formState?.error && (
        <span className="text-sm text-red-500">{formState.error}</span>
      )}
    </form>
  );
}

function DeleteJobButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(rejectSubmission, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <ButtonSubmit className="w-full bg-red-500 hover:bg-red-600">
        Delete
      </ButtonSubmit>
      {formState?.error && (
        <span className="text-sm text-red-500">{formState.error}</span>
      )}
    </form>
  );
}
