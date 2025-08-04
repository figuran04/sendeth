"use client";

import { useCallback } from "react";
import toast from "react-hot-toast";

export function useClipboard() {
  const copyToClipboard = useCallback((text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Address copied to clipboard!"))
      .catch(() => toast.error("Failed to copy address."));
  }, []);

  return { copyToClipboard };
}
