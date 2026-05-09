"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

export default function Scratchpad() {
  const { scratchpadContent, setScratchpadContent } = useStore();
  const editorRef = useRef<HTMLDivElement>(null);

  // Load initial content
  useEffect(() => {
    if (editorRef.current && scratchpadContent !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = scratchpadContent || "Start typing here...";
    }
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      setScratchpadContent(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string) => {
    document.execCommand(command, false, undefined);
    if (editorRef.current) {
      editorRef.current.focus();
      handleInput();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background/50 rounded-lg border border-border overflow-hidden">
      <div className="flex items-center gap-1 p-2 bg-surface border-b border-border">
        <button 
          onClick={() => execCommand('bold')}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-surface-hover rounded transition-colors"
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button 
          onClick={() => execCommand('italic')}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-surface-hover rounded transition-colors"
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <div className="w-px h-4 bg-border mx-1"></div>
        <button 
          onClick={() => execCommand('insertUnorderedList')}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-surface-hover rounded transition-colors"
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button 
          onClick={() => execCommand('insertOrderedList')}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-surface-hover rounded transition-colors"
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="flex-1 p-4 overflow-y-auto text-gray-300 focus:outline-none prose prose-invert max-w-none text-sm"
        style={{ minHeight: '200px' }}
      >
      </div>
    </div>
  );
}
