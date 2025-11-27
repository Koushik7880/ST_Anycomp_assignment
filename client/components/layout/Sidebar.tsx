// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { List, ListItemButton, ListItemText, Box } from "@mui/material";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  {
    label: "Specialists",
    href: "/specialists",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Box className="h-screen flex flex-col border-r border-gray-200 bg-white">
      <Box className="px-4 py-4 font-semibold text-lg">
        Anycomp Admin
      </Box>
      <List>
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              className={clsx(
                "rounded-none",
                active && "bg-gray-100 border-l-4 border-primary-500"
              )}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
