// ═══════════════════════════════════════════════════════════
// DATA SERVICE — Firestore production adapter
// ═══════════════════════════════════════════════════════════

import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc,
  query, where, addDoc, serverTimestamp, Timestamp,
} from "firebase/firestore";
import { db as firebaseDb, isFirebaseConfigured } from "@/lib/firebase";
import type {
  User, Order, Challenge, TradingAccount,
  Ticket, TicketMessage, PayoutRequest, AuditLog, RuleEvaluation,
} from "./types";

export interface DataService {
  // Users
  getUser(userId: string): Promise<User | null>;
  updateUser(userId: string, data: Partial<User>): Promise<void>;

  // Orders
  getOrders(userId: string): Promise<Order[]>;
  getOrder(orderId: string): Promise<Order | null>;
  createOrder(order: Omit<Order, "orderId">): Promise<Order>;
  updateOrderStatus(orderId: string, status: Order["status"]): Promise<void>;

  // Challenges
  getChallenges(userId: string): Promise<Challenge[]>;
  getChallenge(challengeId: string): Promise<Challenge | null>;
  createChallenge(challenge: Omit<Challenge, "challengeId">): Promise<Challenge>;

  // Trading Accounts
  getAccounts(userId: string): Promise<TradingAccount[]>;
  getAccount(accountId: string): Promise<TradingAccount | null>;

  // Tickets
  getTickets(userId: string): Promise<Ticket[]>;
  getTicket(ticketId: string): Promise<Ticket | null>;
  createTicket(ticket: Omit<Ticket, "ticketId" | "messages" | "updatedAt">): Promise<Ticket>;
  addTicketMessage(ticketId: string, message: Omit<TicketMessage, "id">): Promise<void>;
  updateTicketStatus(ticketId: string, status: Ticket["status"]): Promise<void>;

  // Payouts
  getPayouts(userId: string): Promise<PayoutRequest[]>;
  createPayout(payout: Omit<PayoutRequest, "payoutId">): Promise<PayoutRequest>;
  updatePayoutStatus(payoutId: string, status: PayoutRequest["status"]): Promise<void>;
  blockPayout(payoutId: string, reason: string, blockedBy: string): Promise<void>;

  // Rules / Audit
  getAuditLogs(accountId: string): Promise<AuditLog[]>;
  addAuditLog(log: Omit<AuditLog, "id">): Promise<void>;
  getRuleEvaluations(accountId: string): Promise<RuleEvaluation[]>;
}

// ── Firestore adapter ─────────────────────────────────────

function getDb() {
  if (!firebaseDb) throw new Error("Firestore not configured");
  return firebaseDb;
}

function tsToString(val: any): string {
  if (!val) return new Date().toISOString();
  if (val instanceof Timestamp) return val.toDate().toISOString();
  if (typeof val === "string") return val;
  return new Date().toISOString();
}

class FirestoreDataService implements DataService {
  // ── Users ──
  async getUser(userId: string) {
    const snap = await getDoc(doc(getDb(), "users", userId));
    if (!snap.exists()) return null;
    const d = snap.data();
    return {
      userId,
      email: d.email || "",
      fullName: d.displayName || "",
      nickname: d.nickname || "",
      country: d.country || "",
      createdAt: tsToString(d.createdAt),
      emailVerified: d.emailVerified ?? false,
      kycStatus: d.kycStatus || "not_started",
      provider: d.provider || "email",
    } as User;
  }

  async updateUser(userId: string, data: Partial<User>) {
    await updateDoc(doc(getDb(), "users", userId), data as any);
  }

