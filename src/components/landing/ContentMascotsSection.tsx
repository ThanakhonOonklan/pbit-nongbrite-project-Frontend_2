import { PrimaryButton, OuterContainer } from "@/components/common";
import { Image } from "@/components/common/Image";
import Link from "next/link";

type ContentBlock = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageOnLeft: boolean;
  accentColor: string;
  buttonVariant:
    | "sky-blue"
    | "illusion"
    | "pastel-green"
    | "yellow"
    | "outline";
  ctaText: string;
  ctaHref: string;
};

const contentBlocks: ContentBlock[] = [
  {
    title: "วันนี้อยากเรียนอะไรกับ P'Bit?",
    description:
      "เลือกเส้นทางที่ชอบแล้วเริ่มผจญภัยไปพร้อมเกมสั้น ๆ ที่สอดแทรกทักษะพื้นฐานแบบสนุกและเข้าใจง่าย",
    imageSrc: "/images/P_Bit/bit-01.svg",
    imageAlt: "P'Bit character",
    imageOnLeft: true,
    accentColor: "#1cb0f6",
    buttonVariant: "sky-blue",
    ctaText: "เริ่มเรียนรู้",
    ctaHref: "/courses",
  },
  {
    title: "ท้าทายตัวเองด้วยมินิเกมดีไหม?",
    description:
      "เก็บเหรียญ สะสมแต้ม แล้วปลดล็อกด่านใหม่ ๆ ระหว่างฝึกตรรกะ คณิตศาสตร์ และการแก้ปัญหาไปพร้อมกัน",
    imageSrc: "/images/P_Minnie/minnie-01.svg",
    imageAlt: "Nong Brite character",
    imageOnLeft: false,
    accentColor: "#ec4899", // pink tone
    buttonVariant: "illusion",
    ctaText: "ลองเล่นมินิเกม",
    ctaHref: "/games",
  },
  {
    title: "เรียนซ้ำเมื่อไหร่ก็ได้ใช่ไหม?",
    description:
      "เปิดดูบทเรียนย้อนหลัง ทบทวนจุดที่ยังไม่มั่นใจ แล้วลองเล่นรอบใหม่ได้ทุกอุปกรณ์ทุกเวลา",
    imageSrc: "/images/P_Momo/momo-01.svg",
    imageAlt: "P'Bit character",
    imageOnLeft: true,
    accentColor: "#22c55e",
    buttonVariant: "pastel-green",
    ctaText: "ดูแผนการเรียน",
    ctaHref: "/about",
  },
];

export function ContentMascotsSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-10 lg:px-16 bg-[#F5F7FF] layout-debug">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">
        {contentBlocks.map((block, index) => (
          // use padStart to present 01 / 02 / 03 on each frame
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-14 p-2 md:p-4"
          >
            {/* Image */}
            <div
              className={`flex justify-center ${
                block.imageOnLeft ? "md:order-1" : "md:order-2"
              }`}
            >
              <div className="relative">
                {/* Blob background */}
                <div
                  className="absolute -inset-10 md:-inset-12 -z-10 rounded-[45%] rotate-[-6deg]"
                  style={{
                    backgroundColor: `${block.accentColor}26`,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                  }}
                />
                <div className="relative w-[280px] md:w-[360px] min-h-[240px] md:min-h-[300px] flex items-center justify-center">
                  <div className="relative w-[180px] h-[180px] md:w-[240px] md:h-[240px]">
                    <Image
                      src={block.imageSrc}
                      alt={block.imageAlt}
                      fill
                      containerClassName="w-full h-full"
                      className="object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.12)]"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              className={`flex flex-col gap-3 ${
                block.imageOnLeft ? "md:order-2" : "md:order-1"
              } items-center md:items-start text-center md:text-left max-w-xl mx-auto`}
            >
              <h3
                className="text-2xl md:text-3xl font-bold"
                style={{ color: block.accentColor }}
              >
                {block.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {block.description}
              </p>
              <div className="mt-2">
                <Link href={block.ctaHref}>
                  <PrimaryButton variant={block.buttonVariant} size="sm" className="w-full md:w-auto">
                    {block.ctaText}
                  </PrimaryButton>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

