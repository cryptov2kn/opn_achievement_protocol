"use client";

import FormSection from "@/components/ui/FormSection";

import { Credential } from "@/types/credential";

import CredentialDetailActions from "./detail/CredentialDetailActions";
import CredentialDetailHeader from "./detail/CredentialDetailHeader";
import CredentialDetailInfo from "./detail/CredentialDetailInfo";
import CredentialDetailMetadata from "./detail/CredentialDetailMetadata";

interface Props {
  credential: Credential;
}

export default function CredentialDetailContent({ credential }: Props) {
  return (
    <>
      <FormSection
        title="Credential Detail"
        description="View the credential information and blockchain status."
      >
        <CredentialDetailHeader credential={credential} />

        <CredentialDetailInfo credential={credential} />

        <CredentialDetailMetadata credential={credential} />

        <CredentialDetailActions credential={credential} />
      </FormSection>
    </>
  );
}
