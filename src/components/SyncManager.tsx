"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/useStore";
import { Cloud, CloudOff, RefreshCw } from "lucide-react";

export default function SyncManager() {
  const { syncConfig, tasks, scratchpadContent } = useStore();
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "error" | "success">("idle");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const payload = JSON.stringify({ tasks, scratchpadContent });

  const syncToCloud = async () => {
    if (!syncConfig.enabled || !syncConfig.supabaseUrl || !syncConfig.supabaseAnonKey) {
      return;
    }

    setSyncStatus("syncing");

    try {
      // Assuming a generic table 'devmike_state' with a single row 'id=1' for REST endpoint sync
      const res = await fetch(`${syncConfig.supabaseUrl}/rest/v1/devmike_state?id=eq.1`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "apikey": syncConfig.supabaseAnonKey,
          "Authorization": `Bearer ${syncConfig.supabaseAnonKey}`,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({ state_payload: payload, updated_at: new Date().toISOString() })
      });

      if (!res.ok) {
        throw new Error("Sync failed with status " + res.status);
      }

      setSyncStatus("success");
      setTimeout(() => setSyncStatus("idle"), 3000);
    } catch (error) {
      console.error("Sync error:", error);
      setSyncStatus("error");
    }
  };

  const isInitialMount = useRef(true);

  // Debounced auto-sync whenever the payload changes
  useEffect(() => {
    if (!syncConfig.enabled) return;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      syncToCloud();
    }, 2000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [payload, syncConfig.enabled]);

  if (!syncConfig.enabled) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-xs text-gray-500">
        <CloudOff size={14} />
        <span>Sync Disabled</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-xs transition-colors ${
      syncStatus === "error" ? "text-red-400" :
      syncStatus === "success" ? "text-green-400" :
      "text-gray-400"
    }`}>
      {syncStatus === "syncing" ? (
        <RefreshCw size={14} className="animate-spin text-primary" />
      ) : (
        <Cloud size={14} />
      )}
      <span>
        {syncStatus === "syncing" ? "Syncing..." :
         syncStatus === "success" ? "Synced" :
         syncStatus === "error" ? "Sync Error" : "Cloud Active"}
      </span>
    </div>
  );
}
