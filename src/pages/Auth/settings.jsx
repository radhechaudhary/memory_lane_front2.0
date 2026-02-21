"use client";

import React, { useState } from "react";
import { useThemeStore } from "../../store/themeStore";
import AppShell from "../../components/layout/AppShell";

export default function SettingsPage() {
  const { setTheme, toggleTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  
  const [profileData, setProfileData] = useState({
    name: "Sarah Mitchell",
    email: "sarah.mitchell@email.com",
    bio: "Cherishing every moment",
  });

  const [privacyData, setPrivacyData] = useState({
    twoFactorEnabled: true,
    defaultMemoryPrivacy: "private",
    sessions: [
      { id: 1, device: "MacBook Pro", location: "San Francisco, CA", current: true },
      { id: 2, device: "iPhone 14", location: "San Francisco, CA", current: false },
    ]
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    milestoneReminders: true,
    onThisDay: true,
    sharedAlbums: true,
    emailNotifications: true,
  });

  const [storageData] = useState({
    used: 4.2,
    total: 15,
    photos: 2.1,
    videos: 1.8,
    audio: 0.3,
  });

  const [subscriptionData] = useState({
    plan: "free",
    features: ["Up to 100 memories", "5 photo albums", "Basic search", "Standard support"]
  });

  const [appearanceData, setAppearanceData] = useState({ theme: "light" });

  const showSuccessMessage = (message) => {
    setShowSuccess(message);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    showSuccessMessage("Profile updated successfully!");
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    showSuccessMessage("Password updated successfully!");
  };

  const handleLogoutSessions = () => {
    setPrivacyData(prev => ({
      ...prev,
      sessions: prev.sessions.filter(s => s.current)
    }));
    showSuccessMessage("Other sessions logged out!");
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText === "DELETE") {
      alert("Account deletion would be processed here");
      setShowDeleteModal(false);
      setDeleteConfirmText("");
    }
  };

  const Toggle = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative h-7 w-12 rounded-full transition-all duration-300 ${enabled ? "bg-amber-400" : "bg-stone-200"}`}
    >
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${enabled ? "left-6" : "left-1"}`} />
    </button>
  );

  const tabs = [
    { id: "profile", label: "Profile", icon: "fa-user" },
    { id: "privacy", label: "Privacy & Security", icon: "fa-shield-alt" },
    { id: "notifications", label: "Notifications", icon: "fa-bell" },
    { id: "storage", label: "Storage", icon: "fa-cloud" },
    { id: "subscription", label: "Subscription", icon: "fa-credit-card" },
    { id: "appearance", label: "Appearance", icon: "fa-palette" },
    { id: "danger", label: "Danger Zone", icon: "fa-exclamation-triangle" },
  ];

  return (
    <AppShell
      activeNav="settings"
      title="Account Settings"
      subtitle="Manage your profile, privacy, and preferences."
      contentClassName="max-w-5xl"
    >
        
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full md:w-64 shrink-0">
            <nav className="premium-surface flex flex-row gap-2 overflow-x-auto p-2 md:flex-col md:gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-amber-100 text-amber-700"
                      : "text-stone-600 hover:bg-stone-100/50 hover:text-stone-900"
                  }`}
                >
                  <i className={`fas ${tab.icon} w-5`}></i>
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1">
            {activeTab === "profile" && (
              <div className="premium-panel p-8" style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)' }}>
                <h2 className="text-xl font-semibold text-stone-800">Profile Information</h2>
                <p className="mt-1 text-sm text-stone-600">Update your personal information</p>

                <form onSubmit={handleSaveProfile} className="mt-8 space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="group relative">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-rose-200 text-3xl font-medium text-amber-700 shadow-inner">
                        {profileData.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <button type="button" className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-stone-900 shadow-lg transition-transform hover:scale-110 hover:bg-amber-300">
                        <i className="fas fa-camera text-xs"></i>
                      </button>
                    </div>
                    <div>
                      <button type="button" className="text-sm font-semibold text-amber-600 hover:text-amber-700">Change Avatar</button>
                      <p className="text-xs text-stone-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      className="w-full rounded-xl border border-stone-300 bg-stone-100 px-4 py-3 text-stone-500"
                      readOnly
                    />
                    <p className="mt-1 text-xs text-stone-400">Contact support to change your email</p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">Bio (optional)</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={3}
                      className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <button type="submit" disabled={isSaving} className="rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-stone-900 transition-all hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70">
                    {isSaving ? <span className="flex items-center gap-2"><i className="fas fa-circle-notch fa-spin text-xs"></i>Saving...</span> : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-6">
                <div className="premium-panel p-8">
                  <h2 className="text-xl font-semibold text-stone-800">Password</h2>
                  <p className="mt-1 text-sm text-stone-600">Change your password to keep your account secure</p>

                  <form onSubmit={handleUpdatePassword} className="mt-6 space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-stone-700">Current Password</label>
                      <input type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3" required />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-stone-700">New Password</label>
                      <input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3" required />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-stone-700">Confirm Password</label>
                      <input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3" required />
                    </div>
                    <button type="submit" disabled={isSaving} className="rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-stone-900 hover:bg-amber-300">
                      {isSaving ? "Updating..." : "Update Password"}
                    </button>
                  </form>
                </div>

                <div className="premium-panel p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-stone-800">Two-Factor Authentication</h2>
                      <p className="mt-1 text-sm text-stone-600">Add an extra layer of security</p>
                    </div>
                    <Toggle enabled={privacyData.twoFactorEnabled} onChange={(enabled) => setPrivacyData({...privacyData, twoFactorEnabled: enabled})} />
                  </div>
                </div>

                <div className="premium-panel p-8">
                  <h2 className="text-xl font-semibold text-stone-800">Default Memory Privacy</h2>
                  <p className="mt-1 text-sm text-stone-600">Set default visibility for new memories</p>
                  <div className="mt-6 flex gap-3">
                    {['private', 'shared', 'public'].map((option) => (
                      <button key={option} onClick={() => setPrivacyData({...privacyData, defaultMemoryPrivacy: option})} className={`rounded-xl px-6 py-3 text-sm font-medium ${privacyData.defaultMemoryPrivacy === option ? "bg-amber-100 text-amber-700" : "bg-white text-stone-600"}`}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="premium-panel p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-stone-800">Active Sessions</h2>
                      <p className="mt-1 text-sm text-stone-600">Manage devices where you're logged in</p>
                    </div>
                    <button onClick={handleLogoutSessions} className="text-sm font-medium text-amber-600 hover:text-amber-700">Log out other sessions</button>
                  </div>
                  <div className="mt-6 space-y-3">
                    {privacyData.sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100">
                            <i className={`fas ${session.device.includes('Mac') ? 'fa-laptop' : 'fa-mobile-alt'} text-stone-500`}></i>
                          </div>
                          <div>
                            <p className="font-medium text-stone-800">{session.device} {session.current && <span className="ml-2 text-xs text-amber-600">(Current)</span>}</p>
                            <p className="text-sm text-stone-500">{session.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="premium-panel p-8">
                <h2 className="text-xl font-semibold text-stone-800">Notifications</h2>
                <p className="mt-1 text-sm text-stone-600">Manage how you want to receive updates</p>
                <div className="mt-8 space-y-4">
                  {[
                    { key: "milestoneReminders", label: "Milestone reminders", desc: "Get notified about memory milestones" },
                    { key: "onThisDay", label: "On This Day", desc: "Reminders of memories from this day" },
                    { key: "sharedAlbums", label: "Shared album updates", desc: "When someone adds photos" },
                    { key: "emailNotifications", label: "Email notifications", desc: "Receive updates via email" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-5">
                      <div>
                        <p className="font-medium text-stone-800">{item.label}</p>
                        <p className="text-sm text-stone-500">{item.desc}</p>
                      </div>
                      <Toggle enabled={notificationSettings[item.key]} onChange={(enabled) => setNotificationSettings({...notificationSettings, [item.key]: enabled})} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "storage" && (
              <div className="premium-panel p-8">
                <h2 className="text-xl font-semibold text-stone-800">Storage</h2>
                <p className="mt-1 text-sm text-stone-600">Manage your storage space</p>
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-stone-700">Storage Used</span>
                    <span className="text-sm text-stone-500">{storageData.used} GB of {storageData.total} GB</span>
                  </div>
                  <div className="h-4 rounded-full bg-stone-200 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-400" style={{ width: `${(storageData.used / storageData.total) * 100}%` }} />
                  </div>
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {[
                    { label: "Photos", value: storageData.photos, icon: "fa-images", color: "bg-amber-100 text-amber-600" },
                    { label: "Videos", value: storageData.videos, icon: "fa-video", color: "bg-rose-100 text-rose-600" },
                    { label: "Audio", value: storageData.audio, icon: "fa-microphone", color: "bg-blue-100 text-blue-600" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-stone-200 bg-white p-5">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${item.color} mb-3`}><i className={`fas ${item.icon}`}></i></div>
                      <p className="text-2xl font-semibold text-stone-800">{item.value} GB</p>
                      <p className="text-sm text-stone-500">{item.label}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-8 w-full rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50">Upgrade Storage</button>
              </div>
            )}

            {activeTab === "subscription" && (
              <div className="premium-panel p-8">
                <h2 className="text-xl font-semibold text-stone-800">Subscription</h2>
                <p className="mt-1 text-sm text-stone-600">Manage your plan and billing</p>
                <div className="mt-8 rounded-2xl border-2 border-amber-300 bg-amber-50 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-700">Current Plan</span>
                      <h3 className="mt-3 text-2xl font-bold text-stone-800">Free</h3>
                    </div>
                    <button className="rounded-full bg-amber-400 px-6 py-2 text-sm font-semibold text-stone-900 hover:bg-amber-300">Upgrade to Premium</button>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="text-sm font-medium text-stone-500 mb-4">Your Plan Features</h4>
                  <div className="space-y-3">
                    {subscriptionData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3"><i className="fas fa-check text-amber-500"></i><span className="text-stone-700">{feature}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="premium-panel p-8">
                <h2 className="text-xl font-semibold text-stone-800">Appearance</h2>
                <p className="mt-1 text-sm text-stone-600">Customize how Memona looks</p>
                <div className="mt-8">
                  <label className="mb-4 block text-sm font-medium text-stone-700">Theme</label>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { id: "light", label: "Light", icon: "fa-sun" },
                      { id: "dark", label: "Dark", icon: "fa-moon" },
                      { id: "system", label: "System", icon: "fa-desktop" },
                    ].map((option) => (
                      <button key={option.id} onClick={() => { setAppearanceData({...appearanceData, theme: option.id}); option.id === 'system' ? toggleTheme() : setTheme(option.id); }} className={`rounded-xl border-2 p-4 transition-all ${appearanceData.theme === option.id ? "border-amber-400 bg-amber-50" : "border-stone-200 hover:border-stone-300"}`}>
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg mx-auto mb-3 ${appearanceData.theme === option.id ? "bg-amber-100 text-amber-600" : "bg-stone-100 text-stone-500"}`}><i className={`fas ${option.icon}`}></i></div>
                        <p className={`text-sm font-medium ${appearanceData.theme === option.id ? "text-amber-700" : "text-stone-700"}`}>{option.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "danger" && (
              <div className="premium-panel p-8">
                <div className="rounded-xl border-2 border-red-300 bg-red-50 p-6">
                  <h2 className="text-xl font-semibold text-red-700">Danger Zone</h2>
                  <p className="mt-1 text-sm text-red-600">These actions are irreversible.</p>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between rounded-lg bg-white p-4">
                      <div>
                        <p className="font-medium text-stone-800">Delete Account</p>
                        <p className="text-sm text-stone-500">Permanently delete your account</p>
                      </div>
                      <button onClick={() => setShowDeleteModal(true)} className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">Delete Account</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      

      {showSuccess && (
        <div className="fixed bottom-6 right-6 z-50 animate-dropdown-in rounded-xl bg-green-500 px-6 py-4 shadow-lg">
          <div className="flex items-center gap-3"><i className="fas fa-check-circle text-white"></i><span className="font-medium text-white">{showSuccess}</span></div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl animate-slideUp">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mx-auto mb-6">
              <i className="fas fa-exclamation-triangle text-2xl text-red-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-center text-stone-800 mb-2">Delete Account</h3>
            <p className="text-center text-stone-500 mb-6">This will permanently delete all your memories. This action cannot be undone.</p>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-stone-700">Type "DELETE" to confirm</label>
              <input type="text" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3" placeholder="DELETE" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50">Cancel</button>
              <button onClick={handleDeleteAccount} disabled={deleteConfirmText !== "DELETE"} className="flex-1 rounded-xl bg-red-500 px-6 py-3 text-sm font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50">Delete Account</button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}



