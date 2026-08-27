/*"use client";

import { useEffect, useState } from "react";

import { useWallet } from "@/hooks/useWallet";
import { getCredentialList } from "@/lib/credential/getCredentialList";
import { Credential } from "@/types/credential";

export function useCredentialList() {
  const { address, isConnected, loadingWallet } = useWallet();

  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isConnected || !address) return;

    const walletAddress = address.toLowerCase();

    let cancelled = false;

    async function loadCredentials() {
      try {
        setLoading(true);

        const result = await getCredentialList(walletAddress);

        if (!cancelled && result.success) {
          setCredentials(result.data as Credential[]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadCredentials();

    return () => {
      cancelled = true;
    };
  }, [address, isConnected]);

  return {
    credentials,
    loading,
    isConnected,
    loadingWallet,
  };
}
*/

"use client";

import { useEffect, useState } from "react";

import { useWallet } from "@/hooks/useWallet";
import { getCredentialList } from "@/lib/credential/getCredentialList";
import { mockCredentials } from "@/lib/credential/mockCredentials";
import { Credential } from "@/types/credential";

const USE_MOCK = true;

export function useCredentialList() {
  const { address, isConnected, loadingWallet } = useWallet();

  const [apiCredentials, setApiCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (USE_MOCK) return;

    if (!isConnected || !address) {
      return;
    }

    const walletAddress = address.toLowerCase();

    let cancelled = false;

    async function loadCredentials() {
      try {
        setLoading(true);

        const result = await getCredentialList(walletAddress);

        if (!cancelled && result.success) {
          setApiCredentials(result.data as Credential[]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadCredentials();

    return () => {
      cancelled = true;
    };
  }, [address, isConnected]);

  /*
   * MOCK MODE
   * Dùng trực tiếp mock data để test UI.
   */
  if (USE_MOCK) {
    return {
      credentials: mockCredentials,
      loading: false,
      isConnected: true,
      loadingWallet: false,
    };
  }

  /*
   * REAL API MODE
   * Nếu chưa connect wallet thì trả về danh sách rỗng
   * mà không cần setState trong useEffect.
   */
  if (!isConnected || !address) {
    return {
      credentials: [],
      loading: false,
      isConnected,
      loadingWallet,
    };
  }

  return {
    credentials: apiCredentials,
    loading,
    isConnected,
    loadingWallet,
  };
}
