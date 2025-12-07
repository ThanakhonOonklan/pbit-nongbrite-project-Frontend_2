import { Navbar } from "@/components/layout/Navbar";
import { PrimaryButton } from "@/components/common";
import { Image } from "@/components/common/Image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 bg-[#EDF0F7] py-12 md:py-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div className="flex flex-col gap-6 md:gap-8 text-center lg:text-left">
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-[#1cb0f6]">เรียนรู้</span>{" "}
                <span className="text-[#ffd300]">ไปด้วยกัน</span>
                <br />
                <span className="text-gray-800">กับ P&apos;Bit Nong Brite</span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                แพลตฟอร์มการเรียนรู้ที่สนุกและน่าสนใจ 
                พร้อมกับเพื่อนคู่หู P&apos;Bit และ Nong Brite 
                เริ่มต้นการผจญภัยการเรียนรู้ของคุณวันนี้!
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
                <Link href="/courses" className="w-full sm:w-auto">
                  <PrimaryButton 
                    variant="sky-blue" 
                    size="lg"
                    className="w-full sm:w-auto min-w-[180px]"
                  >
                    เริ่มเรียนเลย
                  </PrimaryButton>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <PrimaryButton 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto min-w-[180px]"
                  >
                    ดูเพิ่มเติม
                  </PrimaryButton>
                </Link>
              </div>
            </div>

            {/* Right Side - Mascots */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-square">
                {/* P'Bit Mascot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[250px] lg:w-[300px] h-[200px] md:h-[250px] lg:h-[300px]">
                  <div className="w-full h-full ">
                    <Image
                      src="/images/P_Bit/bit-01.svg"
                      alt="P'Bit mascot"
                      fill
                      containerClassName="w-full h-full"
                      className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
                      priority
                      sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 300px"
                    />
                  </div>
                </div>

                {/* Nong Brite Mascot */}
                <div className="absolute top-1/2 left-1/2 w-[120px] md:w-[150px] lg:w-[180px] h-[132px] md:h-[165px] lg:h-[198px] translate-x-[80px] md:translate-x-[100px] lg:translate-x-[120px] -translate-y-[40px] md:-translate-y-[50px] lg:-translate-y-[60px]">
                  <div className="w-full h-full ">
                    <Image
                      src="/images/Nong_brite/nong-brite-02.svg"
                      alt="Nong Brite mascot"
                      fill
                      containerClassName="w-full h-full"
                      className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
                      priority
                      sizes="(max-width: 768px) 120px, (max-width: 1024px) 150px, 180px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
