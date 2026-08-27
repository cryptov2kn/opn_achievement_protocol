/*"use client";

import { useEffect, useState } from "react";

import { getCredentialDetail } from "@/lib/credential/getCredentialDetail";
import { Credential } from "@/types/credential";

export function useCredentialDetail(id: string) {
  const [credential, setCredential] = useState<Credential | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadCredential() {
      try {
        setLoading(true);

        const result = await getCredentialDetail(id);

        if (!cancelled && result.success) {
          setCredential(result.data as Credential);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadCredential();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return {
    credential,
    loading,
  };
}
*/

"use client";

import { useEffect, useState } from "react";

import { getCredentialDetail } from "@/lib/credential/getCredentialDetail";
import { mockCredentials } from "@/lib/credential/mockCredentials";
import { Credential } from "@/types/credential";

const USE_MOCK = true;

export function useCredentialDetail(id: string) {
  const [apiCredential, setApiCredential] = useState<Credential | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (USE_MOCK) return;

    let cancelled = false;

    async function loadCredential() {
      try {
        setLoading(true);

        const result = await getCredentialDetail(id);

        if (!cancelled && result.success) {
          setApiCredential(result.data as Credential);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadCredential();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const credential = USE_MOCK
    ? (mockCredentials.find((item) => item.id === id) ?? null)
    : apiCredential;

  return {
    credential,
    loading: USE_MOCK ? false : loading,
  };
}
