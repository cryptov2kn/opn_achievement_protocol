"use client";

import { useMemo } from "react";

import DashboardPagination from "@/components/ui/DashboardPagination";
import DashboardSection from "@/components/ui/DashboardSection";
import DashboardSelect from "@/components/ui/DashboardSelect";
import DataState from "@/components/ui/DataState";

import { useCredentialFilters } from "@/hooks/credential/useCredentialFilters";
import { useCredentialList } from "@/hooks/credential/useCredentialList";

import {
  PAGE_SIZE,
  filterCredentials,
  getTotalPages,
  paginateCredentials,
  sortCredentials,
  viewCredentials,
} from "@/lib/credential";

import CredentialTable from "./CredentialTable";

export default function CredentialSection() {
  const { credentials, loading, isConnected, loadingWallet } =
    useCredentialList();

  const { search, view, page, setView, setPage } = useCredentialFilters();

  const filteredCredentials = useMemo(() => {
    return filterCredentials(credentials, search);
  }, [credentials, search]);

  const viewedCredentials = useMemo(() => {
    let result = filteredCredentials;

    result = viewCredentials(result, view);

    result = sortCredentials(result, view);

    return result;
  }, [filteredCredentials, view]);

  const paginatedCredentials = useMemo(() => {
    return paginateCredentials(viewedCredentials, page, PAGE_SIZE);
  }, [viewedCredentials, page]);

  const totalPages = useMemo(() => {
    return getTotalPages(viewedCredentials.length, PAGE_SIZE);
  }, [viewedCredentials]);

  return (
    <DashboardSection
      title="Credentials"
      description="Manage all credentials issued by your organization."
      actions={
        <DashboardSelect
          label="View"
          value={view}
          onChange={setView}
          items={[
            {
              label: "Newest",
              value: "newest",
            },
            {
              label: "Oldest",
              value: "oldest",
            },

            {
              divider: true,
              label: "",
            },

            {
              label: "Valid",
              value: "valid",
            },
            {
              label: "Revoked",
              value: "revoked",
            },
          ]}
        />
      }
    >
      {loadingWallet ? (
        <DataState
          title="Loading Wallet..."
          description="Connecting to your wallet..."
        />
      ) : !isConnected ? (
        <DataState
          title="Wallet Not Connected"
          description="Connect your wallet to view your credentials."
        />
      ) : loading ? (
        <DataState
          title="Loading Credentials..."
          description="Fetching your credential list."
        />
      ) : viewedCredentials.length === 0 ? (
        <DataState
          title="No Credentials Found"
          description="No credentials match your current filter."
        />
      ) : (
        <>
          <CredentialTable credentials={paginatedCredentials} />

          <DashboardPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </DashboardSection>
  );
}
