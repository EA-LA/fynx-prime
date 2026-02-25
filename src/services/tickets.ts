// ═══════════════════════════════════════════════════════════
// TICKET SERVICE — Firestore-ready
// ═══════════════════════════════════════════════════════════

import { dataService } from "./database";
import type { Ticket, TicketStatus, TicketPriority } from "./types";

export interface CreateTicketInput {
  userId: string;
  subject: string;
  category: string;
  priority: TicketPriority;
  message: string;
}

export async function createTicket(input: CreateTicketInput): Promise<Ticket> {
  const ticket = await dataService.createTicket({
    userId: input.userId,
    subject: input.subject,
    category: input.category,
    priority: input.priority,
    status: "open",
    createdAt: new Date().toISOString(),
  });

  // Add initial message
  if (input.message) {
    await dataService.addTicketMessage(ticket.ticketId, {
      sender: "user",
      content: input.message,
      timestamp: new Date().toISOString(),
    });
  }

  return ticket;
}

export async function replyToTicket(ticketId: string, content: string, sender: "user" | "admin"): Promise<void> {
  await dataService.addTicketMessage(ticketId, {
    sender,
    content,
    timestamp: new Date().toISOString(),
  });
  // Reopen if user replies to closed/waiting ticket
  if (sender === "user") {
    await dataService.updateTicketStatus(ticketId, "open");
  }
}

export async function closeTicket(ticketId: string): Promise<void> {
  await dataService.updateTicketStatus(ticketId, "closed");
}

export async function getUserTickets(userId: string): Promise<Ticket[]> {
  return dataService.getTickets(userId);
}

export async function getTicketById(ticketId: string): Promise<Ticket | null> {
  return dataService.getTicket(ticketId);
}
