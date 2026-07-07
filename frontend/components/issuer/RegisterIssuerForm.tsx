"use client";

import CustomSelect from "@/components/ui/CustomSelect";
import FormInput from "@/components/ui/FormInput";

interface FormData {
  name: string;
  organizationType: string;
  category: string;
  website: string;
  twitter: string;
  description: string;
  country: string;
  foundedYear: string;
  logo: string;
}

interface Props {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function RegisterIssuerForm({ form, setForm }: Props) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setForm({
      ...form,
      logo: imageUrl,
    });
  };

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit() {
    try {
      const response = await fetch("/api/issuer/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          wallet: "0x123456789", // Sau này sẽ thay bằng địa chỉ ví thật
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Register failed.");
        return;
      }

      console.log("Register Success:", result);

      alert("Issuer registered successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }
  return (
    <div
      className="
      rounded-3xl
      border border-violet-500/20
      bg-zinc-900/60
      backdrop-blur-xl
      p-5
      md:p-6
      xl:p-8
      "
    >
      <h1 className="text-xl sm:text-2xl xl:text-3xl font-bold">
        Register as Issuer
      </h1>

      <p className="mt-2 text-sm md:text-base text-zinc-400">
        Become an organization and issue credentials on OPN.
      </p>

      <div className="mt-6 md:mt-8 xl:mt-10 space-y-5 xl:space-y-6">
        {/* Organization Name */}
        <FormInput
          label="Organization Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        {/* Type + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xl:gap-4">
          <CustomSelect
            label="Organization Type"
            value={form.organizationType}
            onChange={(value) =>
              setForm({
                ...form,
                organizationType: value,
              })
            }
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
            onChange={(value) =>
              setForm({
                ...form,
                category: value,
              })
            }
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-4">
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
        <div>
          <label className="block pl-2 text-sm md:text-base font-medium text-zinc-300">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Tell us about your organization..."
            className="
    mt-2
    w-full

    h-28
    md:h-32

    px-4
    py-3
    md:py-4

    rounded-2xl

    bg-zinc-800/50

    border
    border-zinc-700

    text-white
    placeholder:text-zinc-500

    resize-none

    outline-none

    transition-all
    duration-300

    focus:border-violet-500
    focus:ring-4
    focus:ring-violet-500/10
  "
          />
        </div>

        {/* Country + Founded */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-4">
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
        <div>
          <label className="block pl-2 text-sm md:text-base font-medium text-zinc-300">
            Organization Logo
          </label>

          <div className="mt-2">
            <label
              className="
    h-28
    md:h-32
    rounded-2xl
    border-2
    border-dashed
    border-zinc-700
    hover:border-violet-500/50
    bg-zinc-800/30
    flex
    flex-col
    items-center
    justify-center
    text-zinc-400
    cursor-pointer
    transition
    "
            >
              {form.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.logo}
                  alt="logo"
                  className="
      h-16
      w-16
      md:h-20
      md:w-20
      rounded-full
      object-cover
    "
                />
              ) : (
                <>
                  <p className="font-medium">Upload Logo</p>

                  <p className="text-xs text-zinc-500 mt-1">PNG, JPG, SVG</p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </label>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="
  w-full
  h-12
  md:h-14
  text-sm
  md:text-base
  rounded-2xl
  bg-violet-600
  hover:bg-violet-500
  transition
  font-semibold
  "
        >
          Register as Issuer
        </button>
      </div>
    </div>
  );
}
