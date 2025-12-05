import React, { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const panelRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (!open) return;
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "What's New", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <header className="bg-gray-900 text-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-600 text-white font-bold">
                B
              </span>
              <span className="text-lg font-semibold text-white">Olcademy</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-indigo-400 px-2 py-1 rounded-md transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="dark:bg-indigo-400 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-800 text-gray-100 hover:bg-gray-700 transition"
            >
              {theme === "dark" ? (
                <>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                  <span className="hidden sm:inline">Dark</span>
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5V2m0 20v-2.5M4.5 12H2m20 0h-2.5M5.64 5.64L4.22 4.22m15.56 15.56l-1.42-1.42M5.64 18.36L4.22 19.78m15.56-15.56l-1.42 1.42M12 7.5A4.5 4.5 0 1012 16.5 4.5 4.5 0 0012 7.5z" />
                  </svg>
                  <span className="hidden sm:inline">Light</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme toggle small */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md bg-gray-800 text-gray-100 hover:bg-gray-700"
            >
              {theme === "dark" ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5V2m0 20v-2.5M4.5 12H2m20 0h-2.5M5.64 5.64L4.22 4.22m15.56 15.56l-1.42-1.42M5.64 18.36L4.22 19.78m15.56-15.56l-1.42 1.42M12 7.5A4.5 4.5 0 1012 16.5 4.5 4.5 0 0012 7.5z" />
                </svg>
              )}
            </button>

            <button
              ref={btnRef}
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-gray-300 hover:text-indigo-400"
            >
              {open ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div
            ref={panelRef}
            className="md:hidden bg-gray-800 rounded-lg shadow-lg px-4 py-5 mb-4 display: block;"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-gray-200 hover:text-indigo-400 px-2 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
