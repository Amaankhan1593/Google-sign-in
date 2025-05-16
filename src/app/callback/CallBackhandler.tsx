'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      router.replace("/");
      return;
    }

    const exchangeCode = async () => {
      try {
        const res = await fetch(`/api/auth/callback?code=${code}`);
        if (res.ok) {
          router.replace("/welcome");
        } else {
          router.replace("/");
        }
      } catch (err) {
        console.error("OAuth error:", err);
        router.replace("/");
      }
    };

    exchangeCode();
  }, [router, searchParams]);

  return null;
}