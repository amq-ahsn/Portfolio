import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Send, CheckCircle2, Clock } from "lucide-react";

import PageHero from "../components/PageHero";
import { Reveal, GlassCard, GradientButton } from "../components/ui";
import { Github, Linkedin } from "../components/SocialIcons";
import { profile } from "../lib/data";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      await emailjs.send(
        "service_5nls0tv",
        "template_i3r61y4",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "uUUZX0XiNruumPani"
      );

      setSent(true);
      setForm({ name: "", email: "", message: "" });

      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        desc="Have a project, a role or just an idea? My inbox is always open — I usually reply within a day."
      />

      <section className="section-pad pb-24">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* FORM */}
          <Reveal>
            <GlassCard glow className="!p-8 md:!p-10">
              <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cyan-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                Control center · online
              </div>

              <form onSubmit={submit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted">
                      Name
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-cyan-400/50"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-cyan-400/50"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-cyan-400/50"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <GradientButton disabled={loading}>
                  {loading ? (
                    "Sending..."
                  ) : sent ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Message sent!
                    </>
                  ) : (
                    <>
                      Send Message <Send className="h-4 w-4" />
                    </>
                  )}
                </GradientButton>

                {sent && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-cyan-300"
                  >
                    Thanks! I'll get back to you shortly.
                  </motion.p>
                )}

                {error && (
                  <motion.p className="text-sm text-red-400">
                    {error}
                  </motion.p>
                )}
              </form>
            </GlassCard>
          </Reveal>

          {/* SIDE INFO */}
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <GlassCard glow>
                <p className="text-xs uppercase tracking-wider text-muted">
                  Direct
                </p>

                <a
                  href={`mailto:${profile.email}`}
                  className="mt-3 flex items-center gap-3 text-sm hover:text-cyan-300"
                >
                  <Mail className="h-4 w-4 text-cyan-300" />
                  {profile.email}
                </a>

                <p className="mt-3 flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-cyan-300" />
                  {profile.location}
                </p>

                <p className="mt-3 flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-cyan-300" />
                  Replies within 24 hours
                </p>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.15}>
              <GlassCard glow>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                  </span>
                  <p className="text-sm font-semibold text-green-300">
                    Available for new projects
                  </p>
                </div>

                <p className="mt-3 text-sm text-muted">
                  Currently booking work for Q3. Freelance, contract and full-time
                  opportunities welcome.
                </p>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.2}>
              <GlassCard glow>
                <p className="text-xs uppercase tracking-wider text-muted">
                  Social
                </p>

                <div className="mt-4 flex gap-3">
                  {[
                    { icon: Github, href: profile.socials.github },
                    { icon: Linkedin, href: profile.socials.linkedin },
                  ].map(({ icon: Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-cyan-400/50 hover:text-cyan-300"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}