import React, { useTransition } from "react"
import { Button } from "./ui/button"
import { createNewDocument } from "@/actions/actions"
import { useRouter } from "next/navigation"

const NewDocButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    })
  }
  return (
    <div className="pt-7 pb-4">
      <Button onClick={handleCreateNewDocument} disabled={isPending} className="py-5 w-[12rem]">
        { isPending ? 'Creating...' : 'New Document'}</Button>
    </div>
  )
}

export default NewDocButton
