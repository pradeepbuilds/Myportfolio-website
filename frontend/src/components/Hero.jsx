import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";

const roles = ["Full Stack Developer", "MERN Stack Engineer", "DSA Enthusiast"];

export default function Hero() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = deleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        } else {
          setDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-16 px-6 md:px-8 overflow-hidden"
    >
      {/* ambient grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#F5C518 1px, transparent 1px), linear-gradient(90deg, #F5C518 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at 50% 45%, black, transparent 65%)",
        }}
      />

      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-[1fr_auto] items-center gap-10 md:gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative justify-self-center md:order-2 md:justify-self-end"
        >
          <div
            className="absolute -inset-4 rounded-full blur-2xl opacity-30"
            style={{ background: "radial-gradient(circle, #F5C518, transparent 70%)" }}
          />
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full p-[3px] bg-gradient-to-br from-accent via-accent/40 to-transparent">
            <div className="w-full h-full rounded-full overflow-hidden bg-bg">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-accent text-bg font-mono text-[9px] sm:text-[10px] px-2 py-1 rounded-full whitespace-nowrap">
            available_for_hire
          </span>
        </motion.div>

        <div className="text-center md:text-left md:order-1">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold text-ink leading-[1.05] tracking-tight"
        >
          {profile.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 h-9 font-mono text-lg md:text-xl text-muted"
        >
          {text}
          <span className="inline-block w-2 h-5 bg-accent ml-1 animate-blink align-middle" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl mx-auto md:mx-0 text-muted text-base md:text-lg leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap justify-center md:justify-start gap-4"
        >
          <a
            href="#projects"
            className="focus-ring px-6 py-3 bg-accent text-bg font-medium rounded-none hover:bg-ink transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="focus-ring px-6 py-3 border border-border text-ink font-medium hover:border-accent transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-muted animate-pulse hidden md:block">
        scroll ↓
      </div>
    </section>
  );
}
