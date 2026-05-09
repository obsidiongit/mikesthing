"use client";

import { useStore } from "@/store/useStore";
import { Link as LinkIcon, ExternalLink, Plus, Edit2, Trash2, Check, X } from "lucide-react";
import { useState } from "react";

export default function QuickLinks() {
  const { quickLinks, addQuickLink, updateQuickLink, removeQuickLink } = useStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editUrl, setEditUrl] = useState("");

  const startEdit = (id: string, name: string, url: string) => {
    setEditingId(id);
    setEditName(name);
    setEditUrl(url);
  };

  const saveEdit = () => {
    if (editingId && editName.trim() && editUrl.trim()) {
      updateQuickLink(editingId, { name: editName, url: editUrl });
    }
    setEditingId(null);
  };

  const handleAdd = () => {
    addQuickLink({ name: "New Link", url: "https://" });
    // Find the newly added link by it being at the end of the list after render
    // A better way is to just let them click edit, or we can prompt a modal.
    // Let's just create it and let them click edit.
  };

  return (
    <div className="flex flex-col h-full w-full min-h-0">
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 pb-2">
        {quickLinks.map((link) => (
          <div key={link.id} className="group relative flex flex-col p-2 rounded-lg hover:bg-surface-hover text-gray-300 transition-colors border border-transparent hover:border-border">
            {editingId === link.id ? (
              <div className="flex flex-col gap-2 p-1">
                <input 
                  autoFocus
                  className="bg-background text-white text-sm p-1.5 rounded border border-border focus:border-primary focus:outline-none" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)} 
                  placeholder="Link Name"
                />
                <input 
                  className="bg-background text-white text-sm p-1.5 rounded border border-border focus:border-primary focus:outline-none" 
                  value={editUrl} 
                  onChange={(e) => setEditUrl(e.target.value)} 
                  placeholder="URL"
                />
                <div className="flex justify-end gap-2 mt-1">
                  <button onClick={() => setEditingId(null)} className="p-1.5 hover:bg-surface rounded text-gray-400">
                    <X size={14} />
                  </button>
                  <button onClick={saveEdit} className="p-1.5 hover:bg-surface rounded text-primary">
                    <Check size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center flex-1 min-w-0"
                >
                  <div className="w-8 h-8 flex-shrink-0 rounded bg-surface border border-border flex items-center justify-center mr-3 text-gray-400 group-hover:text-primary transition-colors">
                    <LinkIcon size={14} />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1 pr-2">
                    <span className="text-sm font-medium truncate">{link.name}</span>
                  </div>
                  <ExternalLink size={14} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mr-8" />
                </a>
                
                {/* Actions */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.preventDefault(); startEdit(link.id, link.name, link.url); }}
                    className="p-1.5 text-gray-400 hover:text-white hover:bg-surface-hover rounded"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={(e) => { e.preventDefault(); removeQuickLink(link.id); }}
                    className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-surface-hover rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="pt-3 mt-auto border-t border-border/50 shrink-0">
        <button 
          onClick={handleAdd}
          className="flex items-center justify-center w-full p-2.5 rounded-lg border border-border border-dashed text-gray-400 hover:text-white hover:border-gray-500 hover:bg-surface-hover transition-all text-sm font-medium"
        >
          <Plus size={16} className="mr-2" /> Add Link
        </button>
      </div>
    </div>
  );
}
