import Link from "next/link";
import { PrimaryButton } from "@/components/common";
import { Image } from "@/components/common/Image";

export function CTAFooterSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-gradient-to-br from-[#1cb0f6] to-[#0d8fc7]">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Mascots */}
          <div className="relative w-full max-w-md mb-8 flex justify-center">
            <div className="relative w-[200px] md:w-[250px] h-[200px] md:h-[250px]">
              <Image
                src="/images/P_Bit/bit-01.svg"
                alt="P'Bit mascot"
                fill
                containerClassName="w-full h-full"
                className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
              />
            </div>
            <div className="absolute right-0 md:right-8 top-8 w-[120px] md:w-[150px] h-[132px] md:h-[165px]">
              <Image
                src="/images/Nong_brite/nong-brite-02.svg"
                alt="Nong Brite mascot"
                fill
                containerClassName="w-full h-full"
                className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
              />
            </div>
          </div>

          {/* Content */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            พร้อมเริ่มต้นการผจญภัยแล้วหรือยัง?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            เข้าร่วมกับผู้เรียนหลายพันคนและเริ่มต้นการเดินทางสู่การเรียนรู้ที่สนุกสนาน
          </p>

          {/* CTA Button */}
          <Link href="/courses">
            <PrimaryButton 
              variant="yellow" 
              size="lg"
              className="min-w-[200px]"
            >
              เริ่มเรียนเลยตอนนี้
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

