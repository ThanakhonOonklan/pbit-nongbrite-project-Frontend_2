"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import { Input } from "@/components/common/Input";
import { Label } from "@/components/common/Label";
import { InputField } from "@/components/common/InputField";
import { PasswordField } from "@/components/common/PasswordField";
import { Divider } from "@/components/common/Divider";
import { Stepper } from "@/components/common/Stepper";
import { Form } from "@/components/common/Form";
import { SocialButton } from "@/components/common/SocialButton";
import { Image } from "@/components/common/Image";
import { OTPInput } from "@/components/common/OTPInput";
import { GlossyGreenButton } from "@/components/common/GlossyGreenButton";
import { StatCard } from "@/components/profile/StatCard";
import { BorderedForm } from "@/components/common/BorderedForm";
import { RoundButton } from "@/components/common/RoundButton";
import { Lock, Check } from "lucide-react";
import { LeaderboardList } from "@/components/rank";
import { RankUser } from "@/types";
import { Container } from "@/components/common/Container";
import { EditButton } from "@/components/common/EditButton";  

interface CharacterPosition {
  x: number;
  y: number;
  scale: number;
  zIndex: number;
}

export default function TestComponentsPage() {
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | "not-specified" | null>(null);
  const [otpValue, setOtpValue] = useState<string[]>([]);
  
  // GSAP Animation Functions
  const animateBox = (id: string, type: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    switch (type) {
      case "fade":
        gsap.to(element, {
          opacity: element.style.opacity === "0" ? 1 : 0,
          duration: 0.5,
        });
        break;
      case "slide":
        gsap.to(element, {
          x: element.style.transform?.includes("translateX(100px)") ? 0 : 100,
          duration: 0.5,
        });
        break;
      case "scale":
        gsap.to(element, {
          scale: element.style.transform?.includes("scale(1.5)") ? 1 : 1.5,
          duration: 0.5,
        });
        break;
      case "rotate":
        gsap.to(element, {
          rotation: element.style.transform?.includes("rotate(360deg)") ? 0 : 360,
          duration: 0.5,
        });
        break;
    }
  };

  const resetAllBoxes = () => {
    gsap.to(["#fade", "#slide", "#scale", "#rotate"], {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 0.5,
    });
  };

  const playTimeline = () => {
    const tl = gsap.timeline();
    tl.to("#timeline-box-1", { x: 100, duration: 0.5 })
      .to("#timeline-box-2", { x: 100, duration: 0.5 }, "-=0.25")
      .to("#timeline-box-3", { x: 100, duration: 0.5 }, "-=0.25")
      .to("#timeline-box-4", { x: 100, duration: 0.5 }, "-=0.25");
  };

  const resetTimeline = () => {
    gsap.to(["#timeline-box-1", "#timeline-box-2", "#timeline-box-3", "#timeline-box-4"], {
      x: 0,
      duration: 0.5,
    });
  };

  const playStagger = () => {
    gsap.to(".stagger-box", {
      y: -50,
      rotation: 180,
      scale: 1.2,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
    });
  };

  const resetStagger = () => {
    gsap.to(".stagger-box", {
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 0.5,
      stagger: 0.05,
    });
  };

  const animateText = () => {
    const element = document.getElementById("text-animation");
    if (!element) return;

    gsap.fromTo(
      element,
      { opacity: 0, y: -20, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      }
    );
  };

  const resetText = () => {
    const element = document.getElementById("text-animation");
    if (!element) return;

    gsap.to(element, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.3,
    });
  };

  const playAllEasing = () => {
    const easings = [
      "ease-1",
      "ease-2",
      "ease-3",
      "ease-4",
      "ease-5",
      "ease-6",
      "ease-7",
      "ease-8",
    ];

    easings.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      const easing = element.getAttribute("data-easing") || "power1.out";

      gsap.to(element, {
        x: 200,
        rotation: 360,
        duration: 1.5,
        ease: easing as gsap.EaseString,
      });
    });
  };

  const resetAllEasing = () => {
    gsap.to(
      [
        "#ease-1",
        "#ease-2",
        "#ease-3",
        "#ease-4",
        "#ease-5",
        "#ease-6",
        "#ease-7",
        "#ease-8",
      ],
      {
        x: 0,
        rotation: 0,
        duration: 0.5,
      }
    );
  };

  // ScrollTrigger setup
  useEffect(() => {
    // 1. Basic ScrollTrigger (Fade In)
    const scrollBox = document.getElementById("scroll-trigger-box");
    if (scrollBox) {
      gsap.fromTo(
        scrollBox,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: scrollBox,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // 2. ScrollTrigger Pin
    const pinBox = document.getElementById("scroll-pin-box");
    if (pinBox) {
      const pinContainer = pinBox.parentElement;
      if (pinContainer) {
        gsap.to(pinBox, {
          scrollTrigger: {
            trigger: pinBox,
            start: "top top",
            end: "+=600",
            pin: true,
            pinSpacing: true,
          },
        });
      }
    }

    // 3. ScrollTrigger Scrub
    const scrubBox = document.getElementById("scroll-scrub-box");
    if (scrubBox) {
      const scrubContainer = scrubBox.parentElement;
      if (scrubContainer) {
        gsap.to(scrubBox, {
          rotation: 720,
          scale: 2,
          x: 200,
          y: -100,
          scrollTrigger: {
            trigger: scrubContainer,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }

    // 4. ScrollTrigger Parallax
    const parallaxFast = document.getElementById("parallax-fast");
    const parallaxMedium = document.getElementById("parallax-medium");
    const parallaxSlow = document.getElementById("parallax-slow");
    
    if (parallaxFast) {
      gsap.to(parallaxFast, {
        y: -200,
        scrollTrigger: {
          trigger: parallaxFast.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (parallaxMedium) {
      gsap.to(parallaxMedium, {
        y: -100,
        scrollTrigger: {
          trigger: parallaxMedium.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (parallaxSlow) {
      gsap.to(parallaxSlow, {
        y: -50,
        scrollTrigger: {
          trigger: parallaxSlow.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // 5. ScrollTrigger Stagger Reveal
    const staggerBoxes = document.querySelectorAll(".stagger-reveal-box");
    if (staggerBoxes.length > 0) {
      gsap.fromTo(
        staggerBoxes,
        {
          opacity: 0,
          y: 50,
          scale: 0.5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: staggerBoxes[0]?.parentElement,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // 6. ScrollTrigger Progress Bar
    const progressSection = document.getElementById("scroll-progress-section");
    const progressBar = document.getElementById("scroll-progress-bar");
    const progressText = document.getElementById("scroll-progress-text");
    
    if (progressSection && progressBar && progressText) {
      ScrollTrigger.create({
        trigger: progressSection,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = Math.round(self.progress * 100);
          gsap.to(progressBar, {
            width: `${progress}%`,
            duration: 0.1,
          });
          if (progressText) {
            progressText.textContent = `${progress}%`;
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  
  // Character positions and scales
  const [characterPositions, setCharacterPositions] = useState<CharacterPosition[]>([
    { x: 50, y: 50, scale: 1, zIndex: 1 },
    { x: 150, y: 50, scale: 1, zIndex: 2 },
    { x: 250, y: 50, scale: 1, zIndex: 3 },
    { x: 350, y: 50, scale: 1, zIndex: 4 },
    { x: 100, y: 200, scale: 1, zIndex: 5 },
    { x: 200, y: 200, scale: 1, zIndex: 6 },
    { x: 300, y: 200, scale: 1, zIndex: 7 },
  ]);

  const mockItems: RankUser[] = [
    { id: "1", rank: 1, name: "Item 1", score: 20000 },
    { id: "2", rank: 2, name: "Item 2", score: 19000 },
    { id: "3", rank: 3, name: "Item 3", score: 18000 },
    { id: "4", rank: 4, name: "Item 4", score: 17000 },
    { id: "5", rank: 5, name: "Item 5", score: 16000 },
    { id: "6", rank: 6, name: "Item 6", score: 15000 },
    { id: "7", rank: 7, name: "Item 7", score: 14000 },
    { id: "8", rank: 8, name: "Item 8", score: 13000 },
    { id: "9", rank: 9, name: "Item 9", score: 12000 },
    { id: "10", rank: 10, name: "Item 10", score: 11000 },
  ];

  const steps = [
    { label: "สร้างบัญชี", status: "completed" as const },
    { label: "กรอกข้อมูล", status: "active" as const },
    { label: "เสร็จสิ้น", status: "default" as const },
  ];

  return (
    <div className="min-h-screen bg-[#E5F2FA] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#242E39] mb-2">Component Showcase</h1>
          <p className="text-gray-600">แสดงตัวอย่าง components ทั้งหมดในโปรเจ็ค</p>
        </div>

        {/* Button */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Button</h2>
            
            {/* Button Styles */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Styles</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Button Default</Button>
                <Button variant="outline">Button Outline</Button>
                <Button variant="secondary">Button Secondary</Button>
                <Button variant="destructive">Button Destructive</Button>
                <Button variant="ghost">Button Ghost</Button>
                <Button variant="link">Button Link</Button>
                <Button size="auto">Auto Width</Button>
              </div>
            </div>

            {/* Button Sizes */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Sizes</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
          </section>
        </Container>

        {/* Form Components */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Form Components</h2>
            
            {/* Input */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Input</h3>
              <div className="flex flex-wrap gap-4">
                <Input placeholder="Input default" />
                <Input type="email" placeholder="Email input" />
                <Input type="number" placeholder="Number input" />
              </div>
            </div>

            {/* Label */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Label</h3>
              <div className="flex flex-wrap gap-4">
                <Label>Label Default</Label>
                <Label htmlFor="input1">Label for Input</Label>
              </div>
            </div>

            {/* InputField */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">InputField</h3>
              <div className="flex flex-col gap-4 max-w-md">
                <InputField
                  label="Email"
                  placeholder="zazajayzaza123@gmail.c.com"
                  type="email"
                />
                <InputField
                  label="Display Name"
                  placeholder="Enter display name"
                />
                <InputField
                  label="Age"
                  placeholder="Enter age"
                  type="number"
                  error="กรุณากรอกอายุ"
                />
              </div>
            </div>

            {/* PasswordField */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">PasswordField</h3>
              <div className="flex flex-col gap-4 max-w-md">
                <PasswordField
                  label="Password"
                  placeholder="Enter password"
                />
                <PasswordField
                  label="Confirm Password"
                  placeholder="Confirm password"
                  error="รหัสผ่านไม่ตรงกัน"
                />
              </div>
            </div>
          </section>
        </Container>

        {/* Layout Components */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Layout Components</h2>
            
            {/* Divider */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Divider</h3>
              <div className="flex flex-col gap-4 max-w-md">
                <Divider />
                <Divider text="หรือ" />
                <Divider text="หรือดำเนินการต่อด้วย" />
              </div>
            </div>

            {/* Stepper */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Stepper</h3>
              <div className="flex flex-col gap-4">
                <Stepper steps={steps} />
                <Stepper
                  steps={[
                    { label: "Step 1", status: "completed" },
                    { label: "Step 2", status: "completed" },
                    { label: "Step 3", status: "active" },
                  ]}
                />
              </div>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Form</h3>
              <div className="flex flex-col gap-4">
                <Form className="w-[387px]">
                  <InputField label="Email" placeholder="email@example.com" />
                  <Button>Submit</Button>
                </Form>
              </div>
            </div>
          </section>
        </Container>

        {/* Interactive Components */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Interactive Components</h2>
            
            {/* SocialButton */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">SocialButton</h3>
              <div className="flex flex-wrap gap-4">
                <SocialButton>Default</SocialButton>
                <SocialButton selected>Selected</SocialButton>
                <SocialButton
                  selected={selectedGender === "male"}
                  onSelect={(selected) => {
                    setSelectedGender(selected ? "male" : null);
                  }}
                >
                  เพศชาย
                </SocialButton>
                <SocialButton
                  variant="female"
                  selected={selectedGender === "female"}
                  onSelect={(selected) => {
                    setSelectedGender(selected ? "female" : null);
                  }}
                >
                  เพศหญิง
                </SocialButton>
                <SocialButton
                  variant="not-specified"
                  selected={selectedGender === "not-specified"}
                  onSelect={(selected) => {
                    setSelectedGender(selected ? "not-specified" : null);
                  }}
                >
                  ไม่ระบุตัวตน
                </SocialButton>
              </div>
            </div>

            {/* OTPInput */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">OTPInput</h3>
              <div className="flex flex-col gap-4">
                <OTPInput
                  length={6}
                  value={otpValue}
                  onChange={setOtpValue}
                  onComplete={(value) => console.log("OTP Complete:", value)}
                />
                <OTPInput
                  length={6}
                  value={[]}
                  onChange={() => {}}
                  hasError
                />
              </div>
            </div>

            {/* Image */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Image</h3>
              <div className="flex flex-wrap gap-4 items-start">
                <Image
                  src="/icons/logo.png"
                  alt="Logo"
                  fill
                  containerClassName="w-[93px] h-[93px] rounded-full"
                  priority
                  sizes="93px"
                />
                <Image
                  src="/images/finish.png"
                  alt="Finish"
                  fill
                  containerClassName="w-[120px] h-[120px] rounded-lg"
                  sizes="120px"
                />
              </div>
            </div>
          </section>
        </Container>

        {/* Custom Buttons */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Custom Buttons</h2>
            
            {/* GlossyGreenButton */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">GlossyGreenButton</h3>
              <div className="flex flex-wrap gap-6 items-center justify-center bg-gray-50 p-8 rounded-xl">
                <GlossyGreenButton size="lg">Start</GlossyGreenButton>
                <GlossyGreenButton size="default">เริ่มกันเลย</GlossyGreenButton>
                <GlossyGreenButton size="sm">เริ่ม</GlossyGreenButton>
              </div>
              
              <div className="flex flex-wrap gap-6 items-center justify-center bg-gray-100 p-8 rounded-xl">
                <GlossyGreenButton variant="outline" size="lg">Outline</GlossyGreenButton>
                <GlossyGreenButton size="full">Full Width Button</GlossyGreenButton>
              </div>
            </div>
          </section>
        </Container>

        {/* Cards & Display Components */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Cards & Display Components</h2>
            
            {/* StatCard */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">StatCard</h3>
              <div className="flex flex-col gap-4 max-w-2xl">
                <StatCard 
                  type="streak" 
                  title="x2 Point Streak" 
                  description="Receive double streak rewards every day" 
                />
                <StatCard 
                  type="exp" 
                  title="x2 Exp" 
                  description="Double EXP when completing the exercise" 
                />
                <StatCard 
                  type="points" 
                  title="คะแนนทั้งหมด: 5,672" 
                  description="จำนวนคะแนนที่สะสมได้" 
                />
                <StatCard 
                  type="rank" 
                  title="ผู้เริ่มต้นที่ดี" 
                  description="แรงค์ของคุณในระบบ" 
                />
                <StatCard 
                  emoji="💎" 
                  title="Premium Member" 
                  description="Unlock all premium features" 
                  iconBgColor="bg-[#E8F4FF]"
                />
              </div>
            </div>
          </section>
        </Container>

        {/* Form Components */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Form Containers</h2>
            
            {/* BorderedForm */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">BorderedForm</h3>
              <div className="flex flex-wrap gap-6 items-start">
                <BorderedForm className="w-[376px] h-auto">
                  <div className="w-full">
                    <h3 className="text-[20px] font-bold text-[#3C3C3C] mb-4">ตัวอย่างฟอร์ม</h3>
                  </div>
                  <InputField
                    label="ชื่อผู้ใช้"
                    placeholder="กรอกชื่อผู้ใช้"
                  />
                  <InputField
                    label="อีเมล"
                    placeholder="example@email.com"
                    type="email"
                  />
                  <Button size="auto" className="w-full">
                    ส่งข้อมูล
                  </Button>
                </BorderedForm>

                <BorderedForm className="w-[376px] h-auto py-[20px] px-[24px]">
                  <div className="w-full flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[24px]">❤️</span>
                      <span className="text-[20px] font-bold text-[#FF4D4D]">5</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[24px]">⚡</span>
                      <span className="text-[20px] font-bold text-[#FFD300]">100</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[24px]">🔥</span>
                      <span className="text-[20px] font-bold text-[#FF7A00]">7</span>
                    </div>
                  </div>
                </BorderedForm>
              </div>
            </div>
          </section>
        </Container>

        {/* RoundButton */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">RoundButton</h2>
            <div className="flex flex-col gap-6">
              {/* Blue variant */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl">
                <h3 className="text-lg font-bold mb-6 text-[#1CB0F6]">สีฟ้า (Game 1: Path Navigation)</h3>
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex items-center gap-4">
                    <RoundButton 
                      variant="blue"
                      size="default" 
                      icon={<Check className="w-8 h-8 text-white stroke-[3]" />}
                    />
                    <span className="text-[16px] font-bold text-[#3C3C3C]">Level 1 (Unlocked)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <RoundButton 
                      variant="blue-locked"
                      size="default" 
                      icon={<Lock className="w-7 h-7 text-white" />}
                    />
                    <span className="text-[16px] font-medium text-[#AFAFAF]">Level 4 (Locked)</span>
                  </div>
                </div>
              </div>

              {/* Green variant */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl">
                <h3 className="text-lg font-bold mb-6 text-[#19C371]">สีเขียว (Game 2: Asking Question)</h3>
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex items-center gap-4">
                    <RoundButton 
                      variant="green"
                      size="default" 
                      icon={<Check className="w-8 h-8 text-white stroke-[3]" />}
                    />
                    <span className="text-[16px] font-bold text-[#3C3C3C]">Level 1 (Unlocked)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <RoundButton 
                      variant="green-locked"
                      size="default" 
                      icon={<Lock className="w-7 h-7 text-white" />}
                    />
                    <span className="text-[16px] font-medium text-[#AFAFAF]">Level 5 (Locked)</span>
                  </div>
                </div>
              </div>

              {/* Default variant (Beige) */}
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold mb-6 text-[#8B7355]">สีเบจ (Default)</h3>
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex items-center gap-4">
                    <RoundButton 
                      size="sm" 
                      icon={<span className="text-[16px] font-bold text-[#8B7355]">S</span>}
                    />
                    <span className="text-[14px]">Small</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <RoundButton 
                      size="default" 
                      icon={<span className="text-[20px] font-bold text-[#8B7355]">M</span>}
                    />
                    <span className="text-[16px]">Default</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <RoundButton 
                      size="lg" 
                      icon={<span className="text-[24px] font-bold text-[#8B7355]">L</span>}
                    />
                    <span className="text-[18px]">Large</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Container>

        {/* List Components */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">List Components</h2>
            
            {/* LeaderboardList */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">LeaderboardList</h3>
              <div className="flex flex-col gap-4">
                <LeaderboardList
                  items={mockItems}
                  onItemSelect={(user, index) => console.log(user, index)}
                  enableArrowNavigation={true}
                  displayScrollbar={true}
                />
              </div>
            </div>
          </section>
        </Container>

        {/* Utility Components */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Utility Components</h2>
            
            {/* Container */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Container</h3>
              <div className="flex flex-col gap-4">
                <Container variant="default" className="p-6">
                  <h4 className="text-lg font-bold mb-2">Container Default (Gradient)</h4>
                  <p className="text-gray-600">Container with default gradient background</p>
                </Container>
                <Container variant="white" className="p-6">
                  <h4 className="text-lg font-bold mb-2">Container White</h4>
                  <p className="text-gray-600">Container with white background</p>
                </Container>
                <Container variant="white" as="div" className="p-6">
                  <h4 className="text-lg font-bold mb-2">Container as div</h4>
                  <p className="text-gray-600">Container rendered as div element</p>
                </Container>
                <Container variant="white" as="aside" className="p-6">
                  <h4 className="text-lg font-bold mb-2">Container as aside</h4>
                  <p className="text-gray-600">Container rendered as aside element</p>
                </Container>
              </div>
            </div>

            {/* EditButton */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">EditButton</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <EditButton />
                <EditButton onClick={() => console.log("Edit clicked")} />
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Profile Name:</span>
                  <span className="font-bold">John Doe</span>
                  <EditButton />
                </div>
              </div>
            </div>
          </section>
        </Container>

        {/* Character Components */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Character Components</h2>
            
            {/* Characters - Grid Layout */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Characters Grid Layout</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 7 }, (_, i) => (
                  <Container key={i} variant="white" className="p-6 flex flex-col items-center justify-center border border-gray-200">
                    <div className="w-full h-[200px] flex items-center justify-center mb-4">
                      <Image
                        src={`/images/All-Character/character-${String(i + 1).padStart(2, '0')}.svg`}
                        alt={`Character ${i + 1}`}
                        fill
                        containerClassName="w-full h-full"
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-[#242E39]">Character {i + 1}</h3>
                  </Container>
                ))}
              </div>
            </div>
          </section>
        </Container>

        {/* Characters - Interactive Positioning */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">Characters - Interactive Positioning</h2>
            <p className="text-gray-600">ปรับตำแหน่งและขนาดได้</p>
            <div className="p-6">
            <div className="relative w-full h-[600px] border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
              {Array.from({ length: 7 }, (_, i) => {
                const pos = characterPositions[i];
                return (
                  <div
                    key={i}
                    className="absolute cursor-move group"
                    style={{
                      left: `${pos.x}px`,
                      top: `${pos.y}px`,
                      transform: `translate(-50%, -50%) scale(${pos.scale})`,
                      transition: 'transform 0.2s',
                      zIndex: pos.zIndex,
                    }}
                    onMouseDown={(e) => {
                      // Don't start drag if clicking on controls
                      const target = e.target as HTMLElement;
                      if (target.closest('.character-controls')) {
                        return;
                      }
                      
                      e.preventDefault();
                      
                      const containerElement = e.currentTarget.parentElement;
                      if (!containerElement) return;
                      
                      const handleMouseMove = (moveEvent: MouseEvent) => {
                        const rect = containerElement.getBoundingClientRect();
                        const newX = moveEvent.clientX - rect.left;
                        const newY = moveEvent.clientY - rect.top;
                        setCharacterPositions(prev => {
                          const newPos = [...prev];
                          newPos[i] = { ...newPos[i], x: newX, y: newY };
                          return newPos;
                        });
                      };
                      
                      const handleMouseUp = () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };
                      
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}
                  >
                    <div className="relative w-[120px] h-[200px] flex items-center justify-center">
                      <Image
                        src={`/images/All-Character/character-${String(i + 1).padStart(2, '0')}.svg`}
                        alt={`Character ${i + 1}`}
                        fill
                        containerClassName="w-full h-full"
                        className="object-contain"
                        sizes="120px"
                      />
                    </div>
                    {/* Controls */}
                    <div 
                      className="character-controls absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-lg p-2 flex gap-2 whitespace-nowrap z-20"
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-600">Character {i + 1}</label>
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-gray-600">Scale:</label>
                          <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={pos.scale}
                            onChange={(e) => {
                              setCharacterPositions(prev => {
                                const newPos = [...prev];
                                newPos[i] = { ...newPos[i], scale: parseFloat(e.target.value) };
                                return newPos;
                              });
                            }}
                            className="w-20"
                          />
                          <span className="text-xs text-gray-600 w-8">{pos.scale.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-gray-600">X:</label>
                          <input
                            type="number"
                            value={Math.round(pos.x)}
                            onChange={(e) => {
                              setCharacterPositions(prev => {
                                const newPos = [...prev];
                                newPos[i] = { ...newPos[i], x: parseInt(e.target.value) || 0 };
                                return newPos;
                              });
                            }}
                            className="w-16 px-1 text-xs border rounded"
                          />
                          <label className="text-xs text-gray-600">Y:</label>
                          <input
                            type="number"
                            value={Math.round(pos.y)}
                            onChange={(e) => {
                              setCharacterPositions(prev => {
                                const newPos = [...prev];
                                newPos[i] = { ...newPos[i], y: parseInt(e.target.value) || 0 };
                                return newPos;
                              });
                            }}
                            className="w-16 px-1 text-xs border rounded"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-gray-600">Layer:</label>
                          <input
                            type="number"
                            min="1"
                            max="20"
                            value={pos.zIndex}
                            onChange={(e) => {
                              const newZIndex = parseInt(e.target.value) || 1;
                              setCharacterPositions(prev => {
                                const newPos = [...prev];
                                newPos[i] = { ...newPos[i], zIndex: newZIndex };
                                return newPos;
                              });
                            }}
                            className="w-12 px-1 text-xs border rounded"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const maxZIndex = Math.max(...characterPositions.map(p => p.zIndex));
                              setCharacterPositions(prev => {
                                const newPos = [...prev];
                                newPos[i] = { ...newPos[i], zIndex: maxZIndex + 1 };
                                return newPos;
                              });
                            }}
                            className="px-2 py-0.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            title="Bring to Front"
                          >
                            ↑ Front
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const minZIndex = Math.min(...characterPositions.map(p => p.zIndex));
                              setCharacterPositions(prev => {
                                const newPos = [...prev];
                                newPos[i] = { ...newPos[i], zIndex: minZIndex - 1 };
                                return newPos;
                              });
                            }}
                            className="px-2 py-0.5 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                            title="Send to Back"
                          >
                            ↓ Back
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex gap-4 flex-wrap">
              <button
                onClick={() => {
                  setCharacterPositions([
                    { x: 50, y: 50, scale: 1, zIndex: 1 },
                    { x: 150, y: 50, scale: 1, zIndex: 2 },
                    { x: 250, y: 50, scale: 1, zIndex: 3 },
                    { x: 350, y: 50, scale: 1, zIndex: 4 },
                    { x: 100, y: 200, scale: 1, zIndex: 5 },
                    { x: 200, y: 200, scale: 1, zIndex: 6 },
                    { x: 300, y: 200, scale: 1, zIndex: 7 },
                  ]);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Reset Positions
              </button>
              <button
                onClick={() => {
                  setCharacterPositions(prev => prev.map(p => ({ ...p, scale: 1 })));
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                Reset Scales
              </button>
              <button
                onClick={() => {
                  setCharacterPositions(prev => prev.map((p, idx) => ({ ...p, zIndex: idx + 1 })));
                }}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
              >
                Reset Layers
              </button>
            </div>
            </div>
          </section>
        </Container>

        {/* GSAP Animations */}
        <Container variant="white" className="p-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#242E39]">GSAP Animations</h2>
            
            {/* Basic Animations */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Basic Animations</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <GSAPTestBox id="fade" label="Fade" />
                <GSAPTestBox id="slide" label="Slide" />
                <GSAPTestBox id="scale" label="Scale" />
                <GSAPTestBox id="rotate" label="Rotate" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => animateBox("fade", "fade")}>Fade In/Out</Button>
                <Button onClick={() => animateBox("slide", "slide")}>Slide</Button>
                <Button onClick={() => animateBox("scale", "scale")}>Scale</Button>
                <Button onClick={() => animateBox("rotate", "rotate")}>Rotate</Button>
                <Button onClick={() => resetAllBoxes()}>Reset All</Button>
              </div>
            </div>

            {/* Timeline Animation */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Timeline Animation</h3>
              <div className="flex gap-4 items-center">
                <div id="timeline-box-1" className="w-16 h-16 bg-blue-500 rounded-lg"></div>
                <div id="timeline-box-2" className="w-16 h-16 bg-green-500 rounded-lg"></div>
                <div id="timeline-box-3" className="w-16 h-16 bg-purple-500 rounded-lg"></div>
                <div id="timeline-box-4" className="w-16 h-16 bg-orange-500 rounded-lg"></div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={playTimeline}>Play Timeline</Button>
                <Button onClick={resetTimeline}>Reset Timeline</Button>
              </div>
            </div>

            {/* Stagger Animation */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Stagger Animation</h3>
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className="stagger-box w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg"
                  ></div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={playStagger}>Play Stagger</Button>
                <Button onClick={resetStagger}>Reset Stagger</Button>
              </div>
            </div>

            {/* ScrollTrigger Animations */}
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-semibold text-gray-700">ScrollTrigger Animations</h3>
              
              {/* Basic ScrollTrigger */}
              <div className="flex flex-col gap-2">
                <h4 className="text-md font-medium text-gray-600">1. Basic ScrollTrigger (Fade In)</h4>
                <div className="h-[300px] overflow-y-auto border-2 border-gray-200 rounded-lg p-4">
                  <div className="space-y-8">
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">Scroll down ↓</p>
                    </div>
                    <div
                      id="scroll-trigger-box"
                      className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg mx-auto"
                    ></div>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">More content</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ScrollTrigger Pin */}
              <div className="flex flex-col gap-2">
                <h4 className="text-md font-medium text-gray-600">2. ScrollTrigger Pin (Sticky Element)</h4>
                <div className="h-[500px] overflow-y-auto border-2 border-gray-200 rounded-lg p-4">
                  <div className="space-y-8">
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">Scroll to pin element</p>
                    </div>
                    <div
                      id="scroll-pin-box"
                      className="w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg mx-auto flex items-center justify-center text-white font-bold text-lg"
                    >
                      PINNED
                    </div>
                    <div className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">Scroll through this section</p>
                    </div>
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">End of pin section</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ScrollTrigger Scrub */}
              <div className="flex flex-col gap-2">
                <h4 className="text-md font-medium text-gray-600">3. ScrollTrigger Scrub (Progress-based Animation)</h4>
                <div className="h-[400px] overflow-y-auto border-2 border-gray-200 rounded-lg p-4">
                  <div className="space-y-8">
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">Scroll to animate</p>
                    </div>
                    <div className="relative h-[400px] bg-gray-50 rounded-lg">
                      <div
                        id="scroll-scrub-box"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg"
                      ></div>
                    </div>
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">End</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ScrollTrigger Parallax */}
              <div className="flex flex-col gap-2">
                <h4 className="text-md font-medium text-gray-600">4. ScrollTrigger Parallax (Different Speeds)</h4>
                <div className="h-[400px] overflow-y-auto border-2 border-gray-200 rounded-lg p-4 relative">
                  <div className="space-y-8">
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">Scroll for parallax effect</p>
                    </div>
                    <div className="relative h-[300px] bg-gradient-to-b from-blue-50 to-purple-50 rounded-lg overflow-hidden">
                      <div
                        id="parallax-fast"
                        className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-lg"
                      ></div>
                      <div
                        id="parallax-medium"
                        className="absolute top-20 right-10 w-20 h-20 bg-green-500 rounded-lg"
                      ></div>
                      <div
                        id="parallax-slow"
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-purple-500 rounded-lg"
                      ></div>
                    </div>
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">End</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ScrollTrigger Stagger Reveal */}
              <div className="flex flex-col gap-2">
                <h4 className="text-md font-medium text-gray-600">5. ScrollTrigger Stagger Reveal</h4>
                <div className="h-[400px] overflow-y-auto border-2 border-gray-200 rounded-lg p-4">
                  <div className="space-y-8">
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">Scroll to reveal</p>
                    </div>
                    <div className="flex gap-4 justify-center flex-wrap">
                      {Array.from({ length: 6 }, (_, i) => (
                        <div
                          key={i}
                          className="stagger-reveal-box w-20 h-20 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-lg"
                        ></div>
                      ))}
                    </div>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">More content</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ScrollTrigger Progress Bar */}
              <div className="flex flex-col gap-2">
                <h4 className="text-md font-medium text-gray-600">6. ScrollTrigger Progress Indicator</h4>
                <div className="h-[400px] overflow-y-auto border-2 border-gray-200 rounded-lg p-4">
                  <div className="sticky top-0 z-10 mb-4">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        id="scroll-progress-bar"
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      Scroll Progress: <span id="scroll-progress-text">0%</span>
                    </p>
                  </div>
                  <div className="space-y-8">
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">Start scrolling</p>
                    </div>
                    <div
                      id="scroll-progress-section"
                      className="h-[600px] bg-gradient-to-b from-green-50 to-blue-50 rounded-lg flex items-center justify-center"
                    >
                      <p className="text-gray-600">Scroll through this section</p>
                    </div>
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">End</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Animation */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Text Animation</h3>
              <div className="text-4xl font-bold">
                <span id="text-animation" className="inline-block">
                  Hello GSAP!
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={animateText}>Animate Text</Button>
                <Button onClick={resetText}>Reset Text</Button>
              </div>
            </div>

            {/* Easing Functions */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-700">Easing Functions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <EasingBox id="ease-1" label="Power1" easing="power1.out" />
                <EasingBox id="ease-2" label="Power2" easing="power2.out" />
                <EasingBox id="ease-3" label="Power3" easing="power3.out" />
                <EasingBox id="ease-4" label="Power4" easing="power4.out" />
                <EasingBox id="ease-5" label="Back" easing="back.out(1.7)" />
                <EasingBox id="ease-6" label="Elastic" easing="elastic.out(1, 0.3)" />
                <EasingBox id="ease-7" label="Bounce" easing="bounce.out" />
                <EasingBox id="ease-8" label="Sine" easing="sine.out" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={playAllEasing}>Play All Easing</Button>
                <Button onClick={resetAllEasing}>Reset All</Button>
              </div>
            </div>
          </section>
        </Container>
              
      </div>
    </div>
  );
}

// GSAP Test Box Component
function GSAPTestBox({ id, label }: { id: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        id={id}
        className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg shadow-lg"
      ></div>
      <span className="text-sm font-medium text-gray-600">{label}</span>
    </div>
  );
}

// Easing Box Component
function EasingBox({ id, label, easing }: { id: string; label: string; easing: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        id={id}
        data-easing={easing}
        className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
      ></div>
      <span className="text-xs font-medium text-gray-600">{label}</span>
    </div>
  );
}