  // ── Orders ──
  async getOrders(userId: string) {
    const q = query(collection(getDb(), "orders"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ ...d.data(), orderId: d.id } as Order));
  }

  async getOrder(orderId: string) {
    const snap = await getDoc(doc(getDb(), "orders", orderId));
    if (!snap.exists()) return null;
    return { ...snap.data(), orderId: snap.id } as Order;
  }

  async createOrder(order: Omit<Order, "orderId">) {
    const ref = await addDoc(collection(getDb(), "orders"), {
      ...order,
      createdAt: serverTimestamp(),
    });
    return { ...order, orderId: ref.id, createdAt: new Date().toISOString() } as Order;
  }

  async updateOrderStatus(orderId: string, status: Order["status"]) {
    const updates: any = { status };
    if (status === "paid") updates.paidAt = serverTimestamp();
    await updateDoc(doc(getDb(), "orders", orderId), updates);
  }

  // ── Challenges ──
  async getChallenges(userId: string) {
    const q = query(collection(getDb(), "challenges"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ ...d.data(), challengeId: d.id } as Challenge));
  }

  async getChallenge(challengeId: string) {
    const snap = await getDoc(doc(getDb(), "challenges", challengeId));
    if (!snap.exists()) return null;
    return { ...snap.data(), challengeId: snap.id } as Challenge;
  }

  async createChallenge(challenge: Omit<Challenge, "challengeId">) {
    const ref = await addDoc(collection(getDb(), "challenges"), {
      ...challenge,
      startDate: serverTimestamp(),
    });
    return { ...challenge, challengeId: ref.id, startDate: new Date().toISOString() } as Challenge;
  }

  // ── Trading Accounts ──
  async getAccounts(userId: string) {
    const q = query(collection(getDb(), "accounts"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ ...d.data(), accountId: d.id } as TradingAccount));
  }

  async getAccount(accountId: string) {
    const snap = await getDoc(doc(getDb(), "accounts", accountId));
    if (!snap.exists()) return null;
    return { ...snap.data(), accountId: snap.id } as TradingAccount;
  }

  // ── Tickets ──
  async getTickets(userId: string) {
    const q = query(collection(getDb(), "tickets"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ ...d.data(), ticketId: d.id } as Ticket));
  }

  async getTicket(ticketId: string) {
    const snap = await getDoc(doc(getDb(), "tickets", ticketId));
    if (!snap.exists()) return null;
    return { ...snap.data(), ticketId: snap.id } as Ticket;
  }

  async createTicket(ticket: Omit<Ticket, "ticketId" | "messages" | "updatedAt">) {
    const ref = await addDoc(collection(getDb(), "tickets"), {
      ...ticket,
      messages: [],
      updatedAt: serverTimestamp(),
    });
    return { ...ticket, ticketId: ref.id, messages: [], updatedAt: new Date().toISOString() } as Ticket;
  }

  async addTicketMessage(ticketId: string, message: Omit<TicketMessage, "id">) {
    const ref = doc(getDb(), "tickets", ticketId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;
    const data = snap.data();
    const messages = data.messages || [];
    messages.push({ ...message, id: `msg_${Date.now().toString(36)}` });
    await updateDoc(ref, { messages, updatedAt: serverTimestamp() });
  }

  async updateTicketStatus(ticketId: string, status: Ticket["status"]) {
    await updateDoc(doc(getDb(), "tickets", ticketId), { status, updatedAt: serverTimestamp() });
  }

  // ── Payouts ──
  async getPayouts(userId: string) {
    const q = query(collection(getDb(), "payouts"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ ...d.data(), payoutId: d.id } as PayoutRequest));
  }

  async createPayout(payout: Omit<PayoutRequest, "payoutId">) {
    const ref = await addDoc(collection(getDb(), "payouts"), payout);
    return { ...payout, payoutId: ref.id } as PayoutRequest;
  }

  async updatePayoutStatus(payoutId: string, status: PayoutRequest["status"]) {
    await updateDoc(doc(getDb(), "payouts", payoutId), { status, processedAt: serverTimestamp() });
  }

  async blockPayout(payoutId: string, reason: string, blockedBy: string) {
    await updateDoc(doc(getDb(), "payouts", payoutId), {
      status: "blocked",
      blockedReason: reason,
      blockedBy,
      blockedAt: serverTimestamp(),
    });
  }

  // ── Audit ──
  async getAuditLogs(accountId: string) {
    const q = query(collection(getDb(), "audit_logs"), where("accountId", "==", accountId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ ...d.data(), id: d.id } as AuditLog));
  }

  async addAuditLog(log: Omit<AuditLog, "id">) {
    await addDoc(collection(getDb(), "audit_logs"), log);
  }

  async getRuleEvaluations(accountId: string) {
    const q = query(collection(getDb(), "rule_evaluations"), where("accountId", "==", accountId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as RuleEvaluation);
  }
}

// ── Fallback localStorage adapter (dev only) ──────────────

function generateId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}
function getCollection<T>(key: string): T[] {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
}
function setCollection<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

