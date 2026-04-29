"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate send (replace with real API/email action)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="glass-card rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
        <CheckCircle size={48} className="text-teal mb-4" />
        <h3 className="text-text-primary font-bold text-xl mb-2">Nachricht gesendet!</h3>
        <p className="text-text-muted text-sm max-w-xs">
          Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-text-secondary text-xs font-semibold uppercase tracking-wide">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="bg-night border border-white/10 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-magenta/60 transition-colors"
            placeholder="Max Mustermann"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="company" className="text-text-secondary text-xs font-semibold uppercase tracking-wide">
            Unternehmen
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="bg-night border border-white/10 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-magenta/60 transition-colors"
            placeholder="Muster GmbH"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-text-secondary text-xs font-semibold uppercase tracking-wide">
          E-Mail *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="bg-night border border-white/10 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-magenta/60 transition-colors"
          placeholder="max@muster.de"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-text-secondary text-xs font-semibold uppercase tracking-wide">
          Telefon
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="bg-night border border-white/10 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-magenta/60 transition-colors"
          placeholder="+49 123 456789"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-text-secondary text-xs font-semibold uppercase tracking-wide">
          Nachricht *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="bg-night border border-white/10 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-magenta/60 transition-colors resize-none"
          placeholder="Womit können wir Ihnen helfen?"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 bg-magenta text-white font-bold py-4 px-8 rounded-lg hover:bg-magenta-light transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(230,0,126,0.3)]"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Wird gesendet…
          </span>
        ) : (
          <>
            Nachricht senden
            <Send size={15} />
          </>
        )}
      </button>
    </form>
  );
}
