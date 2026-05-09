"use client";

import { useStore } from "@/store/useStore";
import RichTextEditor from "./RichTextEditor";

export default function Scratchpad() {
  const { scratchpadContent, setScratchpadContent } = useStore();

  return (
    <RichTextEditor 
      content={scratchpadContent} 
      onChange={setScratchpadContent} 
      placeholder="Jot down notes, brainstorm, or format text here..."
      minHeight="300px"
    />
  );
}
