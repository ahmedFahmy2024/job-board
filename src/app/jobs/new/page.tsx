import NewJobForm from "@/components/newjobComponent/NewJobForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Post a new job',
}

const page = () => {
  return (
    <NewJobForm />
  )
}

export default page