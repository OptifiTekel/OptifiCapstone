"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileSidebarToggleProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

export default function MobileSidebarToggle({
  isOpen,
  onToggle,
}: MobileSidebarToggleProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="md:hidden p-2"
      onClick={() => onToggle(!isOpen)}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  );
}
