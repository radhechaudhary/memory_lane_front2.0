"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import SupportModal from "../../components/modal/SupportModal";
import AppShell from "../../components/layout/AppShell";

export default function SupportPage() {
  const navigate = useNavigate();
  const [showSupportModal, setShowSupportModal] = useState(true);

  return (
    <AppShell
      activeNav="support"
      title="Support"
      subtitle="Get help with your account, privacy, and memories."
      contentClassName="max-w-2xl"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
      >
        <FiArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="premium-surface px-6 py-16 text-center">
        <h1 className="text-3xl font-semibold text-[var(--color-text-primary)]">
          Support
        </h1>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
          How can we help you today?
        </p>

        <button
          onClick={() => setShowSupportModal(true)}
          className="mt-8 rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-stone-900 transition-all hover:bg-amber-300"
        >
          Contact Support
        </button>
      </div>

      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </AppShell>
  );
}
