import Link from "next/link";
import { PrimaryButton } from "@/components/common";
import { Image } from "@/components/common/Image";

export function CTAFooterSection() {
  return (
    <section id="cta" className="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-gradient-to-br from-[#1cb0f6] to-[#0d8fc7]">
      <div className="max-w-4xl mx-auto h-[470px]">
        <div className="flex flex-col items-center text-center">
          {/* Mascots */}
          <div 
            className="relative w-full max-w-md mb-8 h-[250px] md:h-[300px]"
            style={{
              '--pbit-left': '50%',
              '--pbit-top': '50%',
              '--pbit-translate-x': '-60%',
              '--pbit-translate-y': '-50%',
              '--nongbrite-left': '45%',
              '--nongbrite-top': '63%',
              '--nongbrite-translate-x': '20%',
              '--nongbrite-translate-y': '-50%',
            } as React.CSSProperties}
          >
            <div 
              className="absolute w-[200px] md:w-[250px] h-[200px] md:h-[250px]"
              style={{
                left: 'var(--pbit-left)',
                top: 'var(--pbit-top)',
                transform: 'translate(var(--pbit-translate-x), var(--pbit-translate-y))',
              }}
            >
              <Image
                src="/images/P_Bit/bit-05.svg"
                alt="P'Bit mascot"
                fill
                containerClassName="w-full h-full"
                className="object-contain"
              />
            </div>
            <div 
              className="absolute w-[120px] md:w-[150px] h-[132px] md:h-[165px]"
              style={{
                left: 'var(--nongbrite-left)',
                top: 'var(--nongbrite-top)',
                transform: 'translate(var(--nongbrite-translate-x), var(--nongbrite-translate-y))',
              }}
            >
              <Image
                src="/images/Nong_brite/nong-brite-01.svg"
                alt="Nong Brite mascot"
                fill
                containerClassName="w-full h-full"
                className="object-contain"
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
          <Link href="/login">
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

