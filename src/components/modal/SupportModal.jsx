import React, { useState } from "react";
import { FiCheck, FiLoader, FiX } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { createSupportTicket } from "../../services/supportTickets";

export default function SupportModal({
  isOpen = false,
  onClose = () => {},
  onSuccess = () => {},
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    subject: "",
    category: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const createdTicket = createSupportTicket({
        subject: formData.subject,
        category: formData.category,
        message: formData.message,
        userId: user?.id || null,
        userName: user?.name || user?.username || "Unknown User",
        userEmail: user?.email || "N/A",
      });

      setSubmitted(true);
      onSuccess(createdTicket);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({ subject: "", category: "general", message: "" });
        onClose();
      }, 2000);
    } catch {
      setSubmitError(
        "Unable to send your message right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { value: "general", label: "General Question" },
    { value: "technical", label: "Technical Issue" },
    { value: "billing", label: "Billing & Payments" },
    { value: "account", label: "Account Help" },
    { value: "feedback", label: "Feature Request" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-stone-800">
            {submitted ? "Message Sent!" : "Contact Support"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-600"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
              <FiCheck className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-stone-800 mb-2">
              Thank you!
            </h3>
            <p className="text-stone-600">
              We'll get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {submitError}
              </div>
            )}
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                placeholder="Brief description of your issue"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={4}
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 resize-none"
                placeholder="Describe your issue in detail..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-900 transition-all hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <FiLoader className="h-4 w-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
