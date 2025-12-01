"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  FileText,
  PenTool,
  MessageSquare,
  Receipt,
  HelpCircle,
  Settings,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/specialists", label: "Specialists", icon: Users },
    // { href: "/clients", label: "Clients", icon: Users },
    // { href: "/service-orders", label: "Service Orders", icon: FileText },
    // { href: "/esignature", label: "eSignature", icon: PenTool },
    // { href: "/messages", label: "Messages", icon: MessageSquare },
    // { href: "/invoices", label: "Invoices & Receipts", icon: Receipt },
  ];

  return (
    <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
      {/* Top user block */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          <div className="flex-1">
            <div className="text-sm">Gwen Lam</div>
            <div className="text-xs text-gray-500">
              GT Comp Holdings Sdn Bhd
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 py-2 text-xs text-gray-500">Dashboard</div>

      {/* Main menu */}
      <nav className="flex-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 text-sm transition
                ${
                  isActive
                    ? "bg-[#001B49] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 pb-3 border-t border-gray-200 pt-3">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 mb-1">
          <HelpCircle size={18} />
          <span className="text-sm">Help</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
          <Settings size={18} />
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
}
