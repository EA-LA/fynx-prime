import { Award, Download, FileText } from "lucide-react";

interface CertificateData {
  id: string;
  accountId: string;
  challengeType: string;
  startDate: string;
  status: "Active" | "Passed" | "Failed";
  rulesSnapshot: {
    profitTarget: string;
    dailyLoss: string;
    maxLoss: string;
    minDays: number;
    profitSplit: string;
  };
  userName?: string;
  passDate?: string;
}

// Empty by default — populated when user passes a challenge
const certificates: CertificateData[] = [];

export default function Certificates() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Certificates</h1>
        <p className="text-sm text-muted-foreground mt-1">Your achievements, account info, and milestones.</p>
      </div>

      {certificates.length > 0 ? (
        <div className="space-y-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="premium-card">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="flex-1 space-y-4">
                  {/* Account info */}
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <FileText size={18} className="text-muted-foreground" />
                      {cert.challengeType}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 text-sm">
                      <InfoRow label="Account ID" value={cert.accountId} />
                      <InfoRow label="Start Date" value={cert.startDate} />
                      <InfoRow label="Status" value={cert.status} />
                    </div>
                  </div>

                  {/* Rules snapshot */}
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Rules Snapshot (Frozen at Start)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm">
                      <InfoRow label="Profit Target" value={cert.rulesSnapshot.profitTarget} />
                      <InfoRow label="Daily Loss" value={cert.rulesSnapshot.dailyLoss} />
                      <InfoRow label="Max Loss" value={cert.rulesSnapshot.maxLoss} />
                      <InfoRow label="Min Days" value={`${cert.rulesSnapshot.minDays}`} />
                      <InfoRow label="Profit Split" value={cert.rulesSnapshot.profitSplit} />
                    </div>
                  </div>

                  {/* Certificate (only if passed) */}
                  {cert.status === "Passed" && cert.userName && (
                    <div className="border border-border rounded-md p-6 bg-secondary/20 text-center">
                      <Award size={32} className="mx-auto mb-3 text-foreground" />
                      <h3 className="text-xl font-bold">Funded Trader Certificate</h3>
                      <p className="text-sm text-muted-foreground mt-1">Awarded to</p>
                      <p className="text-lg font-semibold mt-1">{cert.userName}</p>
                      <p className="text-xs text-muted-foreground mt-3">
                        For successfully completing the {cert.challengeType} evaluation
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Passed on {cert.passDate}
                      </p>
                      <div className="mt-6 flex justify-center gap-12 text-xs text-muted-foreground">
                        <div className="text-center">
                          <div className="border-t border-foreground/30 pt-2 px-4">
                            <p className="font-medium text-foreground">Elham Amini</p>
                            <p>CEO</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="border-t border-foreground/30 pt-2 px-4">
                            <p className="font-medium text-foreground">Ahmad Romal</p>
                            <p>Co-Founder</p>
                          </div>
                        </div>
                      </div>
                      <button className="mt-6 inline-flex items-center gap-2 border border-border text-sm px-4 py-2 rounded-md hover:bg-secondary transition-colors">
                        <Download size={14} />
                        Download PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="premium-card text-center py-16">
          <Award size={40} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No certificates yet</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Pass a challenge to earn your Funded Trader Certificate. Your account info, rules snapshot, and certificate will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
