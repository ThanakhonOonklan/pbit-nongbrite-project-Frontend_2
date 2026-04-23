import * as React from "react";
import { Container } from "@/components/common/Container";
import { Image } from "@/components/common/Image";
import { cn } from "@/lib/utils";
import { FaMars, FaVenus, FaGenderless, FaTrophy, FaFire } from "react-icons/fa";
import { StatCard } from "./StatCard";
import { EditProfileButton } from "./EditProfileButton";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { EditProfileForm } from "./EditProfileForm";
import { Divide } from "lucide-react";
// import { getRankBadgeImageByRankId } from "@/constants/ranks";
import { getRankBadgeImage, getRankByScore } from "@/constants/ranks";
import { useUserStore } from "@/store/user.store";
import { useAuthStore } from "@/store/auth.store";
import { Gender } from "@/services/user.service";
import { useTranslations } from "next-intl";

export interface ProfileHeaderProps {
  className?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ className }) => {
  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);
  const streakDetails = useUserStore((state) => state.streakDetails);
  const fetchProfile = useUserStore((state) => state.fetchProfile);
  const fetchAndUpdateStreak = useUserStore((state) => state.fetchAndUpdateStreak);
  const updateProfile = useUserStore((state) => state.updateProfile);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const t = useTranslations("Profile");
  const tRanks = useTranslations("Ranks");



  // Fetch profile when authenticated (on mount and when auth state changes)
  React.useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
      fetchAndUpdateStreak();
    }
  }, [isAuthenticated, fetchProfile, fetchAndUpdateStreak]);

  // Helper: Get icon filename (handle null)
  const getIconFilename = (): string => {
    if (!user?.profile?.icon) {
      return "icon_P_Bit.png"; // Default icon
    }
    return user.profile.icon;
  };

  // Helper: Map Gender enum to Translated string
  const getGenderTranslated = (gender: Gender | undefined): string => {
    switch (gender) {
      case Gender.MALE:
        return t("genderMale");
      case Gender.FEMALE:
        return t("genderFemale");
      case Gender.OTHER:
        return t("genderOther");
      default:
        return t("genderMale");
    }
  };

  // Helper: Map Thai string to Gender enum
  const getGenderEnum = (genderThai: string): Gender => {
    switch (genderThai) {
      case "เพศชาย":
        return Gender.MALE;
      case "เพศหญิง":
        return Gender.FEMALE;
      case "ไม่ระบุตัวตน":
        return Gender.OTHER;
      default:
        return Gender.MALE;
    }
  };

  // Helper: Format joined date
  const formatJoinedDate = (dateString: string | undefined): string => {
    if (!dateString) return "";
    // Parse date string like "03/01/2026 16:47"
    const [datePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/");

    const monthKeys = [
      "jan", "feb", "mar", "apr", "may", "jun",
      "jul", "aug", "sep", "oct", "nov", "dec"
    ];

    const monthIndex = parseInt(month, 10) - 1;
    const monthKey = monthKeys[monthIndex] || "jan";

    return t("Header.joinedOn", {
      day: parseInt(day, 10),
      month: t(`months.${monthKey}`),
      year
    });
  };

  const handleEditProfile = () => {
    setIsEditOpen(true);
  };

  const handleSaveProfile = async (data: {
    name: string;
    gender: string;
    character: string;
  }) => {
    setIsSaving(true);
    try {
      await updateProfile({
        name: data.name,
        gender: data.gender as Gender,
        icon: data.character,
      });
      // Fetch profile again after update to get realtime data (including stats)
      await fetchProfile();
      setIsEditOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      // Error is already handled in store
    } finally {
      setIsSaving(false);
    }
  };

  // Helper functions for gender icon and color
  const getGenderIcon = (gender: Gender | undefined) => {
    switch (gender) {
      case Gender.MALE:
        return FaMars;
      case Gender.FEMALE:
        return FaVenus;
      case Gender.OTHER:
        return FaGenderless;
      default:
        return FaMars;
    }
  };

  const getGenderColor = (gender: Gender | undefined) => {
    switch (gender) {
      case Gender.MALE:
        return "text-[#1CB0F6]";
      case Gender.FEMALE:
        return "text-[#EC4899]";
      case Gender.OTHER:
        return "text-[#344054]";
      default:
        return "text-[#344054]";
    }
  };

  // Loading state
  if (isLoading && !user) {
    return (
      <Container className={cn("p-4 sm:p-5 md:p-4 lg:p-6 w-full", className)}>
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">{t("Header.loading")}</div>
        </div>
      </Container>
    );
  }

  // No user data
  if (!user) {
    return null;
  }

  // Extract data from user
  const selectedCharacter = getIconFilename();
  const userName = user.name || "";
  const gender = user.gender;
  const joinDate = formatJoinedDate(user.profile?.createdAt);
  const rank = user.profile?.currentRank || 0;
  const daystate = streakDetails?.current ?? user.streaks?.current ?? 0;
  const totalScore = user.stats?.totalScore || 0;
  const currentRank = getRankByScore(totalScore);
  const maxScore = 6300;
  const progressPercent = (totalScore / maxScore) * 100;

  return (
    <>
      <Container
        className={cn(
          "p-4 sm:p-5 md:p-4 lg:p-6 w-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] relative overflow-visible",
          className
        )}
      >
        {/* ปุ่มแก้ไขโปรไฟล์ */}
        <EditProfileButton onClick={handleEditProfile} />

        {/* ส่วนหลัก: รูปโปรไฟล์และข้อมูลผู้ใช้ */}
        <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0">
          {/* รูปโปรไฟล์ */}
          <div className="relative w-full h-[140px] sm:h-[150px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] rounded-[12px] flex items-center justify-center z-10">
            <Image
              src={`/icons/icon-Profile/${selectedCharacter}`}
              alt="Character Avatar"
              fill
              containerClassName="w-full h-full"
              className="object-contain"
              style={{ objectPosition: "center 60%" }}
              sizes="(max-width: 768px) 150px, (max-width: 1024px) 180px, 180px"
            />
          </div>

          {/* ข้อมูลผู้ใช้ */}
          <div className="flex-1 flex flex-col gap-2 sm:gap-2.5 md:gap-2 md:rounded-r-[12px] md:px-3 md:py-2.5 lg:px-4 lg:py-3">
            {/* ชื่อผู้ใช้และไอคอนเพศ */}
            <div className="flex items-center gap-2">
              <h2 className="text-[18px] sm:text-[19px] md:text-[19px] lg:text-[20px] leading-[28px] font-bold text-gray-800">
                {userName}
              </h2>
              {React.createElement(getGenderIcon(gender), {
                className: cn(
                  "w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5",
                  getGenderColor(gender)
                ),
                "aria-label": getGenderTranslated(gender),
              })}
            </div>
            {/* วันที่เข้าร่วม */}
            <span className="text-[13px] sm:text-[13px] md:text-[13px] lg:text-[14px] leading-[20px] font-medium text-gray-600">
              {joinDate}
            </span>

            {/* Progress Bar Section */}
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div className="relative flex-1 h-[8px] sm:h-[10px] bg-[#E0F2FF] rounded-full overflow-hidden shadow-inner min-w-0">
                <div
                  className="absolute left-0 top-0 h-full bg-[#1cb0f6] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                />
              </div>
              <span className="text-[10px] sm:text-[11px] md:text-[12px] font-bold text-[#1cb0f6] whitespace-nowrap">
                {totalScore.toLocaleString()}/{maxScore.toLocaleString()}
              </span>
            </div>

            {/* การ์ดสถิติ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 sm:mt-4">
              {/* การ์ดอันดับ */}
              <StatCard
                imageSrc={getRankBadgeImage(totalScore)}
                imageAlt={`${currentRank.name} badge`}
                title={tRanks(currentRank.name)}
                description={t("Header.stats.rank")}

              />

              {/* การ์ดคะแนนสูงสุด */}
              <StatCard
                imageSrc="/icons/BookOpen.svg"
                imageAlt="Score"
                title={totalScore.toString()}
                description={t("Header.stats.score")}

              />

              {/* การ์ดวันที่เล่นต่อเนื่อง */}
              <StatCard
                imageSrc="/icons/Flame.svg"
                imageAlt="Streak"
                title={daystate.toString()}
                description={t("Header.stats.streak")}

              />
            </div>
          </div>
        </div>
      </Container>

      {/* แผ่นแก้ไขโปรไฟล์ (Side Sheet) */}
      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <SheetContent
          side="right"
          className={cn(
            "w-full sm:max-w-md bg-white border-l border-black/10",
            "overflow-y-auto p-6"
          )}
        >
          <SheetTitle>{t("Header.editProfile")}</SheetTitle>
          <Divide className="w-full h-px bg-gray-200 my-2" />
          <SheetDescription className="sr-only"></SheetDescription>

          <EditProfileForm
            initialName={userName}
            initialGender={gender || Gender.MALE}
            initialCharacter={selectedCharacter}
            onSave={handleSaveProfile}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
