import Link from "next/link";
import { PrimaryButton } from "@/components/common";
import CourseCarousel, { type CarouselItem } from "@/components/courses/CourseCarousel";

// ตัวอย่างข้อมูลคอร์ส - สามารถดึงจาก API หรือ database ได้ในอนาคต
const featuredCourses: CarouselItem[] = [
  {
    id: 1,
    title: "คอร์สพื้นฐาน",
    description: "เริ่มต้นการเรียนรู้กับ P'Bit และ Nong Brite",
    imageSrc: "/icons/gameprofile_1.png",
    imageAlt: "Basic Course",
  },
  {
    id: 2,
    title: "คอร์สขั้นกลาง",
    description: "พัฒนาทักษะของคุณให้ก้าวหน้า",
    imageSrc: "/icons/gameprofile_1.png",
    imageAlt: "Intermediate Course",
  },
  {
    id: 3,
    title: "คอร์สขั้นสูง",
    description: "ท้าทายตัวเองกับเนื้อหาขั้นสูง",
    imageSrc: "/icons/gameprofile_1.png",
    imageAlt: "Advanced Course",
  },
  {
    id: 4,
    title: "คอร์สพิเศษ",
    description: "เนื้อหาพิเศษที่คุณไม่ควรพลาด",
    imageSrc: "/icons/gameprofile_1.png",
    imageAlt: "Special Course",
  },
];

export function CoursesPreviewSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-[#EDF0F7]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            คอร์สเรียนยอดนิยม
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            เลือกคอร์สที่เหมาะกับคุณและเริ่มต้นการผจญภัยการเรียนรู้
          </p>
        </div>

        {/* Course Carousel */}
        <div className="flex justify-center mb-8 w-full">
          <CourseCarousel
            items={featuredCourses}
            baseWidth={280}
            autoplay={true}
            autoplayDelay={4000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link href="/courses">
            <PrimaryButton variant="sky-blue" size="lg">
              ดูคอร์สทั้งหมด
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

