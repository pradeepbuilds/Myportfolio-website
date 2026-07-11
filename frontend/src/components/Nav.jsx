import { useEffect, useState } from "react";

const links = [
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-bg/90 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-display font-semibold text-ink tracking-tight">
          pradeep<span className="text-accent">.</span>dev
        </a>

        <ul className="hidden md:flex items-center gap-8 font-mono text-sm text-muted">
          {links.map((l, i) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="focus-ring hover:text-ink transition-colors"
              >
                <span className="text-accent">0{i + 1}.</span> {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-ink focus-ring"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="font-mono text-sm">{open ? "close" : "menu"}</span>
        </button>
      </nav>

      {open && (
        <ul className="md:hidden flex flex-col gap-1 px-6 pb-4 font-mono text-sm text-muted bg-bg border-b border-border">
          {links.map((l, i) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="block py-2 focus-ring hover:text-ink"
                onClick={() => setOpen(false)}
              >
                <span className="text-accent">0{i + 1}.</span> {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
