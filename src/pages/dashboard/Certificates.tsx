import { Award } from "lucide-react";

const certs = [
  { id: "CERT-001", title: "Funded Trader Certificate", account: "FX-10241", date: "2026-02-01" },
];

export default function Certificates() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Certificates</h1>
        <p className="text-sm text-muted-foreground mt-1">Your achievements and milestones.</p>
      </div>

      {certs.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {certs.map((cert) => (
            <div key={cert.id} className="premium-card hover-lift text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <Award size={28} className="text-foreground" />
              </div>
              <h3 className="font-semibold">{cert.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">Account: {cert.account}</p>
              <p className="text-xs text-muted-foreground">Issued: {cert.date}</p>
              <button className="mt-4 border border-border text-sm px-4 py-2 rounded-md hover:bg-secondary transition-colors">
                Download PDF
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="premium-card text-center py-16">
          <Award size={40} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No certificates yet. Pass a challenge to earn your first one.</p>
        </div>
      )}
    </div>
  );
}
