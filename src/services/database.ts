// ═══════════════════════════════════════════════════════════
// DATA SERVICE — Firestore-ready adapter
// ═══════════════════════════════════════════════════════════
// Replace placeholder implementations with Firestore collection
// reads/writes. Each method maps 1:1 to a Firestore query.

import type {
  User, Order, Challenge, TradingAccount,
  Ticket, TicketMessage, PayoutRequest, AuditLog, RuleEvaluation,
  AsyncState,
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

// ── Placeholder adapter (localStorage-based) ──────────────
// 🔌 Replace this class with FirestoreDataService.

function generateId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

function getCollection<T>(key: string): T[] {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); }
  catch { return []; }
}

function setCollection<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

class LocalDataService implements DataService {
  // Users
  async getUser(userId: string) {
    const users = getCollection<User>("fynx_db_users");
    return users.find((u) => u.userId === userId) || null;
  }
  async updateUser(userId: string, data: Partial<User>) {
    const users = getCollection<User>("fynx_db_users");
    const idx = users.findIndex((u) => u.userId === userId);
    if (idx >= 0) { users[idx] = { ...users[idx], ...data }; setCollection("fynx_db_users", users); }
  }

  // Orders
  async getOrders(userId: string) {
    return getCollection<Order>("fynx_db_orders").filter((o) => o.userId === userId);
  }
  async getOrder(orderId: string) {
    return getCollection<Order>("fynx_db_orders").find((o) => o.orderId === orderId) || null;
  }
  async createOrder(order: Omit<Order, "orderId">) {
    const full: Order = { ...order, orderId: generateId("ord") };
    const orders = getCollection<Order>("fynx_db_orders");
    orders.push(full);
    setCollection("fynx_db_orders", orders);
    return full;
  }
  async updateOrderStatus(orderId: string, status: Order["status"]) {
    const orders = getCollection<Order>("fynx_db_orders");
    const idx = orders.findIndex((o) => o.orderId === orderId);
    if (idx >= 0) { orders[idx].status = status; if (status === "paid") orders[idx].paidAt = new Date().toISOString(); setCollection("fynx_db_orders", orders); }
  }

  // Challenges
  async getChallenges(userId: string) {
    return getCollection<Challenge>("fynx_db_challenges").filter((c) => c.userId === userId);
  }
  async getChallenge(challengeId: string) {
    return getCollection<Challenge>("fynx_db_challenges").find((c) => c.challengeId === challengeId) || null;
  }
  async createChallenge(challenge: Omit<Challenge, "challengeId">) {
    const full: Challenge = { ...challenge, challengeId: generateId("ch") };
    const list = getCollection<Challenge>("fynx_db_challenges");
    list.push(full);
    setCollection("fynx_db_challenges", list);
    return full;
  }

  // Trading Accounts
  async getAccounts(userId: string) {
    return getCollection<TradingAccount>("fynx_db_accounts").filter((a) => a.userId === userId);
  }
  async getAccount(accountId: string) {
    return getCollection<TradingAccount>("fynx_db_accounts").find((a) => a.accountId === accountId) || null;
  }

  // Tickets
  async getTickets(userId: string) {
    return getCollection<Ticket>("fynx_db_tickets").filter((t) => t.userId === userId);
  }
  async getTicket(ticketId: string) {
    return getCollection<Ticket>("fynx_db_tickets").find((t) => t.ticketId === ticketId) || null;
  }
  async createTicket(ticket: Omit<Ticket, "ticketId" | "messages" | "updatedAt">) {
    const full: Ticket = { ...ticket, ticketId: generateId("tkt"), messages: [], updatedAt: new Date().toISOString() };
    const list = getCollection<Ticket>("fynx_db_tickets");
    list.push(full);
    setCollection("fynx_db_tickets", list);
    return full;
  }
  async addTicketMessage(ticketId: string, message: Omit<TicketMessage, "id">) {
    const list = getCollection<Ticket>("fynx_db_tickets");
    const idx = list.findIndex((t) => t.ticketId === ticketId);
    if (idx >= 0) {
      list[idx].messages.push({ ...message, id: generateId("msg") });
      list[idx].updatedAt = new Date().toISOString();
      setCollection("fynx_db_tickets", list);
    }
  }
  async updateTicketStatus(ticketId: string, status: Ticket["status"]) {
    const list = getCollection<Ticket>("fynx_db_tickets");
    const idx = list.findIndex((t) => t.ticketId === ticketId);
    if (idx >= 0) { list[idx].status = status; list[idx].updatedAt = new Date().toISOString(); setCollection("fynx_db_tickets", list); }
  }

  // Payouts
  async getPayouts(userId: string) {
    return getCollection<PayoutRequest>("fynx_db_payouts").filter((p) => p.userId === userId);
  }
  async createPayout(payout: Omit<PayoutRequest, "payoutId">) {
    const full: PayoutRequest = { ...payout, payoutId: generateId("pay") };
    const list = getCollection<PayoutRequest>("fynx_db_payouts");
    list.push(full);
    setCollection("fynx_db_payouts", list);
    return full;
  }
  async updatePayoutStatus(payoutId: string, status: PayoutRequest["status"]) {
    const list = getCollection<PayoutRequest>("fynx_db_payouts");
    const idx = list.findIndex((p) => p.payoutId === payoutId);
    if (idx >= 0) { list[idx].status = status; list[idx].processedAt = new Date().toISOString(); setCollection("fynx_db_payouts", list); }
  }
  async blockPayout(payoutId: string, reason: string, blockedBy: string) {
    const list = getCollection<PayoutRequest>("fynx_db_payouts");
    const idx = list.findIndex((p) => p.payoutId === payoutId);
    if (idx >= 0) {
      list[idx].status = "blocked";
      list[idx].blockedReason = reason;
      list[idx].blockedBy = blockedBy;
      list[idx].blockedAt = new Date().toISOString();
      setCollection("fynx_db_payouts", list);
    }
  }

  // Audit
  async getAuditLogs(accountId: string) {
    return getCollection<AuditLog>("fynx_db_audit").filter((l) => l.accountId === accountId);
  }
  async addAuditLog(log: Omit<AuditLog, "id">) {
    const list = getCollection<AuditLog>("fynx_db_audit");
    list.push({ ...log, id: generateId("aud") });
    setCollection("fynx_db_audit", list);
  }
  async getRuleEvaluations(accountId: string) {
    return getCollection<RuleEvaluation>("fynx_db_rules").filter((r) => r.accountId === accountId);
  }
}

export const dataService: DataService = new LocalDataService();
