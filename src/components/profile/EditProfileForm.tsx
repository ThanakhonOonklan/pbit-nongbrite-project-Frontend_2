"use client";

import * as React from "react";
import { InputField } from "@/components/common/InputField";
import { Image } from "@/components/common/Image";
import { SocialButton } from "@/components/common/SocialButton";
import { getLabelClassName } from "@/lib/label";
import { cn } from "@/lib/utils";
import { FaMars, FaVenus, FaGenderless } from "react-icons/fa";
import { useTranslations } from "next-intl";

// Character list
const CHARACTERS = [
  "icon_P_Bit.png",
  "icon_Nong_Brite.png",
  "icon_P_Bobo.png",
  "icon_P_Coco.png",
  "icon_P_Minnie.png",
  "icon_P_Momo.png",
  "icon_P_Pingping.png",
];

export interface EditProfileFormProps {
  initialName?: string;
  initialGender?: string;
  initialCharacter?: string;
  onSave?: (data: { name: string; gender: string; character: string }) => void;
  className?: string;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({
  initialName = "",
  initialGender = "MALE",
  initialCharacter = "icon_P_Bit.png",
  onSave,
  className,
}) => {
  const t = useTranslations("Profile");
  const [name, setName] = React.useState(initialName);
  
  const [gender, setGender] = React.useState<string>(initialGender);
  const [selectedCharacter, setSelectedCharacter] = React.useState(initialCharacter);
  const [errors, setErrors] = React.useState<{ name?: string }>({});

  // Check if there are any changes
  const hasChanges = React.useMemo(() => {
    return (
      name.trim() !== (initialName || "").trim() ||
      gender !== initialGender ||
      selectedCharacter !== initialCharacter
    );
  }, [name, gender, selectedCharacter, initialName, initialGender, initialCharacter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: { name?: string } = {};
    if (!name.trim()) {
      newErrors.name = t("EditForm.nameRequired");
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Ensure gender is not null (default to "MALE" if null)
    const finalGender = gender || "MALE";
    onSave?.({ name: name.trim(), gender: finalGender, character: selectedCharacter });
  };

  const handleGenderSelect = (
    selectedGender: string
  ) => {
    setGender(selectedGender === gender ? "" : selectedGender);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Avatar Preview */}
        <div className="flex justify-center">
          <div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] z-10">
            <Image
              src={`/icons/icon-Profile/${selectedCharacter}`}
              alt="Selected Avatar"
              fill
              containerClassName="w-full h-full"
              className="object-contain"
              sizes="(max-width: 640px) 120px, 140px"
            />
          </div>
        </div>

        {/* Name Field */}
        <InputField
          label={t("EditForm.usernameLabel")}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) {
              setErrors((prev) => ({ ...prev, name: undefined }));
            }
          }}
          error={errors.name}
          placeholder={t("EditForm.usernamePlaceholder")}
          className="bg-transparent border border-gray-300"
        />

        {/* Gender Field */}
        <div className="flex flex-col gap-2 w-full">
          <label className={getLabelClassName("text-[11px] sm:text-[12px] leading-[16px] sm:leading-[18px] font-semibold text-[#334E68]")}>
            {t("EditForm.genderLabel")}
          </label>
          <div className="flex gap-2 sm:gap-3 w-full">
            <SocialButton
              variant={gender === "MALE" ? "selected" : "default"}
              selected={gender === "MALE"}
              onSelect={() => handleGenderSelect("MALE")}
              className="flex-1 h-11 sm:h-12"
            >
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <FaMars className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[13px] sm:text-[14px]">{t("genderMale")}</span>
              </div>
            </SocialButton>
            <SocialButton
              variant={gender === "FEMALE" ? "female" : "default"}
              selected={gender === "FEMALE"}
              onSelect={() => handleGenderSelect("FEMALE")}
              className="flex-1 h-11 sm:h-12"
            >
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <FaVenus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[13px] sm:text-[14px]">{t("genderFemale")}</span>
              </div>
            </SocialButton>
            <SocialButton
              variant={
                gender === "OTHER" ? "not-specified" : "default"
              }
              selected={gender === "OTHER"}
              onSelect={() => handleGenderSelect("OTHER")}
              className="flex-1 h-11 sm:h-12"
              >
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <FaGenderless className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[13px] sm:text-[14px]">{t("genderOther")}</span>
              </div>
            </SocialButton>
          </div>
        </div>

        {/* Character Selection Grid */}
        <div className="flex flex-col gap-2 w-full">
          <label className={getLabelClassName("text-[11px] sm:text-[12px] leading-[16px] sm:leading-[18px] font-semibold text-[#334E68]")}>
            {t("EditForm.profilePicLabel")}
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {CHARACTERS.map((character) => {
                  const isSelected = selectedCharacter === character;
                  return (
                    <button
                      key={character}
                      type="button"
                      onClick={() => setSelectedCharacter(character)}
                      className={cn(
                    "relative w-full aspect-square rounded-lg overflow-hidden",
                    "transition-all duration-200",
                        "hover:scale-105",
                        isSelected
                          ? "ring-2 ring-[#1cb0f6] shadow-[0_2px_6px_rgba(28,176,246,0.2)]"
                          : "hover:shadow-md"
                      )}
                      aria-label={`เลือก ${character}`}
                    >
                      <Image
                        src={`/icons/icon-Profile/${character}`}
                        alt={character}
                        fill
                        containerClassName="w-full h-full"
                        className="object-contain"
                    sizes="(max-width: 768px) 25vw, 20vw"
                      />
                      {isSelected && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#1cb0f6] flex items-center justify-center">
                          <svg
                        className="w-3.5 h-3.5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-4 sm:mt-6">
          <button
            type="submit"
            disabled={!hasChanges}
            className={cn(
              "w-full px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg font-medium transition-all duration-200",
              "bg-[#1cb0f6] text-white border border-[#1699D6]",
              "text-[14px] sm:text-[15px]",
              "hover:bg-[#17a3e3] hover:border-[#1280B5]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1cb0f6] disabled:hover:border-[#1699D6]"
            )}
          >
            {t("EditForm.saveBtn")}
          </button>
        </div>
      </div>
    </form>
  );
};

EditProfileForm.displayName = "EditProfileForm";