class LocalDataService implements DataService {
  async getUser(userId: string) { return getCollection<User>("fynx_db_users").find((u) => u.userId === userId) || null; }
  async updateUser(userId: string, data: Partial<User>) { const l = getCollection<User>("fynx_db_users"); const i = l.findIndex((u) => u.userId === userId); if (i >= 0) { l[i] = { ...l[i], ...data }; setCollection("fynx_db_users", l); } }
  async getOrders(userId: string) { return getCollection<Order>("fynx_db_orders").filter((o) => o.userId === userId); }
  async getOrder(orderId: string) { return getCollection<Order>("fynx_db_orders").find((o) => o.orderId === orderId) || null; }
  async createOrder(order: Omit<Order, "orderId">) { const f: Order = { ...order, orderId: generateId("ord") }; const l = getCollection<Order>("fynx_db_orders"); l.push(f); setCollection("fynx_db_orders", l); return f; }
  async updateOrderStatus(orderId: string, status: Order["status"]) { const l = getCollection<Order>("fynx_db_orders"); const i = l.findIndex((o) => o.orderId === orderId); if (i >= 0) { l[i].status = status; if (status === "paid") l[i].paidAt = new Date().toISOString(); setCollection("fynx_db_orders", l); } }
  async getChallenges(userId: string) { return getCollection<Challenge>("fynx_db_challenges").filter((c) => c.userId === userId); }
  async getChallenge(challengeId: string) { return getCollection<Challenge>("fynx_db_challenges").find((c) => c.challengeId === challengeId) || null; }
  async createChallenge(challenge: Omit<Challenge, "challengeId">) { const f: Challenge = { ...challenge, challengeId: generateId("ch") }; const l = getCollection<Challenge>("fynx_db_challenges"); l.push(f); setCollection("fynx_db_challenges", l); return f; }
  async getAccounts(userId: string) { return getCollection<TradingAccount>("fynx_db_accounts").filter((a) => a.userId === userId); }
  async getAccount(accountId: string) { return getCollection<TradingAccount>("fynx_db_accounts").find((a) => a.accountId === accountId) || null; }
  async getTickets(userId: string) { return getCollection<Ticket>("fynx_db_tickets").filter((t) => t.userId === userId); }
  async getTicket(ticketId: string) { return getCollection<Ticket>("fynx_db_tickets").find((t) => t.ticketId === ticketId) || null; }
  async createTicket(ticket: Omit<Ticket, "ticketId" | "messages" | "updatedAt">) { const f: Ticket = { ...ticket, ticketId: generateId("tkt"), messages: [], updatedAt: new Date().toISOString() }; const l = getCollection<Ticket>("fynx_db_tickets"); l.push(f); setCollection("fynx_db_tickets", l); return f; }
  async addTicketMessage(ticketId: string, message: Omit<TicketMessage, "id">) { const l = getCollection<Ticket>("fynx_db_tickets"); const i = l.findIndex((t) => t.ticketId === ticketId); if (i >= 0) { l[i].messages.push({ ...message, id: generateId("msg") }); l[i].updatedAt = new Date().toISOString(); setCollection("fynx_db_tickets", l); } }
  async updateTicketStatus(ticketId: string, status: Ticket["status"]) { const l = getCollection<Ticket>("fynx_db_tickets"); const i = l.findIndex((t) => t.ticketId === ticketId); if (i >= 0) { l[i].status = status; l[i].updatedAt = new Date().toISOString(); setCollection("fynx_db_tickets", l); } }
  async getPayouts(userId: string) { return getCollection<PayoutRequest>("fynx_db_payouts").filter((p) => p.userId === userId); }
  async createPayout(payout: Omit<PayoutRequest, "payoutId">) { const f: PayoutRequest = { ...payout, payoutId: generateId("pay") }; const l = getCollection<PayoutRequest>("fynx_db_payouts"); l.push(f); setCollection("fynx_db_payouts", l); return f; }
  async updatePayoutStatus(payoutId: string, status: PayoutRequest["status"]) { const l = getCollection<PayoutRequest>("fynx_db_payouts"); const i = l.findIndex((p) => p.payoutId === payoutId); if (i >= 0) { l[i].status = status; l[i].processedAt = new Date().toISOString(); setCollection("fynx_db_payouts", l); } }
  async blockPayout(payoutId: string, reason: string, blockedBy: string) { const l = getCollection<PayoutRequest>("fynx_db_payouts"); const i = l.findIndex((p) => p.payoutId === payoutId); if (i >= 0) { l[i].status = "blocked"; l[i].blockedReason = reason; l[i].blockedBy = blockedBy; l[i].blockedAt = new Date().toISOString(); setCollection("fynx_db_payouts", l); } }
  async getAuditLogs(accountId: string) { return getCollection<AuditLog>("fynx_db_audit").filter((l) => l.accountId === accountId); }
  async addAuditLog(log: Omit<AuditLog, "id">) { const l = getCollection<AuditLog>("fynx_db_audit"); l.push({ ...log, id: generateId("aud") }); setCollection("fynx_db_audit", l); }
  async getRuleEvaluations(accountId: string) { return getCollection<RuleEvaluation>("fynx_db_rules").filter((r) => r.accountId === accountId); }
}

// Use Firestore when configured, localStorage fallback for dev only
export const dataService: DataService = isFirebaseConfigured
  ? new FirestoreDataService()
  : new LocalDataService();
