"use client";

import React, { useState } from "react";
import SupportModal from "../../components/modal/SupportModal";
import AppShell from "../../components/layout/AppShell";

export default function SupportPage() {
  const [showSupportModal, setShowSupportModal] = useState(true);

  return (
    <AppShell
      activeNav="support"
      title="Support"
      subtitle="Get help with your account, privacy, and memories."
      contentClassName="max-w-2xl"
    >
      <div className="premium-surface px-6 py-16 text-center">
        <h1 className="text-3xl font-semibold text-stone-800">Support</h1>
        <p className="mt-4 text-lg text-stone-600">
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

