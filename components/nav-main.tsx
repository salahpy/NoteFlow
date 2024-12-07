"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { RoomDocument } from "./app-sidebar"
import SubItem from "./SubItem"

export function NavMain({
  items,
  role,
}: {
  items: RoomDocument[]
  role: string
}) {
  return (
      <SidebarMenu>
        <Collapsible key={role} asChild defaultOpen={items.length > 0}>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <span>{role === "owner" ? "Private" : "Shared"} </span>
            </SidebarMenuButton>
            <CollapsibleTrigger asChild>
              <SidebarMenuAction className="data-[state=open]:rotate-90">
                <ChevronRight />
                <span className="sr-only">Toggle</span>
              </SidebarMenuAction>
            </CollapsibleTrigger>
            {items?.map((doc) => (
              <SubItem id={doc.id} document={doc} />
            ))}
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
  )
}
