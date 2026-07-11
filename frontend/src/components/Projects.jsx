import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ok | error

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section id="projects" className="py-24 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionLabel index="03" title="Projects" />

        {status === "loading" && (
          <p className="font-mono text-sm text-muted">fetching projects...</p>
        )}

        {status === "error" && <ComingSoon />}

        {status === "ok" && projects.length === 0 && <ComingSoon />}

        {status === "ok" && projects.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group border border-border p-6 flex flex-col justify-between hover:border-accent transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="font-mono text-[10px] text-accent border border-accent/40 px-2 py-0.5 uppercase tracking-widest">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-muted text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs text-muted bg-surface px-2 py-1 border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 font-mono text-sm">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring text-ink border-b border-transparent group-hover:border-accent transition-colors"
                    >
                      GitHub →
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring text-ink border-b border-transparent group-hover:border-accent transition-colors"
                    >
                      Live →
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ComingSoon() {
  const placeholders = [
    { label: "In Progress", note: "A full-stack MERN build, currently in development." },
    { label: "Planned", note: "Next up — details drop once it ships." },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {placeholders.map((p, i) => (
        <motion.div
          key={p.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="relative border border-dashed border-border p-6 flex flex-col justify-between min-h-[200px] overflow-hidden group"
        >
          <div
            className="absolute inset-0 opacity-[0.4] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, #232326 0, #232326 1px, transparent 1px, transparent 12px)",
            }}
          />
          <div className="relative">
            <span className="font-mono text-[10px] text-accent border border-accent/40 px-2 py-0.5 uppercase tracking-widest">
              {p.label}
            </span>
            <h3 className="font-display text-xl font-semibold text-ink mt-4">
              Project coming soon
            </h3>
            <p className="text-muted text-sm leading-relaxed mt-2">{p.note}</p>
          </div>
          <span className="relative font-mono text-xs text-muted mt-6 inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-accent animate-pulse rounded-full" />
            building_in_public
          </span>
        </motion.div>
      ))}
    </div>
  );
}
