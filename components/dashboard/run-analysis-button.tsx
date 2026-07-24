"use client";

import { Button } from "@/components/ui/button";

type RunAnalysisButtonProps = {
  isLoading: boolean;
  onClick: () => void;
};

export function RunAnalysisButton({
  isLoading,
  onClick,
}: RunAnalysisButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="min-w-40 px-5 py-3 text-sm font-semibold tracking-wider"
    >
      {isLoading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Analyzing
        </>
      ) : (
        "Run Analysis"
      )}
    </Button>
  );
}