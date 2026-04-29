import type { Metadata } from "next";
export const metadata: Metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <section className="pt-24 pb-32 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-black text-text-primary mb-8">Datenschutzerklärung</h1>
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-8 text-text-secondary text-sm leading-relaxed">

          <div>
            <h2 className="text-text-primary font-semibold mb-3">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-text-primary font-medium mb-2">Allgemeine Hinweise</h3>
            <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
          </div>

          <div>
            <h2 className="text-text-primary font-semibold mb-3">2. Verantwortlicher</h2>
            <p>Medyon GmbH<br />Musterstraße 1<br />12345 Musterstadt<br /><br />E-Mail: <a href="mailto:info@medyon.de" className="text-teal hover:underline">info@medyon.de</a></p>
          </div>

          <div>
            <h2 className="text-text-primary font-semibold mb-3">3. Datenerfassung auf dieser Website</h2>
            <h3 className="text-text-primary font-medium mb-2">Cookies</h3>
            <p className="mb-4">Diese Website verwendet keine Tracking-Cookies. Es werden ausschließlich technisch notwendige Cookies verwendet, die für den Betrieb der Website erforderlich sind.</p>
            <h3 className="text-text-primary font-medium mb-2">Server-Log-Dateien</h3>
            <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.</p>
          </div>

          <div>
            <h2 className="text-text-primary font-semibold mb-3">4. Kontaktformular</h2>
            <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
          </div>

          <div>
            <h2 className="text-text-primary font-semibold mb-3">5. Ihre Rechte</h2>
            <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</p>
          </div>

          <div>
            <h2 className="text-text-primary font-semibold mb-3">6. Beschwerderecht</h2>
            <p>Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde in datenschutzrechtlichen Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem unser Unternehmen seinen Sitz hat.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
