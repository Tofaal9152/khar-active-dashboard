import React from "react";
import { Spinner } from "@/components/ui/spinner";

interface LoadGuardProps {
  isLoading: boolean;
  error?: unknown;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const LoadGuard: React.FC<LoadGuardProps> = ({
  isLoading,
  error,
  children,
  fallback,
}) => {
  if (isLoading) {
    return (
      fallback || (
        <div
          className="flex items-center justify-center min-h-24"
          role="status"
          aria-label="Loading..."
        >
          <Spinner className="h-5 w-5" />
        </div>
      )
    );
  }

  if (error) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
        ? error
        : "Something went wrong.";

    return (
      <div
        className="text-red-600 dark:text-red-400 text-center p-4"
        role="alert"
      >
        <p className="font-medium">Error</p>
        <p className="text-sm">{message}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadGuard;
