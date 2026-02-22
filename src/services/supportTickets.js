import { STORAGE_KEYS } from "../utils/constants";

const SUPPORT_TICKETS_KEY =
  STORAGE_KEYS.SUPPORT_TICKETS || "memona_support_tickets";

const parseTickets = (rawValue) => {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getSupportTickets = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return parseTickets(window.localStorage.getItem(SUPPORT_TICKETS_KEY));
  } catch {
    return [];
  }
};

export const saveSupportTickets = (tickets) => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(SUPPORT_TICKETS_KEY, JSON.stringify(tickets));
    return true;
  } catch {
    return false;
  }
};

export const createSupportTicket = (ticketData) => {
  const newTicket = {
    id: Date.now().toString(),
    status: "pending",
    createdAt: new Date().toISOString(),
    resolvedAt: null,
    ...ticketData,
  };

  const tickets = getSupportTickets();
  const updatedTickets = [newTicket, ...tickets];
  const isSaved = saveSupportTickets(updatedTickets);

  if (!isSaved) {
    throw new Error("Unable to save support ticket");
  }

  return newTicket;
};

export const resolveSupportTicket = (ticketId) => {
  const tickets = getSupportTickets();
  const updatedTickets = tickets.map((ticket) =>
    ticket.id === ticketId
      ? { ...ticket, status: "resolved", resolvedAt: new Date().toISOString() }
      : ticket,
  );

  saveSupportTickets(updatedTickets);
  return updatedTickets;
};

export const deleteSupportTicket = (ticketId) => {
  const tickets = getSupportTickets();
  const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
  const isSaved = saveSupportTickets(updatedTickets);

  if (!isSaved) {
    throw new Error("Unable to delete support ticket");
  }

  return updatedTickets;
};
