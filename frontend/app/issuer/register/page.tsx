"use client";

import { useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import RegisterIssuerForm from "@/components/issuer/RegisterIssuerForm";
import WhyBecomeIssuer from "@/components/issuer/WhyBecomeIssuer";
import IssuerPreviewCard from "@/components/issuer/IssuerPreviewCard";

export default function RegisterIssuerPage() {
  const [form, setForm] = useState({
    name: "",
    organizationType: "DAO",
    category: "Education",
    website: "",
    twitter: "",
    description: "",
    country: "",
    foundedYear: "",
    logo: "",
  });

  return (
    <main className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-4 md:p-6 xl:p-8">
        <Topbar />

        <div className="mt-6 md:mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8">
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
      </div>
    </main>
  );
}
