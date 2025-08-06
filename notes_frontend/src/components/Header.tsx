import React from "react";

// PUBLIC_INTERFACE
const Header: React.FC = () => (
  <header className="sticky top-0 z-10 w-full bg-background border-b border-secondary/20 flex items-center h-14 px-6 shadow-sm">
    <h1 className="text-xl text-primary font-semibold tracking-tight">
      Notes App
    </h1>
  </header>
);

export default Header;
