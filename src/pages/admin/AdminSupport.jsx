import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiHeadphones, FiUser } from "react-icons/fi";
import {
  getSupportTickets,
  resolveSupportTicket,
} from "../../services/supportTickets";
import { formatDate } from "../../utils/formatDate";

const AdminSupport = () => {
  const [tickets, setTickets] = useState(getSupportTickets);

  useEffect(() => {
    const refreshTickets = () => {
      setTickets(getSupportTickets());
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshTickets();
      }
    };

    window.addEventListener("storage", refreshTickets);
    window.addEventListener("focus", refreshTickets);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("storage", refreshTickets);
      window.removeEventListener("focus", refreshTickets);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const stats = useMemo(() => {
    const total = tickets.length;
    const pending = tickets.filter(
      (ticket) => ticket.status === "pending",
    ).length;
    const resolved = tickets.filter(
      (ticket) => ticket.status === "resolved",
    ).length;
    const uniqueUsers = new Set(tickets.map((ticket) => ticket.userEmail)).size;

    return { total, pending, resolved, uniqueUsers };
  }, [tickets]);

  const handleResolve = (ticketId) => {
    const updatedTickets = resolveSupportTicket(ticketId);
    setTickets(updatedTickets);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Total Queries
            </p>
            <FiHeadphones className="w-5 h-5 text-[var(--color-accent-gold)]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-text-primary)]">
            {stats.total}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Pending
            </p>
            <FiClock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-text-primary)]">
            {stats.pending}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Resolved
            </p>
            <FiCheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-text-primary)]">
            {stats.resolved}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[var(--color-surface-border)] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Users Needing Support
            </p>
            <FiUser className="w-5 h-5 text-[var(--color-accent-gold)]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-text-primary)]">
            {stats.uniqueUsers}
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-[var(--color-surface-border)] overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-[var(--color-surface-border)]">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            Support Queries
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Track user support requests and resolve them.
          </p>
        </div>

        {tickets.length === 0 ? (
          <div className="px-6 py-12 text-center text-[var(--color-text-secondary)]">
            No support queries yet.
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-surface-border)]">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="px-6 py-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-[var(--color-text-primary)]">
                        {ticket.subject}
                      </h3>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          ticket.status === "resolved"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {ticket.userName} ({ticket.userEmail})
                    </p>
                    <p className="text-sm text-[var(--color-text-primary)]">
                      {ticket.message}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-[var(--color-text-secondary)]">
                      <span>Category: {ticket.category}</span>
                      <span>
                        Submitted: {formatDate(ticket.createdAt, "full")}
                      </span>
                      {ticket.resolvedAt && (
                        <span>
                          Resolved: {formatDate(ticket.resolvedAt, "full")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    {ticket.status === "pending" ? (
                      <button
                        onClick={() => handleResolve(ticket.id)}
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
                      >
                        Mark as Resolved
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                        <FiCheckCircle className="w-4 h-4" />
                        Resolved
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminSupport;
