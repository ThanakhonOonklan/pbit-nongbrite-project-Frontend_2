import { Image } from "@/components/common/Image";

interface Feature {
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
}

const features: Feature[] = [
  {
    title: "เรียนสนุก",
    description: "เรียนรู้ผ่านเกมที่สนุกและน่าสนใจ ทำให้การเรียนไม่น่าเบื่อ",
    icon: "/images/P_Bit/bit-01.svg",
    iconAlt: "Fun Learning",
  },
  {
    title: "ติดตามความคืบหน้า",
    description: "ดูความคืบหน้าและพัฒนาการของคุณได้ตลอดเวลา",
    icon: "/images/Nong_brite/nong-brite-02.svg",
    iconAlt: "Progress Tracking",
  },
  {
    title: "ได้รางวัล",
    description: "สะสมคะแนนและรับรางวัลจากการเรียนและเล่นเกม",
    icon: "/images/P_Bit/bit-01.svg",
    iconAlt: "Rewards",
  },
  {
    title: "เรียนได้ทุกที่",
    description: "เข้าถึงได้จากทุกอุปกรณ์ เรียนได้ทุกที่ทุกเวลา",
    icon: "/images/Nong_brite/nong-brite-02.svg",
    iconAlt: "Accessible",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            ทำไมต้องเลือกเรา?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            แพลตฟอร์มการเรียนรู้ที่ออกแบบมาเพื่อให้คุณสนุกและพัฒนาตัวเองไปพร้อมกัน
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-3 p-4 md:p-6"
            >
              {/* Icon */}
              <div className="w-20 h-20 md:w-24 md:h-24 relative">
                <Image
                  src={feature.icon}
                  alt={feature.iconAlt}
                  fill
                  containerClassName="w-full h-full"
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed max-w-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

