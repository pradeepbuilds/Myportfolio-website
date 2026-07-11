import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="py-10 px-6 md:px-8 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React & Express.</p>
        <div className="flex gap-6">
          {profile.socials.github && (
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="focus-ring hover:text-accent transition-colors">
              GitHub
            </a>
          )}
          {profile.socials.linkedin && (
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="focus-ring hover:text-accent transition-colors">
              LinkedIn
            </a>
          )}
          <a href={`mailto:${profile.email}`} className="focus-ring hover:text-accent transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
