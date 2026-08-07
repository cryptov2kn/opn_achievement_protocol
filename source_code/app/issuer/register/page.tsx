"use client";

import { useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";

import IssuerPreviewCard from "@/components/issuer/IssuerPreviewCard";
import RegisterIssuerForm from "@/components/issuer/RegisterIssuerForm";
import WhyBecomeIssuer from "@/components/issuer/WhyBecomeIssuer";
import DashboardContent from "@/components/layout/DashboardContent";

import { IssuerFormData, issuerFormDefault } from "@/types/issuer";

export default function RegisterIssuerPage() {
  const [form, setForm] = useState<IssuerFormData>(issuerFormDefault);

  return (
    <main className="flex min-h-screen">
      <Sidebar />

      <DashboardContent>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-8">
          {/* LEFT */}
          <div className="xl:col-span-2">
            <RegisterIssuerForm form={form} setForm={setForm} />
          </div>

          {/* RIGHT */}
          <div className="space-y-6 self-start">
            <WhyBecomeIssuer />

            <IssuerPreviewCard form={form} />
          </div>
        </div>
      </DashboardContent>
    </main>
  );
}
