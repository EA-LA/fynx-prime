import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Lock, Globe2, TrendingUp } from "lucide-react";
import { challengeConfigs, accountStyles, tradingCurrencies, marketCategories } from "@/lib/challengeConfig";

type PhaseType = "1-phase" | "2-phase" | "3-phase";

export default function ChallengeBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [accountIdx, setAccountIdx] = useState(1); // default $10K
  const [phaseType, setPhaseType] = useState<PhaseType>("2-phase");
  const [style, setStyle] = useState<"normal" | "swing">("normal");
  const [currency, setCurrency] = useState("USD");
  const [agreed, setAgreed] = useState(false);

  const config = challengeConfigs[accountIdx];
  const phaseConfig = config.phases[phaseType];

  const steps = [
    "Account Size",
    "Phase Type",
    "Trading Style",
    "Currency",
    "Market Access",
    "Review & Create",
  ];

  const canNext = () => {
    if (step === 5) return agreed;
    return true;
  };

  const handleCreate = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold tracking-tight">
            FYNX<span className="text-muted-foreground font-light ml-1">Funded</span>
          </Link>
          <Link to="/challenges" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> Back to Challenges
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Challenge Builder</h1>
        <p className="text-sm text-muted-foreground mb-8">Configure your evaluation in a few steps.</p>

        {/* Progress */}
        <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <button
                onClick={() => i <= step && setStep(i)}
                className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-secondary text-foreground" : "text-muted-foreground"
                }`}
              >
                {s}
              </button>
              {i < steps.length - 1 && <ArrowRight size={12} className="text-muted-foreground/40 shrink-0" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 animate-fade-in">
            {step === 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Choose Account Size</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {challengeConfigs.map((c, i) => (
                    <button
                      key={c.accountSize}
                      onClick={() => setAccountIdx(i)}
                      className={`premium-card text-center py-6 transition-all ${
                        accountIdx === i ? "border-foreground/40 bg-secondary/50" : ""
                      }`}
                    >
                      <p className="text-2xl font-bold">{c.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">${c.accountSize.toLocaleString()}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Choose Phase Type</h2>
                <div className="grid gap-3">
                  {(["1-phase", "2-phase", "3-phase"] as PhaseType[]).map((pt) => {
                    const pc = config.phases[pt];
                    return (
                      <button
                        key={pt}
                        onClick={() => setPhaseType(pt)}
                        className={`premium-card text-left transition-all ${
                          phaseType === pt ? "border-foreground/40 bg-secondary/50" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold capitalize">{pt.replace("-", " ")}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Targets: {pc.profitTargets.join(" → ")} · Split: {pc.profitSplit} · ${pc.price}
                            </p>
                          </div>
                          {phaseType === pt && <Check size={16} className="text-foreground" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Choose Trading Style</h2>
                <div className="grid gap-3">
                  {accountStyles.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id as "normal" | "swing")}
                      className={`premium-card text-left transition-all ${
                        style === s.id ? "border-foreground/40 bg-secondary/50" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{s.label}</p>
                          <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                        </div>
                        {style === s.id && <Check size={16} />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Choose Account Currency</h2>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {tradingCurrencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`text-sm font-medium py-2.5 rounded-md border transition-colors ${
                        currency === c
                          ? "border-foreground/40 bg-secondary text-foreground"
                          : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  <Globe2 size={12} className="inline mr-1" />
                  Traders may trade all supported currency pairs within enabled markets.
                  Forex pairs are fully available. Additional currency instruments will be enabled as new markets launch.
                </p>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Market Access</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {marketCategories.map((m) => (
                    <div
                      key={m.id}
                      className={`premium-card text-center py-5 transition-all ${
                        m.available ? "border-foreground/30 bg-secondary/30" : "opacity-50"
                      }`}
                    >
                      {m.available ? (
                        <TrendingUp size={18} className="mx-auto mb-2 text-foreground" />
                      ) : (
                        <Lock size={18} className="mx-auto mb-2 text-muted-foreground/50" />
                      )}
                      <p className="text-sm font-medium">{m.label}</p>
                      {m.available ? (
                        <span className="text-xs text-foreground/70 mt-1 inline-block">Available</span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground/60 mt-1 inline-block border border-border rounded px-1.5 py-0.5">Coming Soon</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Traders will be able to trade all supported global currencies and instruments under each market category.
                  Forex is currently live. Other markets are marked Coming Soon and will be enabled as the platform expands.
                </p>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Review & Create</h2>
                <div className="premium-card space-y-3 text-sm">
                  <Row label="Account Size" value={`$${config.accountSize.toLocaleString()} (${config.label})`} />
                  <Row label="Phase Type" value={phaseType.replace("-", " ")} />
                  <Row label="Style" value={style === "normal" ? "Normal" : "Swing"} />
                  <Row label="Currency" value={currency} />
                  <Row label="Market" value="Forex" />
                  <div className="glow-line my-4" />
                  <Row label="Profit Targets" value={phaseConfig.profitTargets.join(" → ")} />
                  <Row label="Daily Loss Limit" value={phaseConfig.dailyLoss} />
                  <Row label="Max Loss Limit" value={phaseConfig.maxLoss} />
                  <Row label="Min Trading Days" value={`${phaseConfig.minDays} days`} />
                  <Row label="Profit Split" value={phaseConfig.profitSplit} />
                  <Row label="Leverage (Forex)" value={phaseConfig.leverageForex} />
                  <Row label="Fee Refund" value={phaseConfig.refundEligible ? "Yes — on first payout" : "No"} />
                  <div className="glow-line my-4" />
                  <Row label="Price" value={`$${phaseConfig.price}`} highlight />
                </div>

                <label className="flex items-start gap-3 mt-6 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 accent-foreground"
                  />
                  <span className="text-muted-foreground">
                    I agree to the{" "}
                    <Link to="/terms" className="text-foreground underline">Terms & Conditions</Link>,{" "}
                    <Link to="/risk-disclosure" className="text-foreground underline">Risk Disclosure</Link>, and{" "}
                    <Link to="/refund-policy" className="text-foreground underline">Refund Policy</Link>.
                  </span>
                </label>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 flex items-center gap-1"
              >
                <ArrowLeft size={14} /> Back
              </button>
              {step < 5 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1"
                >
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleCreate}
                  disabled={!agreed}
                  className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40"
                >
                  Create Challenge
                </button>
              )}
            </div>
          </div>

          {/* Sticky summary */}
          <div className="hidden lg:block">
            <div className="sticky top-6">
              <div className="premium-card">
                <h3 className="text-sm font-semibold mb-4">Summary</h3>
                <div className="space-y-2 text-sm">
                  <MiniRow label="Size" value={config.label} />
                  <MiniRow label="Phase" value={phaseType.replace("-", " ")} />
                  <MiniRow label="Style" value={style} />
                  <MiniRow label="Currency" value={currency} />
                  <MiniRow label="Market" value="Forex" />
                  <div className="glow-line my-3" />
                  <MiniRow label="Target" value={phaseConfig.profitTargets.join(" → ")} />
                  <MiniRow label="Daily Loss" value={phaseConfig.dailyLoss} />
                  <MiniRow label="Max Loss" value={phaseConfig.maxLoss} />
                  <MiniRow label="Split" value={phaseConfig.profitSplit} />
                  <div className="glow-line my-3" />
                  <div className="flex justify-between">
                    <span className="font-semibold">Price</span>
                    <span className="text-lg font-bold">${phaseConfig.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? "text-lg font-bold" : "font-medium"}>{value}</span>
    </div>
  );
}

function MiniRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium capitalize">{value}</span>
    </div>
  );
}
