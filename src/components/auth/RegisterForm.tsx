"use client";

import * as React from "react";
import Link from "next/link";
import { Image } from "@/components/common/Image";
import { InputField } from "@/components/common/InputField";
import { PasswordField } from "@/components/common/PasswordField";
import { SocialButton } from "@/components/common/SocialButton";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import Stepper, { Step } from "@/components/common/Stepper";
import { useAuthStore } from "@/store/auth.store";
import { Gender } from "@/services/auth.service";

export interface RegisterFormProps {}

const RegisterForm: React.FC<RegisterFormProps> = () => {
  const {
    registerStep1,
    registerStep2,
    isLoading,
    error,
    clearError,
    registerStep,
    resetRegister,
  } = useAuthStore();

  // Step 1 states
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // Step 1 validation errors
  const [emailError, setEmailError] = React.useState<string | undefined>();
  const [passwordError, setPasswordError] = React.useState<string | undefined>();
  const [confirmPasswordError, setConfirmPasswordError] = React.useState<string | undefined>();

  // Step 2 states
  const [displayName, setDisplayName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<
    "male" | "female" | "not-specified" | null
  >(null);

  // Step 2 validation errors
  const [nameError, setNameError] = React.useState<string | undefined>();
  const [ageError, setAgeError] = React.useState<string | undefined>();
  const [genderError, setGenderError] = React.useState<string | undefined>();

  // Current step state
  const [currentStep, setCurrentStep] = React.useState(1);

  // Map gender from UI to API format
  const mapGenderToEnum = (
    gender: "male" | "female" | "not-specified" | null
  ): Gender => {
    if (gender === "male") return Gender.MALE;
    if (gender === "female") return Gender.FEMALE;
    return Gender.OTHER;
  };

  // Validation functions
  const validateEmail = (emailValue: string): boolean => {
    if (!emailValue.trim()) {
      setEmailError("กรุณากรอกอีเมล");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("รูปแบบอีเมลไม่ถูกต้อง");
      return false;
    }
    setEmailError(undefined);
    return true;
  };

  const validatePassword = (passwordValue: string): boolean => {
    if (!passwordValue.trim()) {
      setPasswordError("กรุณากรอกรหัสผ่าน");
      return false;
    }
    if (passwordValue.length < 6) {
      setPasswordError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return false;
    }
    setPasswordError(undefined);
    return true;
  };

  const validateConfirmPassword = (
    passwordValue: string,
    confirmPasswordValue: string
  ): boolean => {
    if (!confirmPasswordValue.trim()) {
      setConfirmPasswordError("กรุณายืนยันรหัสผ่าน");
      return false;
    }
    if (passwordValue !== confirmPasswordValue) {
      setConfirmPasswordError("รหัสผ่านไม่ตรงกัน");
      return false;
    }
    setConfirmPasswordError(undefined);
    return true;
  };

  const validateStep1 = (): boolean => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(password, confirmPassword);
    return isEmailValid && isPasswordValid && isConfirmPasswordValid;
  };

  const validateStep2 = (): boolean => {
    let isValid = true;

    if (!displayName.trim()) {
      setNameError("กรุณากรอกชื่อที่แสดง");
      isValid = false;
    } else if (displayName.trim().length < 2) {
      setNameError("ชื่อต้องมีอย่างน้อย 2 ตัวอักษร");
      isValid = false;
    } else {
      setNameError(undefined);
    }

    if (!age.trim()) {
      setAgeError("กรุณากรอกอายุ");
      isValid = false;
    } else {
      const ageNum = parseInt(age, 10);
      if (isNaN(ageNum) || ageNum < 0 || ageNum > 100) {
        setAgeError("อายุต้องอยู่ระหว่าง 0-100");
        isValid = false;
      } else {
        setAgeError(undefined);
      }
    }

    if (!gender) {
      setGenderError("กรุณาเลือกเพศ");
      isValid = false;
    } else {
      setGenderError(undefined);
    }

    return isValid;
  };

  // Handle Step 1 Next Button
  const handleStep1Next = async (): Promise<boolean> => {
    clearError();
    setEmailError(undefined);
    setPasswordError(undefined);
    setConfirmPasswordError(undefined);

    // Validate all fields first
    if (!validateStep1()) {
      return false; // Validation failed, don't proceed
    }

    try {
      await registerStep1({
        email: email.trim(),
        password,
        confirmPassword,
      });
      // Step will be updated by store and synced via useEffect
      return true; // Success, allow step change
    } catch (error) {
      // Error handled in store - prevent step change
      console.error("Register Step 1 failed:", error);
      return false; // API failed, don't proceed
    }
  };

  // Handle Step 2 Complete Button
  const handleStep2Complete = async (): Promise<boolean> => {
    clearError();
    setNameError(undefined);
    setAgeError(undefined);
    setGenderError(undefined);

    // Validate all fields first
    if (!validateStep2()) {
      return false; // Validation failed, don't proceed
    }

    try {
      await registerStep2({
        name: displayName.trim(),
        age: parseInt(age, 10),
        gender: mapGenderToEnum(gender),
      });
      // Step will be updated by store and synced via useEffect
      return true; // Success, allow step change
    } catch (error) {
      // Error handled in store - prevent step change
      console.error("Register Step 2 failed:", error);
      return false; // API failed, don't proceed
    }
  };

  // Handle step change from Stepper (for step indicators click)
  const handleStepChange = (step: number) => {
    // Only allow going back, not forward (forward requires validation)
    if (step < currentStep) {
      // If going back from step 2 to step 1, clear step 2 fields
      if (currentStep === 2 && step === 1) {
        setDisplayName("");
        setNameError(undefined);
        setAge("");
        setAgeError(undefined);
        setGender(null);
        setGenderError(undefined);
      }
      setCurrentStep(step);
      setStepperStep(step);
      clearError();
    }
  };

  // Check if Step 1 is complete (all fields filled)
  const isStep1Complete = (): boolean => {
    return (
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== ""
    );
  };

  // Check if Step 2 is complete (all fields filled)
  const isStep2Complete = (): boolean => {
    return (
      displayName.trim() !== "" &&
      age.trim() !== "" &&
      gender !== null
    );
  };

  // Clear errors when user types
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(undefined);
    if (error) clearError();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(undefined);
    if (error) clearError();
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (confirmPasswordError) setConfirmPasswordError(undefined);
    if (error) clearError();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 25) {
      setDisplayName(value);
      if (nameError) setNameError(undefined);
      if (error) clearError();
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value, 10);
    if (
      value === "" ||
      (!isNaN(numValue) && numValue >= 0 && numValue <= 100)
    ) {
      setAge(value);
      if (ageError) setAgeError(undefined);
      if (error) clearError();
    }
  };

  const handleGenderSelect = (
    selectedGender: "male" | "female" | "not-specified"
  ) => {
    setGender(selectedGender === gender ? null : selectedGender);
    if (genderError) setGenderError(undefined);
    if (error) clearError();
  };

  // Prevent Stepper from auto-advancing by controlling step manually
  const [stepperStep, setStepperStep] = React.useState(currentStep);
  
  // Sync with store registerStep (only allow forward progression)
  React.useEffect(() => {
    if (registerStep > currentStep) {
      setCurrentStep(registerStep);
      setStepperStep(registerStep);
    }
  }, [registerStep, currentStep]);
  
  // Sync stepperStep with currentStep when currentStep changes (for going back)
  React.useEffect(() => {
    setStepperStep(currentStep);
  }, [currentStep]);

  return (
    <div className="w-full ">
      <LoadingOverlay isLoading={isLoading} message="กำลังดำเนินการ..." />
      <Stepper
        key={stepperStep} // Force re-render when step changes
        initialStep={stepperStep}
        onStepChange={(step: number) => {
          // Only allow going back, not forward (forward requires validation)
          if (step < currentStep) {
            // If going back from step 2 to step 1, clear step 2 fields
            if (currentStep === 2 && step === 1) {
              setDisplayName("");
              setNameError(undefined);
              setAge("");
              setAgeError(undefined);
              setGender(null);
              setGenderError(undefined);
              // Reset register step in store
              resetRegister();
            }
            // Update both states to ensure sync
            setCurrentStep(step);
            setStepperStep(step);
            clearError();
          }
        }}
        onFinalStepCompleted={async () => {
          if (currentStep === 2) {
            const success = await handleStep2Complete();
            if (success) {
              // Step will be updated by store via useEffect
            }
          }
        }}
        backButtonText="ย้อนกลับ"
        nextButtonText="ถัดไป"
        completeButtonText="ไปเรียนกันเลย!"
        stepContainerClassName="px-5"
        footerClassName="px-0"
        footerLeftContent={
          <p className="text-[13px] md:text-[14px] text-gray-600">
            มีบัญชีอยู่แล้ว?{" "}
            <Link
              href="/login"
              className="text-[#1cb0f6] font-semibold hover:text-[#17a3e3] transition-colors"
            >
              เข้าสู่ระบบ
            </Link>
          </p>
        }
        disableStepIndicators={true}
        backButtonProps={{ 
          disabled: isLoading,
        }}
        nextButtonProps={{ 
          disabled: isLoading || 
            (currentStep === 1 && !isStep1Complete()) ||
            (currentStep === 2 && !isStep2Complete()),
          onClick: async (e) => {
            // Prevent default Stepper behavior (handleNext/handleComplete)
            e.preventDefault();
            e.stopPropagation();
            
            if (currentStep === 1) {
              // Validate and call API before allowing step change
              const success = await handleStep1Next();
              if (success) {
                // Only allow step change if API call succeeded
                // Step will be updated by store via useEffect, which will update stepperStep
              }
              // If failed, don't change step (stay on step 1)
            } else if (currentStep === 2) {
              // Validate and call API before completing
              const success = await handleStep2Complete();
              if (success) {
                // Only allow step change if API call succeeded
                // Step will be updated by store via useEffect, which will update stepperStep
              }
              // If failed, don't change step (stay on step 2)
            }
          }
        }}
      >
        {/* Step 1: Create Account */}
        <Step>
          {/* Logo / Brand */}
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-1 text-center ">
            <div className="relative w-[40px] h-[40px] md:w-[49px] md:h-[49px]">
              <Image
                src="/icons/misc/logo.png" 
                alt="Logo"
                fill
                containerClassName="w-full h-full rounded-full"
                className="object-cover"
                priority
                sizes="(max-width: 768px) 40px, 49px"
              />
            </div>
            <div>
              <p className="text-[20px] md:text-[24px] lg:text-[26px] leading-tight font-bold">
                <span className="text-[#1cb0f6]">P&apos;Bit </span>
                <span className="text-[#ffd300]">Nong Brite</span>
              </p>
            </div>
          </div>

          <h2 className="text-[22px] md:text-[24px] font-bold text-gray-800 mb-2 text-center">
            สร้างบัญชี
          </h2>
          <p className="text-[13px] md:text-[14px] text-gray-500 mb-4 md:mb-5 text-center">
            พร้อมที่จะเรียนรู้หรือยัง?
          </p>

          {/* Input Fields */}
          <div className="relative z-10 flex flex-col gap-5 md:gap-6 w-full min-h-[280px] items-center mb-4">
            <div className="w-[390px] max-w-[460px] flex flex-col gap-5 md:gap-6">
              <InputField
                label="อีเมล"
                type="email"
                placeholder="กรุณากรอกอีเมลของคุณ"
                value={email}
                error={emailError}
                className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
                onChange={handleEmailChange}
                required
                disabled={isLoading}
              />

              <PasswordField
                label="รหัสผ่าน"
                placeholder="กรุณากรอกรหัสผ่านของคุณ"
                value={password}
                error={passwordError}
                className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
                onChange={handlePasswordChange}
                required
                disabled={isLoading}
              />

              <PasswordField
                label="ยืนยันรหัสผ่าน"
                placeholder="กรุณายืนยันรหัสผ่านของคุณ"
                value={confirmPassword}
                error={confirmPasswordError}
                className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
                onChange={handleConfirmPasswordChange}
                required
                disabled={isLoading}
              />

              {/* API Error Message */}
              {error && !emailError && !passwordError && !confirmPasswordError && (
                <div
                  className="w-full max-w-[460px] p-3 rounded-[12px] bg-red-50 border-2 border-red-200"
                  role="alert"
                  aria-live="polite"
                >
                  <p className="text-[13px] md:text-[14px] text-red-600 text-center">
                    {error}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Step>

        {/* Step 2: Fill Information */}
        <Step>
          <p className="text-[20px] md:text-[22px] lg:text-[24px] leading-tight font-bold text-center mt-6 md:mt-8 mb-8 md:mb-10">
            <span className="text-gray-800">ยินดีต้อนรับสู่ </span>
            <span className="text-[#1cb0f6]">P&apos;Bit </span>
            <span className="text-[#ffd300]">Nong Brite</span>
          </p>

          {/* Form Fields */}
          <div className="relative z-10 flex flex-col gap-5 md:gap-6 w-full min-h-[280px] items-center mb-4">
            <div className="w-[390px] max-w-[460px] flex flex-col gap-5 md:gap-6">
              <InputField
                label="ชื่อที่แสดง"
                type="text"
                placeholder="กรุณากรอกชื่อที่แสดง"
                value={displayName}
                error={nameError}
                className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
                onChange={handleNameChange}
                maxLength={25}
                required
                disabled={isLoading}
              />

              <InputField
                label="อายุ"
                type="number"
                placeholder="กรุณากรอกอายุ"
                value={age}
                error={ageError}
                className="h-[48px] md:h-[50px] bg-[#f5f9fb] border-2 border-[#d4e3ed] rounded-[12px] px-4 md:px-5 text-[14px] md:text-[15px] text-gray-800 placeholder:text-gray-400 hover:border-[#93c5fd] hover:bg-[#f0f9ff] focus:border-[#1cb0f6] focus:ring-2 focus:ring-[rgba(28,176,246,0.2)] transition-all"
                onChange={handleAgeChange}
                min={0}
                max={100}
                required
                disabled={isLoading}
              />

              {/* Gender Label */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[12px] leading-[18px] font-semibold text-gray-700">
                  เพศ {genderError && <span className="text-red-500 text-[10px]">* {genderError}</span>}
                </label>

                {/* Gender Buttons */}
                <div className="flex gap-3 w-full">
                  <SocialButton
                    variant={gender === "male" ? "selected" : "default"}
                    selected={gender === "male"}
                    onSelect={() => handleGenderSelect("male")}
                  >
                    เพศชาย
                  </SocialButton>
                  <SocialButton
                    variant={gender === "female" ? "female" : "default"}
                    selected={gender === "female"}
                    onSelect={() => handleGenderSelect("female")}
                  >
                    เพศหญิง
                  </SocialButton>
                  <SocialButton
                    variant={
                      gender === "not-specified" ? "not-specified" : "default"
                    }
                    selected={gender === "not-specified"}
                    onSelect={() => handleGenderSelect("not-specified")}
                  >
                    ไม่ระบุตัวตน
                  </SocialButton>
                </div>
              </div>

              {/* API Error Message */}
              {error && !nameError && !ageError && !genderError && (
                <div
                  className="w-full max-w-[460px] p-3 rounded-[12px] bg-red-50 border-2 border-red-200"
                  role="alert"
                  aria-live="polite"
                >
                  <p className="text-[13px] md:text-[14px] text-red-600 text-center">
                    {error}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Step>

        {/* Step 3: Complete */}
        <Step>
          {/* Image Section */}
          <div className="flex flex-col items-center gap-4 w-full ">
            <Image
              src="/images/finish.png"
              alt="Finish"
              fill
              containerClassName="w-[120px] h-[120px]"
              className="object-contain"
              priority
              sizes="120px"
            />
          </div>

          {/* Title */}
          <p className="text-[22px] md:text-[24px] leading-tight font-bold text-gray-800 text-center w-full">
            เสร็จสิ้น!
          </p>

          {/* Description */}
          <p className="text-[13px] md:text-[14px] leading-tight font-semibold text-gray-500 text-center w-full mt-2">
            ไปเริ่มเรียนรู้กันเลย!
          </p>
        </Step>
      </Stepper>
    </div>
  );
};

RegisterForm.displayName = "RegisterForm";

export { RegisterForm };
