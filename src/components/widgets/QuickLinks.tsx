"use client";

import { Link as LinkIcon, ExternalLink, Plus } from "lucide-react";

export default function QuickLinks() {
  const links = [
    { id: 1, name: "GitHub Repo", url: "https://github.com" },
    { id: 2, name: "Vercel Dashboard", url: "https://vercel.com" },
    { id: 3, name: "Figma Designs", url: "https://figma.com" },
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 space-y-2">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-2 rounded-lg hover:bg-surface-hover text-gray-300 transition-colors group"
          >
            <div className="w-8 h-8 rounded bg-surface border border-border flex items-center justify-center mr-3 text-gray-400 group-hover:text-primary transition-colors">
              <LinkIcon size={14} />
            </div>
            <span className="text-sm font-medium flex-1">{link.name}</span>
            <ExternalLink size={14} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
      <button className="flex items-center justify-center w-full mt-4 p-2 rounded border border-border border-dashed text-gray-500 hover:text-gray-300 hover:border-gray-500 transition-colors text-sm font-medium">
        <Plus size={16} className="mr-2" /> Add Link
      </button>
    </div>
  );
}
