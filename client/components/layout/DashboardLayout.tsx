// client/components/layout/DashboardLayout.tsx
import React from "react";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: "/specialists", label: "Specialists" }
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f4f4f6] text-[#222222] flex">

      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-[#0c1b3f] text-white flex flex-col">

        {/* Company / profile header */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="text-xs opacity-70">Profile</div>
          <div className="mt-1 font-semibold text-sm">Gwen Lam</div>
          <div className="text-[11px] opacity-70">
            ST Comp Holdings Sdn Bhd
          </div>
        </div>

        {/* Main nav */}
        <nav className="flex-1 px-2 py-4 text-sm space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}   {/* 🔥 MUST ADD TO STOP PREFETCH */}
              className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-white/10"
            >
              <span className="h-3 w-3 rounded-sm bg-white/60" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom items */}
        <div className="px-4 py-4 border-t border-white/10 text-xs space-y-2">
          <button className="block w-full text-left hover:underline">
            Help
          </button>
          <button className="block w-full text-left hover:underline">
            Settings
          </button>
        </div>
      </aside>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-white flex items-center justify-between px-8">
          <div>
            <div className="text-xs text-gray-500">Dashboard / Services</div>
            <div className="text-sm font-semibold">Services</div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search the app"
                className="h-9 w-64 rounded-full border border-gray-300 pl-9 pr-3 text-xs outline-none focus:border-gray-500"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                🔍
              </span>
            </div>

            <button className="h-9 w-9 rounded-full bg-gray-800 text-white text-xs flex items-center justify-center">
              N
            </button>
          </div>
        </header>

        <main className="flex-1 px-8 py-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
