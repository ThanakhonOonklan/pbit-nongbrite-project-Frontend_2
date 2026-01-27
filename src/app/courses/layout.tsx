import { Metadata } from "next";

export const metadata: Metadata = {
  title: "หลักสูตร - Courses | P'Bit Learning Platform",
  description: "เรียนรู้ผ่านเกมสนุกๆ ทั้ง 7 เกม พัฒนาทักษะการคิดและการแก้ปัญหา หลักสูตร Path Navigation, Counting & Classification, Conditional Matching และอีกมากมาย",
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
