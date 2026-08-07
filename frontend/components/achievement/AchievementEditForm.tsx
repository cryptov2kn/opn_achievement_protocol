"use client";

import FormActions from "@/components/ui/FormActions";
import FormSection from "@/components/ui/FormSection";

import { AchievementFormData } from "@/types/achievement";

import AchievementBasicFields from "./fields/AchievementBasicFields";
import AchievementDescriptionField from "./fields/AchievementDescriptionField";
import AchievementExpirationField from "./fields/AchievementExpirationField";
import AchievementImageField from "./fields/AchievementImageField";
import AchievementMetadataField from "./fields/AchievementMetadataField";
import AchievementStatsFields from "./fields/AchievementStatsFields";

interface Props {
  form: AchievementFormData;
  setForm: React.Dispatch<React.SetStateAction<AchievementFormData>>;
  initialForm?: AchievementFormData;
  hasChanges?: boolean;
  onSubmit: () => Promise<void> | void;
}

export default function AchievementEditForm({
  form,
  setForm,
  initialForm,
  hasChanges = true,
  onSubmit,
}: Props) {
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

  function handleReset() {
    if (initialForm) {
      setForm(initialForm);
    }
  }

  async function handleSubmit() {
    await onSubmit();
  }

  return (
    <FormSection
      title="Edit Achievement"
      description="Update the achievement information."
    >
      <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
        {/* Left */}
        <div>
          <AchievementImageField
            form={form}
            handleImageUpload={handleImageUpload}
            variant="compact"
          />
        </div>

        {/* Right */}
        <div className="space-y-6">
          <AchievementBasicFields
            form={form}
            handleChange={handleChange}
            updateField={updateField}
          />

          <AchievementDescriptionField
            form={form}
            handleChange={handleChange}
          />

          <AchievementStatsFields form={form} handleChange={handleChange} />

          <AchievementExpirationField form={form} handleChange={handleChange} />

          <AchievementMetadataField form={form} handleChange={handleChange} />
        </div>
      </div>

      <FormActions
        submitText="Save Changes"
        resetText="Reset"
        onSubmit={handleSubmit}
        onReset={handleReset}
        submitDisabled={!hasChanges}
        align="right"
      />
    </FormSection>
  );
}
