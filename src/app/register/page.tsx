"use client";

import { RegisterForm } from "@/components/auth/RegisterForm";
import { Image } from "@/components/common/Image";

export default function RegisterPage() {
  const handleRegister = (_email: string, _password: string, _confirmPassword: string) => {
    // TODO: Add your register logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDF0F7] p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Background Mascots - Decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* P'Bit - Top Right */}
        <div className="absolute top-10 right-10 w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] opacity-20 md:opacity-30">
          <Image
            src="/images/P_Bit/bit-01.svg"
            alt="P'Bit mascot"
            fill
            containerClassName="w-full h-full"
            className="object-contain"
            sizes="(max-width: 768px) 120px, (max-width: 1024px) 150px, 180px"
          />
        </div>
        
        {/* Nong Brite - Bottom Left */}
        <div className="absolute bottom-10 left-10 w-[100px] h-[110px] md:w-[130px] md:h-[143px] lg:w-[160px] lg:h-[176px] opacity-20 md:opacity-30">
          <Image
            src="/images/Nong_brite/nong-brite-02.svg"
            alt="Nong Brite mascot"
            fill
            containerClassName="w-full h-full"
            className="object-contain"
            sizes="(max-width: 768px) 100px, (max-width: 1024px) 130px, 160px"
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </div>
  );
}

