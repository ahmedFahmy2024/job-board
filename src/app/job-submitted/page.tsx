import H1 from '@/components/jobsComponent/H1'
import React from 'react'

const page = () => {
  return (
    <main className='m-auto max-w-5xl my-10 space-y-5 px-3 text-center'>
        <H1>Job submitted</H1>
        <p>Your job posting has been submitted, and is awaiting review.</p>
    </main>
  )
}

export default page