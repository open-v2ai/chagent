"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import { PlusCircleIcon, Command } from "lucide-react"
import { useTranslations } from 'next-intl';

import { NavChatList } from "@/components/sidebar/nav-chat-list"
import { NavUser } from "@/components/sidebar/nav-user"
import { Avatar } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenuBadge,
} from "@/components/ui/sidebar"
import type { Chat } from "@/app/[locale]/types"; 

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onSelectChat?: (chat: Chat) => void;
  onNewChat?: () => void;
  chats: Chat[];
  currentChatId?: number;
}

export function AppSidebar({ onSelectChat, onNewChat, chats, currentChatId, ...props }: AppSidebarProps) {
  const t = useTranslations();
  const [email] = useState('not_found@example.com');

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center justify-left h-10">
                <Avatar className="h-10 w-10 rounded-lg">
                  <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="cursor-pointer"
                  />
                </Avatar>
                <div className="text-2xl font-light relative ml-4">
                  <span className="text-black">ChAgent</span>
                  <span className="absolute -top-1 -right-7 text-[8px] text-gray-500 px-2 py-0.5 rounded font-light ml-2 select-none">BETA</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            {/* 新建聊天按钮 */}
            <SidebarMenuButton
              tooltip="New Chat"
              className="text-purple-500 text-lg duration-200 hover:text-purple-800"
              onClick={onNewChat}
            >
              <PlusCircleIcon />
              <span>{t('NEW_CHAT')}</span>
              <SidebarMenuBadge className="ml-2 flex items-center gap-1 text-xs text-gray-300">
                <Command className="w-3 h-3" />
                <span>N</span>
              </SidebarMenuBadge>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="border-y">
        {/* 聊天列表，点击时调用 onSelectChat */}
        <NavChatList
          chats={chats}
          onSelectChat={onSelectChat}
          currentChatId={currentChatId}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: email.split('@')[0], email: email }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
