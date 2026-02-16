"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { destroySession } from "@/utils/session";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignOut = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const qc = useQueryClient();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await destroySession();
      qc.clear();
    } catch (err) {
      console.error("Signout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      disabled={loading}
      variant="default"
      size="sm"
      className="w-full"
    >
      {loading ? <Spinner /> : <LogOut size={16} />}
      Sign Out
    </Button>
  );
};

export const MarkettingSignOut = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const qc = useQueryClient();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await destroySession();
      qc.clear();
    } catch (err) {
      console.error("Signout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      disabled={loading}
      className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_28px_rgba(220,38,38,0.55)] transition hover:bg-red-700 ml-4"
      size="sm"
    >
      {loading ? <Spinner /> : <LogOut size={16} />}
      Sign Out
    </Button>
  );
};
export default SignOut;
