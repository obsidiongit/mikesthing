"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { Lock } from "lucide-react";

export default function PinGate({ children }: { children: React.ReactNode }) {
  const { pin, isAuthenticated, setPin, authenticate } = useStore();
  const [inputPin, setInputPin] = useState("");
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Avoid hydration mismatch by rendering only after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Or a loading spinner matching the background
  }

  // If no PIN is set up yet, show setup screen
  if (!pin) {
    return <PinSetupScreen setPin={setPin} />;
  }

  // If authenticated, render children
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Otherwise, show login screen
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticate(inputPin)) {
      setError("");
    } else {
      setError("Incorrect PIN. Please try again.");
      setInputPin("");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background text-foreground overflow-hidden">
      <div className="w-full max-w-sm border border-border bg-surface p-10 rounded-xl shadow-2xl relative overflow-hidden">
        {/* Decorative top bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-indigo-500"></div>
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center mb-4 shadow-sm">
            <Lock className="text-gray-400" size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Mission Control</h1>
          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground mt-2 font-medium">Devmike Secure Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">ENTER PIN</label>
            <input
              type="password"
              maxLength={4}
              value={inputPin}
              onChange={(e) => setInputPin(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full bg-background border border-border text-white text-center text-3xl tracking-[0.5em] py-4 rounded-lg focus:outline-none focus:border-primary transition-colors"
              autoFocus
            />
            <div className="min-h-[24px] mt-2">
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </div>
          </div>
          <button
            type="submit"
            disabled={inputPin.length !== 4}
            className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

function PinSetupScreen({ setPin }: { setPin: (pin: string) => void }) {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length !== 4) {
      setError("PIN must be exactly 4 digits.");
      return;
    }
    if (newPin !== confirmPin) {
      setError("PINs do not match.");
      return;
    }
    setPin(newPin);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background text-foreground overflow-hidden">
      <div className="w-full max-w-sm border border-border bg-surface p-10 rounded-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-indigo-500"></div>
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center mb-4 shadow-sm">
            <Lock className="text-gray-400" size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Setup Pin</h1>
          <p className="text-xs text-gray-400 mt-2 text-center">Welcome to Mission Control. Please set up a 4-digit PIN to secure your dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="0000"
              maxLength={4}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full bg-background border border-border text-white text-center text-3xl tracking-[0.5em] py-4 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm"
              maxLength={4}
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full bg-background border border-border text-white text-center text-3xl tracking-[0.5em] py-4 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="min-h-[24px]">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={newPin.length !== 4 || confirmPin.length !== 4}
            className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save PIN
          </button>
        </form>
      </div>
    </div>
  );
}
