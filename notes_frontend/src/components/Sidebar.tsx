"use client";

import React from "react";
import Link from "next/link";

/**
 * PUBLIC_INTERFACE
 * Sidebar navigation component for quick links.
 */
const Sidebar: React.FC = () => (
  <aside className="bg-secondary/10 border-r border-secondary/20 flex flex-col gap-4 p-6 min-w-[180px] h-full">
    <Link href="/" className="font-bold text-primary text-lg mb-8 tracking-wide">
      Notes
    </Link>
    <nav className="flex flex-col gap-2">
      <Link href="/" className="hover:underline underline-offset-4">All Notes</Link>
      <Link href="/new" className="hover:underline underline-offset-4 text-accent">+ New Note</Link>
    </nav>
  </aside>
);

export default Sidebar;
