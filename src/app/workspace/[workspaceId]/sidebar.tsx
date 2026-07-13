"use client";

import { Home, MessagesSquare, Bell, LucideIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon: Icon, label, isActive }: SidebarItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-0.5 cursor-pointer group">
      <button
        className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
          isActive
            ? "bg-white/20 text-white"
            : "text-white/80 hover:bg-white/20 hover:text-white"
        }`}
      >
        <Icon className="size-5" />
      </button>
      <span className="text-[11px] text-white/80 group-hover:text-white font-medium">
        {label}
      </span>
    </div>
  );
};

export const Sidebar = () => {
  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4">
      <div className="mb-4 flex items-center justify-center">
        <UserButton />
      </div>
      
      <SidebarItem icon={Home} label="Home" isActive />
      <SidebarItem icon={MessagesSquare} label="DMs" />
      <SidebarItem icon={Bell} label="Activity" />
    </aside>
  );
};
