import type { Metadata } from "next";
export const metadata: Metadata = { title: "Impressum" };
export default function ImpressumPage() {
  return (
    <section className="pt-24 pb-32 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-black text-text-primary mb-8">Impressum</h1>
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-6 text-text-secondary text-sm leading-relaxed">
          <div>
            <h2 className="text-text-primary font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
            <p>Medyon GmbH<br />Musterstraße 1<br />12345 Musterstadt</p>
          </div>
          <div>
            <h2 className="text-text-primary font-semibold mb-2">Kontakt</h2>
            <p>E-Mail: <a href="mailto:info@medyon.de" className="text-teal hover:underline">info@medyon.de</a></p>
          </div>
          <div>
            <h2 className="text-text-primary font-semibold mb-2">Registereintrag</h2>
            <p>Eingetragen im Handelsregister.<br />Registergericht: Amtsgericht Musterstadt<br />Registernummer: HRB 00000</p>
          </div>
          <div>
            <h2 className="text-text-primary font-semibold mb-2">Umsatzsteuer-ID</h2>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE000000000</p>
          </div>
        </div>
      </div>
    </section>
  );
}
