"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Imported for routing
import { getPortfolioData } from "@/services/api";
import Sidebar from "@/components/layout/Sidebar";
import { User, Shield, Bell, LogOut } from "lucide-react";

export default function SettingsPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // Initialize router

  // Mock toggle states for the UI
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPortfolioData();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleLogout = () => {
    // In a real app, you would clear auth tokens/cookies here
    router.push("/"); // Redirect to the login/auth page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-trove-page-bg)] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[var(--color-trove-border)] border-t-[var(--color-trove-primary)] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-trove-page-bg)] flex flex-col md:flex-row">
      <Sidebar user={user || { name: "" }} />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full">

        <div className="px-8 pb-12 pt-10 flex flex-col gap-8 max-w-4xl">
          
          {/* Page Header */}
          <div>
            <h1 className="text-[24px] font-bold text-[var(--color-trove-text-default)]">Account Settings</h1>
            <p className="text-[14px] text-[var(--color-trove-text-neutral)] mt-1">
              Manage your personal information, security preferences, and notifications.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            
            {/* Section 1: Personal Information */}
            <div className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] overflow-hidden">
              <div className="p-6 border-b border-[var(--color-trove-border)] flex items-center gap-3">
                <User size={20} className="text-[var(--color-trove-primary)]" />
                <h3 className="text-[16px] font-semibold text-[var(--color-trove-text-default)]">Personal Information</h3>
              </div>
              <div className="p-6 flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-[var(--color-trove-text-neutral)]">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user?.name || ""}
                      className="w-full p-3 rounded-lg bg-[var(--color-trove-bg-default)] border border-[var(--color-trove-border)] text-[14px] text-[var(--color-trove-text-default)] focus:outline-none focus:border-[var(--color-trove-primary)]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-[var(--color-trove-text-neutral)]">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue="adaeze.okonkwo@example.com"
                      className="w-full p-3 rounded-lg bg-[var(--color-trove-bg-default)] border border-[var(--color-trove-border)] text-[14px] text-[var(--color-trove-text-default)] focus:outline-none focus:border-[var(--color-trove-primary)]"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button className="px-5 py-2.5 bg-[var(--color-trove-primary)] text-white text-[14px] font-medium rounded-lg hover:opacity-90 transition-opacity">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Section 2: Notifications */}
            <div className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] overflow-hidden">
              <div className="p-6 border-b border-[var(--color-trove-border)] flex items-center gap-3">
                <Bell size={20} className="text-[var(--color-trove-primary)]" />
                <h3 className="text-[16px] font-semibold text-[var(--color-trove-text-default)]">Notifications</h3>
              </div>
              <div className="p-6 flex flex-col gap-4">
                
                {/* Custom Toggle 1 */}
                <div className="flex items-center justify-between p-4 bg-[var(--color-trove-bg-default)] rounded-lg border border-[var(--color-trove-border)]">
                  <div>
                    <h4 className="text-[14px] font-semibold text-[var(--color-trove-text-default)]">Email Alerts</h4>
                    <p className="text-[12px] text-[var(--color-trove-text-neutral)] mt-0.5">Receive daily summaries and trade confirmations via email.</p>
                  </div>
                  <button 
                    onClick={() => setEmailAlerts(!emailAlerts)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailAlerts ? 'bg-[var(--color-trove-primary)]' : 'bg-gray-300'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                {/* Custom Toggle 2 */}
                <div className="flex items-center justify-between p-4 bg-[var(--color-trove-bg-default)] rounded-lg border border-[var(--color-trove-border)]">
                  <div>
                    <h4 className="text-[14px] font-semibold text-[var(--color-trove-text-default)]">Push Notifications</h4>
                    <p className="text-[12px] text-[var(--color-trove-text-neutral)] mt-0.5">Get instant alerts for price drops and major market movements.</p>
                  </div>
                  <button 
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${pushNotifications ? 'bg-[var(--color-trove-primary)]' : 'bg-gray-300'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${pushNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

              </div>
            </div>

            {/* Section 3: Security & Danger Zone */}
            <div className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] overflow-hidden">
              <div className="p-6 border-b border-[var(--color-trove-border)] flex items-center gap-3">
                <Shield size={20} className="text-[var(--color-trove-primary)]" />
                <h3 className="text-[16px] font-semibold text-[var(--color-trove-text-default)]">Security</h3>
              </div>
              <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="text-[14px] font-semibold text-[var(--color-trove-text-default)]">Account Password</h4>
                  <p className="text-[12px] text-[var(--color-trove-text-neutral)] mt-0.5">Update your password to keep your account secure.</p>
                </div>
                <button className="px-5 py-2.5 bg-[var(--color-trove-bg-default)] border border-[var(--color-trove-border)] text-[var(--color-trove-text-default)] text-[14px] font-medium rounded-lg hover:bg-gray-50 transition-colors">
                  Change Password
                </button>
              </div>
            </div>

            {/* Section 4: Account Actions (Logout) */}
            <div className="bg-[var(--color-trove-card-surface)] border border-[var(--color-trove-border)] rounded-[var(--radius-trove-card)] overflow-hidden">
              <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-trove-negative)]/10 flex items-center justify-center text-[var(--color-trove-negative)]">
                    <LogOut size={18} />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-semibold text-[var(--color-trove-text-default)]">Log Out</h4>
                    <p className="text-[12px] text-[var(--color-trove-text-neutral)] mt-0.5">Securely sign out of your account on this device.</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2.5 bg-white border border-[var(--color-trove-negative)] text-[var(--color-trove-negative)] text-[14px] font-medium rounded-lg hover:bg-[var(--color-trove-negative)] hover:text-white transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}