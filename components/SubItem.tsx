import React from "react"
import { CollapsibleContent } from "./ui/collapsible"
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { doc } from "firebase/firestore"
import { db } from "@/firebase"
import { RoomDocument } from "./app-sidebar"

const SubItem = ({ document, id }: { document: RoomDocument; id: string }) => {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id))

  return (
    <>
      <CollapsibleContent>
        <SidebarMenuSub>
          <SidebarMenuSubItem key={document.id}>
            <SidebarMenuSubButton asChild>
              <a href={`/doc/${document.id}`}>
                <span>{data?.title}</span>
              </a>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </CollapsibleContent>
    </>
  )
}

export default SubItem
