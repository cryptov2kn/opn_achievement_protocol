"use client";

import CustomSelect from "@/components/ui/CustomSelect";
import FormActions from "@/components/ui/FormActions";
import FormInput from "@/components/ui/FormInput";
import FormSection from "@/components/ui/FormSection";
import FormTextarea from "@/components/ui/FormTextarea";
import ImageUpload from "@/components/ui/ImageUpload";

import { useNotification } from "@/hooks/common/useNotification";
import { useWallet } from "@/hooks/useWallet";
import { createIssuer } from "@/lib/issuer/createIssuer";
import { IssuerFormData, issuerFormDefault } from "@/types/issuer";

interface Props {
  form: IssuerFormData;

  setForm: React.Dispatch<React.SetStateAction<IssuerFormData>>;
}
export default function RegisterIssuerForm({ form, setForm }: Props) {
  const { address, isConnected } = useWallet();

  const notify = useNotification();

  function updateField(field: keyof IssuerFormData, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    updateField("logo", imageUrl);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    updateField(e.target.name as keyof IssuerFormData, e.target.value);
  }

  async function handleSubmit() {
    if (!isConnected || !address) {
      notify.warning("Please connect your wallet first.");
      return;
    }

    try {
      const result = await createIssuer(form, address);

      if (!result.success) {
        notify.error(result.error);
        return;
      }
      notify.success("Issuer registered successfully.");
      // Reset form after success
      setForm(issuerFormDefault);
    } catch (error) {
      console.error(error);
      notify.error("Something went wrong.");
    }
  }

  function handleReset() {
    setForm(issuerFormDefault);
  }

  return (
    <FormSection
      title="Register as Issuer"
      description="Become an organization and issue credentials on OPN."
    >
      {/* Organization Name */}
      <FormInput
        label="Organization Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      {/* Type + Category */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:gap-4">
        <CustomSelect
          label="Organization Type"
          value={form.organizationType}
          onChange={(value) => updateField("organizationType", value)}
          options={[
            "DAO",
            "Company",
            "University",
            "Community",
            "Hackathon Organizer",
          ]}
        />

        <CustomSelect
          label="Category"
          value={form.category}
          onChange={(value) => updateField("category", value)}
          options={[
            "Education",
            "Technology",
            "Gaming",
            "Research",
            "DeFi",
            "AI",
          ]}
        />
      </div>

      {/* Website + Twitter */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-4">
        <FormInput
          label="Website"
          name="website"
          value={form.website}
          onChange={handleChange}
          placeholder="https://example.com"
        />

        <FormInput
          label="Twitter / X"
          name="twitter"
          value={form.twitter}
          onChange={handleChange}
          placeholder="@opnnetwork"
        />
      </div>

      {/* Description */}
      <FormTextarea
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Tell us about your organization..."
        rows={5}
      />

      {/* Country + Founded */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-4">
        <FormInput
          label="Country"
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Vietnam"
        />

        <FormInput
          label="Founded Year"
          name="foundedYear"
          value={form.foundedYear}
          onChange={handleChange}
          placeholder="2024"
        />
      </div>

      {/* Upload */}
      <ImageUpload
        label="Organization Logo"
        image={form.logo}
        onChange={handleLogoUpload}
      />

      {/* Button */}
      <FormActions
        submitText="Register as Issuer"
        onSubmit={handleSubmit}
        onReset={handleReset}
      />
    </FormSection>
  );
}
