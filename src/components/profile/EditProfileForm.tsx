"use client";

import * as React from "react";
import { InputField } from "@/components/common/InputField";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { Image } from "@/components/common/Image";
import { SocialButton } from "@/components/common/SocialButton";
import { getLabelClassName } from "@/lib/label";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoCheckmark } from "react-icons/io5";

// Character list
const CHARACTERS = [
  "character-01.svg",
  "character-02.svg",
  "character-03.svg",
  "character-04.svg",
  "character-05.svg",
  "character-06.svg",
  "character-07.svg",

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
  initialGender = "เพศชาย",
  initialCharacter = "character-01.svg",
  onSave,
  className,
}) => {
  const [name, setName] = React.useState(initialName);
  
  // Map gender from Thai to internal format
  const mapGenderToInternal = (gender: string): "male" | "female" | "not-specified" | null => {
    if (gender === "เพศชาย") return "male";
    if (gender === "เพศหญิง") return "female";
    if (gender === "ไม่ระบุตัวตน") return "not-specified";
    return "male"; // Default
  };

  // Map gender from internal format to Thai
  const mapGenderToThai = (gender: "male" | "female" | "not-specified" | null): string => {
    if (gender === "male") return "เพศชาย";
    if (gender === "female") return "เพศหญิง";
    if (gender === "not-specified") return "ไม่ระบุตัวตน";
    return "เพศชาย"; // Default
  };

  const [gender, setGender] = React.useState<"male" | "female" | "not-specified" | null>(
    mapGenderToInternal(initialGender)
  );
  const [selectedCharacter, setSelectedCharacter] = React.useState(initialCharacter);
  const [errors, setErrors] = React.useState<{ name?: string }>({});
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: { name?: string } = {};
    if (!name.trim()) {
      newErrors.name = "กรุณากรอกชื่อ";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Ensure gender is not null (default to "male" if null)
    const finalGender = gender || "male";
    onSave?.({ name: name.trim(), gender: mapGenderToThai(finalGender), character: selectedCharacter });
  };


  const handleGenderSelect = (
    selectedGender: "male" | "female" | "not-specified"
  ) => {
    setGender(selectedGender === gender ? null : selectedGender);
  };

  // Check scroll position to enable/disable navigation buttons
  const checkScrollPosition = React.useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  // Scroll handlers
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const itemWidth = 128 + 12; // w-32 (128px) + gap-3 (12px)
      scrollContainerRef.current.scrollBy({
        left: -itemWidth * 2, // Scroll 2 items at a time
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const itemWidth = 128 + 12; // w-32 (128px) + gap-3 (12px)
      scrollContainerRef.current.scrollBy({
        left: itemWidth * 2, // Scroll 2 items at a time
        behavior: "smooth",
      });
    }
  };

  // Check scroll position on mount and when scrolling
  React.useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, [checkScrollPosition]);

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div className="flex flex-col gap-6">
        {/* Character Selection Field - Moved to top */}
        <div className="flex flex-col gap-2 w-full">
          <label className={getLabelClassName("text-[12px] leading-[18px] font-semibold text-[#334E68]")}>
            โปรไฟล์
          </label>
          <div className="relative">
            {/* Navigation Buttons */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={scrollLeft}
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 z-10",
                  "w-8 h-8 rounded-full bg-white border-2 border-gray-200",
                  "flex items-center justify-center",
                  "hover:bg-[#F5FAFF] hover:border-[#1cb0f6]",
                  "transition-all duration-200 shadow-md"
                )}
                aria-label="เลื่อนซ้าย"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            {canScrollRight && (
              <button
                type="button"
                onClick={scrollRight}
                className={cn(
                  "absolute right-0 top-1/2 -translate-y-1/2 z-10",
                  "w-8 h-8 rounded-full bg-white border-2 border-gray-200",
                  "flex items-center justify-center",
                  "hover:bg-[#F5FAFF] hover:border-[#1cb0f6]",
                  "transition-all duration-200 shadow-md"
                )}
                aria-label="เลื่อนขวา"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            )}
            
            {/* Character Scroll Container */}
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-3 min-w-max">
                {CHARACTERS.map((character) => {
                  const isSelected = selectedCharacter === character;
                  return (
                    <button
                      key={character}
                      type="button"
                      onClick={() => setSelectedCharacter(character)}
                      className={cn(
                        "relative w-32 h-32 min-w-[128px] rounded-full overflow-hidden",
                        "border-2 transition-all duration-200 flex-shrink-0",
                        "hover:scale-105",
                        isSelected
                          ? "border-[#1cb0f6] bg-[#EAF8FF] shadow-[0_2px_6px_rgba(28,176,246,0.2)]"
                          : "border-gray-200 bg-white hover:border-[#E0F2FF] hover:bg-[#F4F9FF]"
                      )}
                      aria-label={`เลือก ${character}`}
                    >
                      <Image
                        src={`/images/All-Character/${character}`}
                        alt={character}
                        fill
                        containerClassName="w-full h-full"
                        className="object-contain p-4"
                        sizes="128px"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#1cb0f6] flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
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
          </div>
        </div>

        {/* Name Field */}
        <InputField
          label="ชื่อผู้ใช้"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) {
              setErrors((prev) => ({ ...prev, name: undefined }));
            }
          }}
          error={errors.name}
          placeholder="กรุณากรอกชื่อผู้ใช้"
        />

        {/* Gender Field */}
        <div className="flex flex-col gap-2 w-full">
          <label className={getLabelClassName("text-[12px] leading-[18px] font-semibold text-[#334E68]")}>
            เพศ
          </label>
          <div className="flex gap-3 w-full">
            <SocialButton
              variant={gender === "male" ? "selected" : "default"}
              selected={gender === "male"}
              onSelect={() => handleGenderSelect("male")}
              className="flex-1"
              style={{ width: "auto" }}
            >
              เพศชาย
            </SocialButton>
            <SocialButton
              variant={gender === "female" ? "female" : "default"}
              selected={gender === "female"}
              onSelect={() => handleGenderSelect("female")}
              className="flex-1"
              style={{ width: "auto" }}
            >
              เพศหญิง
            </SocialButton>
            <SocialButton
              variant={
                gender === "not-specified" ? "not-specified" : "default"
              }
              selected={gender === "not-specified"}
              onSelect={() => handleGenderSelect("not-specified")}
              className="flex-1"
              style={{ width: "auto" }}
            >
              ไม่ระบุตัวตน
            </SocialButton>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex justify-end mt-8">
          <PrimaryButton
            type="submit"
            size="sm"
            variant="red-outline"
            className="flex items-center gap-2 hover:bg-[#FF4D4D] hover:text-white transition-colors duration-200"
          >
            <IoCheckmark className="w-5 h-5" />
            <span>บันทึก</span>
          </PrimaryButton>
        </div>
      </div>
    </form>
  );
};

EditProfileForm.displayName = "EditProfileForm";

