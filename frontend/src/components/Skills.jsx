import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { profile } from "../data/profile";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-8 bg-surface/40">
      <div className="max-w-5xl mx-auto">
        <SectionLabel index="02" title="Skills" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="border border-border p-6 hover:border-accent/60 transition-colors"
            >
              <h3 className="font-mono text-accent text-xs uppercase tracking-widest mb-4">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-ink/90 bg-bg border border-border px-3 py-1.5 font-mono"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
