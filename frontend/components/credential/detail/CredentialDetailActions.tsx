"use client";

import { useState } from "react";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import FormActions from "@/components/ui/FormActions";

import { Credential } from "@/types/credential";

interface Props {
  credential: Credential;
}

export default function CredentialDetailActions({ credential }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const isRevoked = credential.status === "revoked";

  function handleRevoke() {
    // TODO:
    // Contract revoke sẽ được tích hợp sau.
    console.log("Revoke credential:", credential.id);

    setConfirmOpen(false);
  }

  return (
    <>
      <FormActions
        submitText={isRevoked ? "Credential Revoked" : "Revoke Credential"}
        onSubmit={() => setConfirmOpen(true)}
        align="right"
        //disabled={isRevoked}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Revoke Credential?"
        description="This action cannot be undone. Are you sure you want to revoke this credential?"
        confirmText="Revoke"
        cancelText="Cancel"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleRevoke}
      />
    </>
  );
}
