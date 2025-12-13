"use client";

import { PrimaryButton } from "@/components/common";
import { Image } from "@/components/common/Image";
import Link from "next/link";
import TrueFocus from "@/components/TrueFocus";
import BlurText from "./BlurText";
import TextType from "./TextType";

export function HeroSection() {
  return (
    <section className="flex-1 bg-[#EDF0F7] py-12 md:py-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="flex flex-col gap-6 md:gap-8 text-center lg:text-left">
            {/* Headline */}
            <div className="flex flex-col gap-2 items-center lg:items-start">
              <div className="text-gray-900 leading-tight ">
                <TrueFocus
                  sentence="เรียนรู้ ไปด้วยกัน!!"
                  blurAmount={1}
                  borderColor="#38bdf8"
                  glowColor="rgba(56, 189, 248, 0.6)"
                  animationDuration={0.6}
                  pauseBetweenAnimations={3}
                 
                />
              </div>
              <div className="flex flex-wrap items-baseline justify-center lg:justify-start gap-2">
                <BlurText
                  text="P'Bit"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="m-0 text-4xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#38bdf8]"
                />
                <BlurText
                  text="Nong Brite"
                  delay={180}
                  animateBy="words"
                  direction="top"
                  className="m-0 text-4xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#fbbf24]"
                />
              </div>
            </div>

            {/* Description */}
            <TextType
              as="p"
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
              text="แพลตฟอร์มการเรียนรู้ที่สนุกและน่าสนใจ พร้อมกับเพื่อนคู่หู P'Bit และ Nong Brite เริ่มต้นการผจญภัยการเรียนรู้ของคุณวันนี้!"
              typingSpeed={50}
              pauseDuration={1500}
              loop={false}
              showCursor
              cursorCharacter="|"
            />

            {/* CTA Buttons */}
            <div className="flex flex-row flex-wrap gap-3 justify-center lg:justify-start mt-4">
              <Link href="/courses" className="w-full sm:w-auto">
                <PrimaryButton
                  variant="sky-blue"
                  size="sm"
                  className="w-full sm:w-auto min-w-[150px] px-4 py-3 text-base"
                >
                  เริ่มเรียนเลย
                </PrimaryButton>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <PrimaryButton
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto min-w-[150px] px-4 py-3 text-base"
                >
                  ดูเพิ่มเติม
                </PrimaryButton>
              </Link>
            </div>
          </div>

          {/* Right Side - Mascots */}
          <div className="relative flex items-center justify-center lg:justify-end ">
            <div className="relative w-full max-w-md aspect-square">

               {/* Nong Brite Mascot */}
              <div className="absolute top-1/2 left-1/2 w-[85px] md:w-[115px] lg:w-[115px] h-[105px] md:h-[135px] lg:h-[135px] translate-x-[-32px] md:translate-x-[-50px] lg:translate-x-[-50px] -translate-y-[140px] md:-translate-y-[170px] lg:-translate-y-[170px]">
                <div className="w-full h-full ">
                  <Image
                    src="/images/Nong_brite/nong-brite-01.svg"
                    alt="Nong Brite mascot"
                    fill
                    containerClassName="w-full h-full"
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 120px, (max-width: 1024px) 150px, 180px"
                  />
                </div>
              </div>
              {/* P'Bit Mascot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] md:w-[200px] lg:w-[200px] h-[195px] md:h-[235px] lg:h-[235px]">
                <div className="w-full h-full ">
                  <Image
                    src="/images/P_Bit/bit-02.svg"
                    alt="P'Bit mascot"
                    fill
                    containerClassName="w-full h-full"
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 300px"
                  />
                </div>
              </div>
               {/* P_Momo Mascot พี่วัว*/}
               <div className="absolute top-1/2 left-1/2 w-[120px] md:w-[155px] lg:w-[155px] h-[155px] md:h-[195px] lg:h-[195px] -translate-x-[-60px] md:-translate-x-[-60px] lg:-translate-x-[-60px] translate-y-[-50px] md:translate-y-[-70px] lg:translate-y-[-70px]">
                <div className="w-full h-full ">
                  <Image
                    src="/images/P_Momo/momo-02.svg"
                    alt="P Momo mascot"
                    fill
                    containerClassName="w-full h-full"
                    className="object-contain"
                    sizes="(max-width: 768px) 85px, (max-width: 1024px) 105px, 125px"
                  />
                </div>
              </div>
            
              {/* P_Bobo Mascot หมี*/}
              <div className="absolute top-1/2 left-1/2 w-[130px] md:w-[165px] lg:w-[165px] h-[145px] md:h-[180px] lg:h-[180px] -translate-x-[160px] md:-translate-x-[220px] lg:-translate-x-[220px] -translate-y-[50px] md:-translate-y-[60px] lg:-translate-y-[60px]">
                <div className="w-full h-full ">
                  <Image
                    src="/images/P_Bobo/bobo-02.svg"
                    alt="P Bobo mascot"
                    fill
                    containerClassName="w-full h-full"
                    className="object-contain"
                    sizes="(max-width: 768px) 90px, (max-width: 1024px) 110px, 130px"
                  />
                </div>
              </div>

              {/* P_Coco Mascot  หมา*/}
              <div className="absolute top-1/2 left-1/2 w-[90px] md:w-[120px] lg:w-[120px] h-[85px] md:h-[115px] lg:h-[115px] translate-x-[10px] md:translate-x-[10px] lg:translate-x-[10px] -translate-y-[-10px] md:-translate-y-[2px] lg:-translate-y-[2px]">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/P_Coco/coco-05.svg"
                    alt="P Coco mascot"
                    fill
                    containerClassName="w-full h-full"
                    className="object-contain"
                    sizes="(max-width: 768px) 90px, (max-width: 1024px) 110px, 130px"
                  />
                </div>
              </div>

              {/* P_PingPing Mascot เเพนกวิน*/}
              <div className="absolute top-1/2 left-1/2 w-[120px] md:w-[155px] lg:w-[155px] h-[90px] md:h-[120px] lg:h-[120px] -translate-x-[110px] md:-translate-x-[150px] lg:-translate-x-[150px] -translate-y-[-10px] md:-translate-y-[0px] lg:-translate-y-[0px]">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/P_PingPing/pingping-01.svg"
                    alt="P PingPing mascot"
                    fill
                    containerClassName="w-full h-full"
                    className="object-contain"
                    sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
                  />
                </div>
              </div>

              {/* P_Minnie Mascot กระต่าย*/}
              <div className="absolute top-1/2 left-1/2 w-[125px] md:w-[160px] lg:w-[160px] h-[140px] md:h-[175px] lg:h-[175px] -translate-x-[200px] md:-translate-x-[300px] lg:-translate-x-[300px] translate-y-[-40px] md:translate-y-[-56px] lg:translate-y-[-56px]">
                <div className="w-full h-full ">
                  <Image
                    src="/images/P_Minnie/minnie-04.svg"
                    alt="P Minnie mascot"
                    fill
                    containerClassName="w-full h-full"
                    className="object-contain"
                    sizes="(max-width: 768px) 85px, (max-width: 1024px) 105px, 125px"
                  />
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
