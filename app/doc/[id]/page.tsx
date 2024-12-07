"use client"

import Document from "@/components/DocumentPage"

const page = ({
  params: {id},
}: {
  params: {
    id: string
  }
}) => {
  return (
  <div className="flex flex-col flex-1 min-h-screen">

    <Document id={id}></Document>
    </div>
)}

export default page
