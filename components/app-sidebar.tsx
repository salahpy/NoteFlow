"use client"

import React, { useEffect, useState } from "react"
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs"
import NewDocButton from "./NewDocButton"
import { collectionGroup, DocumentData, query, where } from "firebase/firestore"
import { db } from "@/firebase"
import { useCollection } from "react-firebase-hooks/firestore"

export interface RoomDocument extends DocumentData {
  createdAt: string
  role: "owner" | "editor"
  roomId: string
  userId: string
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser()
  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  )

  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[]
    editor: RoomDocument[]
  }>({
    owner: [],
    editor: [],
  })
  useEffect(() => {
    if (groupedData.owner.length > 0) {
      console.log(groupedData.owner[0].role) // Log it outside JSX
    }
  }, [groupedData])
  useEffect(() => {
    if (!data) return

    const grouped = data.docs.reduce<{
      owner: RoomDocument[]
      editor: RoomDocument[]
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument

        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          })
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          })
        }
        return acc
      },
      {
        owner: [],
        editor: [],
      }
    )

    setGroupedData(grouped)
  }, [data])

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a className="items-center flex text-center">
                <div>
                  <div className="font-semibold text-lg ">
                    <SignedOut>
                      <SignInButton />
                    </SignedOut>
                  </div>
                  <div className="pl-2">
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                  </div>
                </div>
                <div className="flex leading-tight">
                  <span className="truncate font-semibold text-lg pl-1">
                    {user && (
                      <h1>
                        {user?.firstName}
                        {`'s`} Space
                      </h1>
                    )}
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="flex flex-col justify-center items-center">
          <NewDocButton />

          <SidebarGroup>
            <NavMain items={groupedData.owner} role="owner" />
            <NavMain items={groupedData.editor} role="editor" />
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
