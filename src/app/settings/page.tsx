"use client";

import { useStore } from "@/store/useStore";
import { useState } from "react";
import { Save, Download, Cloud, Key, Link as LinkIcon, Info } from "lucide-react";

export default function SettingsPage() {
  const { syncConfig, setSyncConfig, hydrateState } = useStore();
  
  const [supabaseUrl, setSupabaseUrl] = useState(syncConfig.supabaseUrl || "");
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(syncConfig.supabaseAnonKey || "");
  const [syncEnabled, setSyncEnabled] = useState(syncConfig.enabled || false);
  const [calendarUrl, setCalendarUrl] = useState(syncConfig.calendarUrl || "");
  
  const [isSaving, setIsSaving] = useState(false);
  const [pullStatus, setPullStatus] = useState<"idle" | "pulling" | "success" | "error">("idle");
  const [calSyncStatus, setCalSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle");
  
  const { setCalendarEvents } = useStore();

  const handleSave = () => {
    setIsSaving(true);
    setSyncConfig({
      supabaseUrl,
      supabaseAnonKey,
      enabled: syncEnabled,
      calendarUrl,
    });
    setTimeout(() => setIsSaving(false), 800);
  };

  const handlePullFromCloud = async () => {
    if (!supabaseUrl || !supabaseAnonKey) return;
    
    setPullStatus("pulling");
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/devmike_state?id=eq.1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseAnonKey,
          "Authorization": `Bearer ${supabaseAnonKey}`,
        }
      });

      if (!res.ok) throw new Error("Failed to fetch state");
      
      const data = await res.json();
      if (data && data.length > 0 && data[0].state_payload) {
        const payload = JSON.parse(data[0].state_payload);
        
        // Hydrate store
        hydrateState({
          tasks: payload.tasks || [],
          scratchpadContent: payload.scratchpadContent || "",
        });
        
        setPullStatus("success");
      } else {
        throw new Error("No data found");
      }
    } catch (err) {
      console.error(err);
      setPullStatus("error");
    } finally {
      setTimeout(() => setPullStatus("idle"), 3000);
    }
  };

  const handleSyncCalendar = async () => {
    if (!calendarUrl) return;
    setCalSyncStatus("syncing");
    try {
      const res = await fetch(`/api/calendar?url=${encodeURIComponent(calendarUrl)}`);
      if (!res.ok) throw new Error("Failed to sync calendar");
      const data = await res.json();
      if (data.events) {
        setCalendarEvents(data.events);
        setCalSyncStatus("success");
      } else {
        throw new Error("No events found");
      }
    } catch (err) {
      console.error(err);
      setCalSyncStatus("error");
    } finally {
      setTimeout(() => setCalSyncStatus("idle"), 3000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background p-6 lg:p-10 overflow-y-auto">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Configure your dashboard preferences and cloud sync.</p>
        </div>

        {/* Sync Configuration Section */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Cloud size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Supabase Cloud Sync</h2>
              <p className="text-sm text-gray-400">Sync your tasks and scratchpad to Supabase</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Enable Sync Toggle */}
            <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
              <div>
                <div className="font-medium text-white">Enable Auto-Sync</div>
                <div className="text-xs text-gray-400 mt-1">Automatically push changes to cloud</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={syncEnabled}
                  onChange={(e) => setSyncEnabled(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {/* URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
                <LinkIcon size={14} /> Project URL
              </label>
              <input
                type="text"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://your-project.supabase.co"
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {/* Anon Key Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
                <Key size={14} /> Anon Key
              </label>
              <input
                type="password"
                value={supabaseAnonKey}
                onChange={(e) => setSupabaseAnonKey(e.target.value)}
                placeholder="eyJh..."
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {/* iCal URL Input */}
            <div className="pt-4 border-t border-border">
              <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
                <LinkIcon size={14} /> iCal Feed URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={calendarUrl}
                  onChange={(e) => setCalendarUrl(e.target.value)}
                  placeholder="https://calendar.google.com/calendar/ical/.../basic.ics"
                  className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                <button
                  onClick={handleSyncCalendar}
                  disabled={!calendarUrl || calSyncStatus === "syncing"}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                    calSyncStatus === "syncing" ? "bg-gray-700 text-gray-400" :
                    calSyncStatus === "success" ? "bg-green-500/20 text-green-400" :
                    calSyncStatus === "error" ? "bg-red-500/20 text-red-400" :
                    "bg-surface-hover text-white hover:bg-gray-700"
                  }`}
                >
                  {calSyncStatus === "syncing" ? "Syncing..." : 
                   calSyncStatus === "success" ? "Synced" :
                   calSyncStatus === "error" ? "Error" : "Sync iCal"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border mt-6">
              <button
                onClick={handlePullFromCloud}
                disabled={!supabaseUrl || !supabaseAnonKey || pullStatus === "pulling"}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  pullStatus === "pulling" ? "bg-gray-700 text-gray-400" :
                  pullStatus === "success" ? "bg-green-500/20 text-green-400" :
                  pullStatus === "error" ? "bg-red-500/20 text-red-400" :
                  "bg-surface-hover text-white hover:bg-gray-700"
                }`}
              >
                <Download size={18} />
                {pullStatus === "pulling" ? "Pulling..." : 
                 pullStatus === "success" ? "Restored Successfully" :
                 pullStatus === "error" ? "Failed to Pull" : "Restore from Cloud"}
              </button>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
              >
                <Save size={18} />
                {isSaving ? "Saved!" : "Save Settings"}
              </button>
            </div>
            
            {/* Supabase Setup Instructions */}
            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-400 flex items-center gap-2 mb-2">
                <Info size={16} /> Supabase Setup Instructions
              </h3>
              <p className="text-xs text-gray-300 mb-3">
                To use cloud sync, create a Supabase project and run this SQL in the SQL Editor to create the necessary table:
              </p>
              <div className="bg-background/80 p-3 rounded border border-border overflow-x-auto">
                <pre className="text-xs text-gray-300 font-mono">
{`CREATE TABLE devmike_state (
  id integer PRIMARY KEY,
  state_payload jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert the initial row that the app updates
INSERT INTO devmike_state (id, state_payload) VALUES (1, '{}'::jsonb);

-- Set up Row Level Security (RLS) - Adjust based on your security needs
-- The below allows anon access for personal dashboards (not recommended for public apps)
ALTER TABLE devmike_state ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous read" ON devmike_state FOR SELECT USING (true);
CREATE POLICY "Allow anonymous update" ON devmike_state FOR UPDATE USING (true);`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
