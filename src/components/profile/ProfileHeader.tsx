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
import { mockMyRankData } from "@/constants/mocks/userData";

export interface ProfileHeaderProps {
  className?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ className }) => {
  // Extract filename from avatar path
  const getAvatarFilename = (avatarPath: string): string => {
    return avatarPath.split("/").pop() || "icon_P_Bit.png";
  };

  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [selectedCharacter, setSelectedCharacter] = React.useState(
    getAvatarFilename(mockMyRankData.avatar || "/icons/icon-Profile/icon_P_Bit.png")
  );
  const [gender, setGender] = React.useState(mockMyRankData.gender ?? "เพศชาย");
  const [userName, setUserName] = React.useState(mockMyRankData.name);

  // ข้อมูลผู้ใช้ (Mock data - จะแทนที่ด้วยข้อมูลจริงจาก API)
  const joinDate = mockMyRankData.joinDate ;
  const rank = mockMyRankData.rank;
  const highestScore = mockMyRankData.score;
  const daystate = mockMyRankData.daystate;
  const maxScore = 6300;
  const progressPercent = (highestScore / maxScore) * 100;

  const handleEditProfile = () => {
    setIsEditOpen(true);
  };

  const handleSaveProfile = (data: {
    name: string;
    gender: string;
    character: string;
  }) => {
    setUserName(data.name);
    setSelectedCharacter(data.character);
    setGender(data.gender);
    setIsEditOpen(false);
  };

  // ฟังก์ชันช่วยสำหรับแสดงไอคอนและสีตามเพศ
  const getGenderIcon = (gender: string) => {
    if (gender === "เพศชาย") return FaMars;
    if (gender === "เพศหญิง") return FaVenus;
    if (gender === "ไม่ระบุตัวตน") return FaGenderless;
    return FaMars; // Default
  };

  const getGenderColor = (gender: string) => {
    if (gender === "เพศชาย") return "text-[#1CB0F6]";
    if (gender === "เพศหญิง") return "text-[#EC4899]";
    if (gender === "ไม่ระบุตัวตน") return "text-[#344054]";
    return "text-[#344054]"; // Default
  };

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
                "aria-label": gender,
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
                {highestScore.toLocaleString()}/{maxScore.toLocaleString()}
              </span>
            </div>

            {/* การ์ดสถิติ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 sm:mt-4">
              {/* การ์ดอันดับ */}
              <StatCard
                imageSrc={mockMyRankData.rankBadge}
                imageAlt="Rank badge"
                title={`#${rank}`}
                description="เเรงค์"
                iconBgColor="bg-transparent"
              />

              {/* การ์ดคะแนนสูงสุด */}
              <StatCard
                icon={<FaTrophy className="w-5 h-5 text-[#1cb0f6]" />}
                title={highestScore.toString()}
                description="คะแนนที่ได้"
                iconBgColor="bg-[#E6F3FF]"
              />

              {/* การ์ดวันที่เล่นต่อเนื่อง */}
              <StatCard
                icon={<FaFire className="w-5 h-5 text-[#FF6B6B]" />}
                title={daystate.toString()}
                description="วันที่ติดต่อกัน"
                iconBgColor="bg-[#FFE4E1]" // สีเเดงอ่อนมาก 
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
          {/* หัวข้อและคำอธิบายสำหรับ accessibility (ซ่อนไว้) */}
          <SheetTitle>แก้ไขโปรไฟล์</SheetTitle>
          <Divide className="w-full h-px bg-gray-200 my-2" />
          <SheetDescription className="sr-only"></SheetDescription>

          <EditProfileForm
            initialName={userName}
            initialGender={gender}
            initialCharacter={selectedCharacter}
            onSave={handleSaveProfile}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
