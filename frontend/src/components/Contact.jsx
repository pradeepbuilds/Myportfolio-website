import { useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { profile } from "../data/profile";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-8 bg-surface/40">
      <div className="max-w-3xl mx-auto">
        <SectionLabel index="04" title="Contact" />
        <p className="text-muted mb-10 max-w-xl">
          Have a role, project, or just want to talk shop? Send a message —
          I read every one.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="font-mono text-xs text-muted uppercase tracking-widest">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="focus-ring mt-2 w-full bg-bg border border-border px-4 py-3 text-ink placeholder:text-muted/50 focus:border-accent outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-mono text-xs text-muted uppercase tracking-widest">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="focus-ring mt-2 w-full bg-bg border border-border px-4 py-3 text-ink placeholder:text-muted/50 focus:border-accent outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="font-mono text-xs text-muted uppercase tracking-widest">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="focus-ring mt-2 w-full bg-bg border border-border px-4 py-3 text-ink placeholder:text-muted/50 focus:border-accent outline-none transition-colors resize-none"
              placeholder="What's on your mind?"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="focus-ring px-6 py-3 bg-accent text-bg font-medium hover:bg-ink transition-colors disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "sent" && (
            <p className="font-mono text-sm text-accent">
              ✓ Message sent. Thanks for reaching out!
            </p>
          )}
          {status === "error" && (
            <p className="font-mono text-sm text-red-400">
              ✕ Something went wrong. Email me directly at {profile.email}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
