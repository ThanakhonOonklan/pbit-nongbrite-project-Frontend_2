import * as React from "react";
import { CiEdit } from "react-icons/ci";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export interface EditProfileButtonProps {
  onClick?: () => void;
  className?: string;
}

export const EditProfileButton: React.FC<EditProfileButtonProps> = ({
  onClick,
  className,
}) => {
  const t = useTranslations("Profile");

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "absolute top-4 right-4 w-10 h-10 rounded-lg z-50",
        "border-2 border-gray-300 bg-white",
        "flex items-center justify-center",
        "transition-all duration-200",
        "hover:border-[#1cb0f6] hover:bg-[#F5FAFF]",
        "text-gray-600 hover:text-[#1cb0f6]",
        "focus:outline-none focus:ring-2 focus:ring-[#1cb0f6] focus:ring-offset-2",
        "pointer-events-auto",
        className
      )}
      aria-label={t("Header.editProfile")}
    >
      <CiEdit className="w-5 h-5" />
    </button>
  );
};

EditProfileButton.displayName = "EditProfileButton";
