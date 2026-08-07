"use client";

import FormActions from "@/components/ui/FormActions";
import FormSection from "@/components/ui/FormSection";

import {
  AchievementFormData,
  achievementFormDefault,
} from "@/types/achievement";

import { useNotification } from "@/hooks/common/useNotification";
import { useWallet } from "@/hooks/useWallet";
import { createAchievement } from "@/lib/achievement/createAchievement";
import { useRouter } from "next/navigation";
import AchievementBasicFields from "./fields/AchievementBasicFields";
import AchievementDescriptionField from "./fields/AchievementDescriptionField";
import AchievementExpirationField from "./fields/AchievementExpirationField";
import AchievementImageField from "./fields/AchievementImageField";
import AchievementMetadataField from "./fields/AchievementMetadataField";
import AchievementStatsFields from "./fields/AchievementStatsFields";

interface Props {
  form: AchievementFormData;
  setForm: React.Dispatch<React.SetStateAction<AchievementFormData>>;
  mode?: "create" | "edit";
  initialForm?: AchievementFormData;
  onSubmit?: () => Promise<void> | void;
  hasChanges?: boolean;
}

export default function AchievementForm({
  form,
  setForm,
  mode = "create",
  initialForm,
  onSubmit,
  hasChanges = true,
}: Props) {
  const { address, isConnected } = useWallet();

  const notify = useNotification();

  const router = useRouter();

  function updateField(field: keyof AchievementFormData, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    updateField(e.target.name as keyof AchievementFormData, e.target.value);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    updateField("image", imageUrl);
  }

  async function handleCreate() {
    if (!isConnected || !address) {
      notify.warning("Please connect your wallet first.");
      return;
    }

    try {
      // Call achievement service
      const result = await createAchievement(form, address);

      if (!result.success) {
        notify.error(result.error);
        return;
      }
      notify.success("Achievement created successfully.");

      // Reset form after success
      setForm(achievementFormDefault);

      // Redirect after success
      setTimeout(() => {
        router.replace("/achievements/list");
      }, 800);
    } catch (error) {
      console.error(error);

      notify.error("Something went wrong.");
    }
  }

  function handleReset() {
    if (mode === "create") {
      setForm(achievementFormDefault);
      return;
    }

    if (initialForm) {
      setForm(initialForm);
    }
  }

  async function handleSubmit() {
    if (onSubmit) {
      await onSubmit();
      return;
    }

    await handleCreate();
  }

  return (
    <FormSection
      title={mode === "create" ? "Create Achievement" : "Edit Achievement"}
      description={
        mode === "create"
          ? "Design an achievement template that can later be issued as a Soulbound credential."
          : "Update the achievement information."
      }
    >
      <AchievementBasicFields
        form={form}
        handleChange={handleChange}
        updateField={updateField}
      />

      <AchievementDescriptionField form={form} handleChange={handleChange} />

      <AchievementStatsFields form={form} handleChange={handleChange} />

      <AchievementExpirationField form={form} handleChange={handleChange} />

      <AchievementMetadataField form={form} handleChange={handleChange} />

      <AchievementImageField
        form={form}
        handleImageUpload={handleImageUpload}
      />

      <FormActions
        submitText={mode === "create" ? "Create Achievement" : "Save Changes"}
        resetText="Reset"
        onSubmit={handleSubmit}
        onReset={handleReset}
        submitDisabled={mode === "edit" && !hasChanges}
        align={mode === "edit" ? "right" : "center"}
      />
    </FormSection>
  );
}
