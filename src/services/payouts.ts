// ═══════════════════════════════════════════════════════════
// PAYOUT + KYC SERVICE — Provider-ready
// ═══════════════════════════════════════════════════════════

import { dataService } from "./database";
import type { PayoutRequest, PayoutStatus, KycStatus, User } from "./types";

// ── KYC ───────────────────────────────────────────────────

export async function getKycStatus(userId: string): Promise<KycStatus> {
  const user = await dataService.getUser(userId);
  return user?.kycStatus || "not_started";
}

export async function updateKycStatus(userId: string, status: KycStatus): Promise<void> {
  // 🔌 Replace with: KYC provider webhook handler
  await dataService.updateUser(userId, { kycStatus: status });
}

export async function canRequestPayout(userId: string, emailVerified?: boolean): Promise<{ allowed: boolean; reason?: string }> {
  if (emailVerified === false) {
    return { allowed: false, reason: "Email verification is required before requesting a payout." };
  }
  const kyc = await getKycStatus(userId);
  if (kyc !== "verified") {
    return { allowed: false, reason: "KYC verification must be completed before requesting a payout." };
  }
  return { allowed: true };
}

// ── Payouts ───────────────────────────────────────────────

export async function requestPayout(input: {
  userId: string;
  accountId: string;
  amount: number;
  method: string;
}): Promise<PayoutRequest> {
  const eligibility = await canRequestPayout(input.userId);
  if (!eligibility.allowed) {
    throw new Error(eligibility.reason);
  }

  return dataService.createPayout({
    ...input,
    status: "requested",
    requestedAt: new Date().toISOString(),
  });
}

export async function approvePayout(payoutId: string): Promise<void> {
  await dataService.updatePayoutStatus(payoutId, "approved");
}

export async function denyPayout(payoutId: string): Promise<void> {
  await dataService.updatePayoutStatus(payoutId, "denied");
}

export async function markPayoutPaid(payoutId: string): Promise<void> {
  await dataService.updatePayoutStatus(payoutId, "paid");
}

export async function blockPayout(payoutId: string, reason: string, blockedBy: string): Promise<void> {
  await dataService.blockPayout(payoutId, reason, blockedBy);
}

export async function getUserPayouts(userId: string): Promise<PayoutRequest[]> {
  return dataService.getPayouts(userId);
}
