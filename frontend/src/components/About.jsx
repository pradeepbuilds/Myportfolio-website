import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { profile } from "../data/profile";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionLabel index="01" title="About" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-[1fr_auto] gap-10 items-start"
        >
          <p className="text-muted text-lg leading-relaxed whitespace-pre-line max-w-2xl">
            {profile.about}
          </p>
          <div className="font-mono text-sm text-muted border border-border p-5 w-full sm:w-auto sm:min-w-[220px] overflow-x-auto">
            <p className="text-accent mb-2">const dev = &#123;</p>
            <p className="pl-4">base: "{profile.location}",</p>
            <p className="pl-4">focus: "SDE Internship",</p>
            <p className="pl-4">stack: "MERN",</p>
            <p className="text-accent">&#125;;</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
