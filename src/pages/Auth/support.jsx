"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";
import SupportModal from "../../components/modal/SupportModal";
import AppShell from "../../components/layout/AppShell";
import { formatDate } from "../../utils/formatDate";
import {
  deleteSupportTicket,
  getSupportTickets,
} from "../../services/supportTickets";

export default function SupportPage() {
  const navigate = useNavigate();
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [submittedTickets, setSubmittedTickets] = useState([]);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    setSubmittedTickets(getSupportTickets());
  }, []);

  const handleSupportSuccess = (ticket) => {
    setSubmittedTickets((prev) => [ticket, ...prev]);
  };

  const handleDeleteTicket = (ticketId) => {
    setDeleteError("");

    try {
      const updatedTickets = deleteSupportTicket(ticketId);
      setSubmittedTickets(updatedTickets);
    } catch {
      setDeleteError(
        "Unable to delete this message right now. Please try again.",
      );
    }
  };

  return (
    <AppShell
      activeNav="support"
      title="Support"
      subtitle="Get help with your account, privacy, and memories."
      contentClassName="max-w-6xl"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
      >
        <FiArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="premium-surface px-6 py-10 text-left">
        <h1 className="text-3xl font-semibold text-text-primary">Support</h1>
        <p className="mt-4 text-lg text-text-secondary">
          How can we help you today?
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-emerald-700">
            Your submitted messages
          </p>
          <button
            onClick={() => setShowSupportModal(true)}
            className="rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-stone-900 transition-all hover:bg-amber-300 sm:self-auto"
          >
            Contact Support
          </button>
        </div>

        {deleteError && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {deleteError}
          </div>
        )}

        {submittedTickets.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {submittedTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-text-primary">
                    {ticket.subject}
                  </h3>
                  <button
                    onClick={() => handleDeleteTicket(ticket.id)}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-100"
                    aria-label="Delete support message"
                    title="Delete"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-1 text-sm text-text-secondary line-clamp-2">
                  {ticket.message}
                </p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-text-secondary">
                  <span>Category: {ticket.category}</span>
                  <span>Submitted: {formatDate(ticket.createdAt, "full")}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 px-5 py-6 text-sm text-text-secondary">
            No support messages yet.
          </div>
        )}
      </div>

      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
        onSuccess={handleSupportSuccess}
      />
    </AppShell>
  );
}
