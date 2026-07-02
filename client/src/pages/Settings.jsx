import { useNavigate } from "react-router-dom";
import { Bell, Moon, Download, Trash2, User } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/common/PageHeader";
import SectionCard from "../components/common/SectionCard";
import useAuth from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";
import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../services/accountService";

export default function Settings() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const deleteMutation = useMutation({
    mutationFn: deleteAccount,

    onSuccess: () => {
      localStorage.removeItem("token");

      navigate("/");

      window.location.reload();
    },
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [confirmText, setConfirmText] = useState("");
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <DashboardLayout onLogout={handleLogout}>
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences"
        icon="⚙️"
      />

      <div className="space-y-6">
        {/* Account */}

        <SectionCard>
          <div className="flex items-center gap-3 mb-4">
            <User size={22} />
            <h2 className="text-xl font-bold">Account</h2>
          </div>

          <p className="text-slate-500">Manage your profile and account.</p>

          <button
            onClick={() => navigate("/profile")}
            className="mt-4 px-5 py-3 rounded-2xl bg-indigo-600 text-white"
          >
            View Profile
          </button>
        </SectionCard>

        {/* Theme */}

        <SectionCard>
          <div className="flex items-center gap-3 mb-4">
            <Moon size={22} />
            <h2 className="text-xl font-bold">Appearance</h2>
          </div>

          <div className="flex justify-between items-center">
            <span>Dark Mode</span>

            <input
              type="checkbox"
              className="h-5 w-5"
              checked={darkMode}
              onChange={toggleTheme}
            />
          </div>
        </SectionCard>

        {/* Danger Zone */}

        <SectionCard>
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-3xl p-6">
            <div className="flex items-center gap-3">
              <Trash2 className="text-red-600" size={22} />
              <h3 className="text-xl font-bold text-red-600">Danger Zone</h3>
            </div>

            <p className="text-sm text-slate-500 mt-2">
              Permanently delete your account and all associated data.
            </p>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700"
            >
              Delete Account
            </button>
          </div>
        </SectionCard>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-red-600">Delete Account</h2>

            <p className="mt-3 text-slate-600 dark:text-slate-400">
              This action cannot be undone.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Type <strong>DELETE</strong> below to confirm.
            </p>

            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE"
              className="w-full mt-4 px-4 py-3 border rounded-2xl bg-transparent"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setConfirmText("");
                }}
                className="px-5 py-3 rounded-2xl border"
              >
                Cancel
              </button>

              <button
                disabled={confirmText !== "DELETE" || deleteMutation.isPending}
                onClick={() => deleteMutation.mutate()}
                className="px-5 py-3 rounded-2xl bg-red-600 text-white disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="border-t pt-4 mt-6 text-sm text-slate-500">
        Traction v1.0.0
        <br />
        Crafted by Dhwanil Chaudhari
      </div>
    </DashboardLayout>
  );
}
